import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const UserOrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Fetch orders
  const { data: orders, isLoading } = useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          status,
          subtotal,
          tax,
          total,
          shipping_name,
          shipping_email,
          shipping_phone,
          shipping_address,
          shipping_city,
          shipping_state,
          shipping_pincode,
          gst_number,
          gst_business_name,
          gst_address,
          payment_method,
          created_at,
          order_items (
            id,
            product_id,
            variant_id,
            name,
            size,
            price,
            quantity,
            is_sample
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-6 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">My Orders</h1>

        {isLoading ? (
          <div className="animate-pulse space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.created_at), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>₹{order.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {orders?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="font-medium">Order Information</h3>
                  <p className="text-sm">Order ID: {selectedOrder.id}</p>
                  <p className="text-sm">
                    Date:{" "}
                    {format(new Date(selectedOrder.created_at), "PPpp")}
                  </p>
                  <p className="text-sm">
                    Payment Method: {selectedOrder.payment_method}
                  </p>
                  <p className="text-sm">
                    Status:
                    <Badge
                      className={`ml-2 ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status}
                    </Badge>
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-medium">Customer Information</h3>
                  <p className="text-sm">Name: {selectedOrder.shipping_name}</p>
                  <p className="text-sm">
                    Email: {selectedOrder.shipping_email}
                  </p>
                  <p className="text-sm">
                    Phone: {selectedOrder.shipping_phone}
                  </p>
                  <p className="text-sm">
                    Address: {selectedOrder.shipping_address},{" "}
                    {selectedOrder.shipping_city},{" "}
                    {selectedOrder.shipping_state},{" "}
                    {selectedOrder.shipping_pincode}
                  </p>
                </div>
              </div>

              {selectedOrder.gst_number && (
                <div className="space-y-1">
                  <h3 className="font-medium">GST Information</h3>
                  <p className="text-sm">
                    GST Number: {selectedOrder.gst_number}
                  </p>
                  <p className="text-sm">
                    Business Name: {selectedOrder.gst_business_name}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-medium">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.order_items.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.name}
                          {item.is_sample && " (Sample)"}
                        </TableCell>
                        <TableCell>{item.size || "-"}</TableCell>
                        <TableCell>₹{item.price.toLocaleString()}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-1 text-right">
                <p className="text-sm">
                  Subtotal: ₹{selectedOrder.subtotal.toLocaleString()}
                </p>
                <p className="text-sm">
                  GST (18%): ₹{selectedOrder.tax.toLocaleString()}
                </p>
                <p className="font-bold">
                  Total: ₹{selectedOrder.total.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default UserOrdersPage;