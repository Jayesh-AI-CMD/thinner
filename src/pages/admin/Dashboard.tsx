import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";
import { useRouter } from "next/router";

const Dashboard = () => {
  // --- Auth check ---
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) {
        router.replace("/login");
      }
    });
  }, [router]);
  // --- end auth check ---

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });

  // Fetch dashboard statistics
  const { isLoading } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      // Get product count
      const { count: productsCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      // Get order count and revenue
      const { data: orders } = await supabase
        .from("orders")
        .select("total");

      // Get customer count
      const { count: customersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Calculate total revenue
      const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0;

      setStats({
        totalProducts: productsCount || 0,
        totalOrders: orders?.length || 0,
        totalCustomers: customersCount || 0,
        totalRevenue,
      });

      return { success: true };
    },
  });

  const statCards = [
    {
      title: "Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "bg-orange-500",
    },
    {
      title: "Revenue",
      value: `₹${(stats.totalRevenue / 100).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-purple-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium h-5 bg-gray-200 rounded"></CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card) => (
              <Card key={card.title}>
                <CardHeader className="pb-2 flex justify-between items-start">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <div className={`${card.color} p-2 rounded-full text-white`}>
                    <card.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No recent orders to display.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No product data to display.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
