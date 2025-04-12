
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const supabaseUrl = 'https://fytkhhhlixraqzhimtkh.supabase.co'
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseKey)

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    })
  }

  try {
    // This would be integrated with a real payment gateway
    // For now, we'll simulate a successful payment process
    const { amount, orderId } = await req.json()

    if (!amount || !orderId) {
      throw new Error('Amount and orderId are required')
    }

    // In a real implementation, this would create a payment intent with a payment provider
    // For now, we'll generate a fake payment ID
    const paymentId = `pay_${Math.random().toString(36).substring(2, 15)}`

    // Update the order with the payment ID
    const { error } = await supabase
      .from('orders')
      .update({ payment_id: paymentId })
      .eq('id', orderId)

    if (error) throw error

    // Return a success response
    return new Response(
      JSON.stringify({
        success: true,
        paymentId,
        message: 'Payment initiated successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
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
