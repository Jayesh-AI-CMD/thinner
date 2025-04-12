
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.1'
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const supabaseUrl = 'https://fytkhhhlixraqzhimtkh.supabase.co'
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// PhonePe integration constants
const MERCHANT_ID = Deno.env.get('PHONEPE_MERCHANT_ID') || 'MERCHANTUAT'
const SALT_KEY = Deno.env.get('PHONEPE_SALT_KEY') || ''
const SALT_INDEX = Deno.env.get('PHONEPE_SALT_INDEX') || '1'
const IS_PRODUCTION = Deno.env.get('PHONEPE_PRODUCTION') === 'true' // Default to false/UAT

const PHONEPE_HOST = IS_PRODUCTION 
  ? 'https://api.phonepe.com/apis/hermes'
  : 'https://api-preprod.phonepe.com/apis/hermes'

async function sha256Hash(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    })
  }

  try {
    const { amount, orderId, callbackUrl, userId } = await req.json()

    if (!amount || !orderId || !callbackUrl) {
      throw new Error('Amount, orderId, and callbackUrl are required')
    }

    // Prepare the payment request
    const merchantTransactionId = orderId
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId,
      merchantUserId: userId || "MUID" + Date.now(),
      amount: amount * 100, // PhonePe expects amount in paise
      redirectUrl: callbackUrl,
      redirectMode: "REDIRECT",
      callbackUrl: callbackUrl,
      mobileNumber: "9999999999", // Optional, can be user's mobile
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    }

    const payloadString = JSON.stringify(payload)
    const base64Payload = btoa(payloadString)
    
    // Generate the checksum
    const string = base64Payload + '/pg/v1/pay' + SALT_KEY
    const sha256 = await sha256Hash(string)
    const xVerify = sha256 + '###' + SALT_INDEX

    // Make the request to PhonePe
    const response = await fetch(`${PHONEPE_HOST}/pg/v1/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify,
      },
      body: JSON.stringify({
        request: base64Payload
      })
    })

    const data = await response.json()
    
    if (!data.success) {
      throw new Error(data.message || 'PhonePe payment initialization failed')
    }

    // Update the order with payment info
    const { error } = await supabase
      .from('orders')
      .update({ 
        payment_id: merchantTransactionId,
        status: 'processing'
      })
      .eq('id', orderId)

    if (error) throw error

    // Return the payment URL to redirect the user
    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: data.data.instrumentResponse.redirectInfo.url,
        paymentId: merchantTransactionId,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('PhonePe payment error:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
