
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { format } from "date-fns";

const CustomersPage = () => {
  // Fetch customers (profiles)
  const { data: customers, isLoading } = useQuery({
    queryKey: ["adminCustomers"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;
      return data;
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Customers</h1>
        
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
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Last login date</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers?.users?.map((customer: any) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.email || "N/A"}</TableCell>
                  <TableCell>{customer.phone || "N/A"}</TableCell>
                  <TableCell>
                    {customer.last_sign_in_at 
                      ? format(new Date(customer.last_sign_in_at), "MMM dd, yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {customer.created_at 
                      ? format(new Date(customer.created_at), "MMM dd, yyyy")
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}

              {customers?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No customers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </AdminLayout>
  );
};

export default CustomersPage;
