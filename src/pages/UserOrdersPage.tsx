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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import html2pdf from "html2pdf.js";

const UserOrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState<any>(false);
  const [filterStatus, setFilterStatus] = useState<string | null>("");
  const [sortOption, setSortOption] = useState<string>("created_at_desc");

  // Fetch orders
  const { data: orders, isLoading } = useQuery({
    queryKey: ["userOrders", filterStatus, sortOption],
    queryFn: async () => {
      let query = supabase
        .from("orders")
        .select(
          `
        *,
        order_items (
          *,
          product_variants (*)
        )
      `
        );

      // Apply filter
      if (filterStatus) {
        if(filterStatus !== "all") {
          query = query.eq("status", filterStatus);
        }
      }

      // Apply sorting
      if (sortOption === "created_at_desc") {
        query = query.order("created_at", { ascending: false });
      } else if (sortOption === "created_at_asc") {
        query = query.order("created_at", { ascending: true });
      } else if (sortOption === "total_desc") {
        query = query.order("total", { ascending: false });
      } else if (sortOption === "total_asc") {
        query = query.order("total", { ascending: true });
      }

      const { data, error } = await query;

      if (error) {
        console.error("Supabase Query Error:", error);
        throw error;
      }
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
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const downloadPDF = async () => {
    setIsDownloading(true);
    const element = document.getElementById("order-details-dialog");
    if (!element) {
      setIsDownloading(false);
      return;
    }

    const options = {
      margin: 0.5,
      filename: `Order_${selectedOrder.id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    try {
      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">My Orders</h1>

        {/* Filter and Sort Options */}
        <div className="flex items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <Select onValueChange={(value) => setFilterStatus(value)} value={filterStatus || ""}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              {/* <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem> */}
              <SelectItem value="completed">Payment Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort by Options */}
          <Select onValueChange={(value) => setSortOption(value)} value={sortOption}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at_desc">Date: Newest First</SelectItem>
              <SelectItem value="created_at_asc">Date: Oldest First</SelectItem>
              <SelectItem value="total_desc">Total: High to Low</SelectItem>
              <SelectItem value="total_asc">Total: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
            <div id="order-details-dialog" className="space-y-6">
              {/* Logo and Seller Information */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold">Seller Information</h3>
                  <p className="text-sm">Seller Name: XYZ Pvt. Ltd.</p>
                  <p className="text-sm">GST Number: 22AAAAA0000A1Z5</p>
                  <p className="text-sm">
                    Address: 123 Business Street, City, State, 123456
                  </p>
                </div>
                <div>
                  <img
                    src="../assets/logo.png" // Replace with the actual logo path
                    alt="Seller Logo"
                    className="h-16"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="font-medium">Order Information</h3>
                  <p className="text-sm">Order ID: {selectedOrder.id}</p>
                  <p className="text-sm">
                    Date: {format(new Date(selectedOrder.created_at), "PPpp")}
                  </p>
                  <p className="text-sm">
                    Payment Method: {selectedOrder.payment_method}
                  </p>
                  <p className="text-sm">
                    Status:
                    <Badge
                      className={`ml-2 ${getStatusColor(selectedOrder.status)}`}
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
                  <p className="text-sm">
                    GST Address: {selectedOrder.gst_address}
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
                        <TableCell>{item?.product_variants?.size}</TableCell>
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

                <div className="text-right mt-4">
              {!isDownloading && (
                  <Button
                    onClick={downloadPDF}
                    className="bg-blue-500 text-white px-4 py-2 rounded no-print"
                  >
                    Download PDF
                  </Button>
              )}
                </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default UserOrdersPage;
