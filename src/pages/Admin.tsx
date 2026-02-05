import { useState, useEffect } from "react";
import { Property } from "@/data/properties";
import { supabase } from "@/lib/supabase";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, LogOut } from "lucide-react";

import { AdminLogin } from "@/components/admin/AdminLogin";
import { PropertyList } from "@/components/admin/PropertyList";
import { PropertyDialog } from "@/components/admin/PropertyDialog";

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [properties, setProperties] = useState<Property[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);

    useEffect(() => {
        // Check if previously logged in (optional, but good for UX)
        // For now, simple state as before
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        const { data, error } = await supabase.from('properties').select('*');
        if (error) {
            console.error("Error fetching properties:", error);
            // toast.error("Failed to fetch properties");
        } else {
            setProperties(data as Property[]);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const startEdit = (property: Property) => {
        setEditingProperty(property);
        setIsDialogOpen(true);
    };

    const startAdd = () => {
        setEditingProperty(null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this property?")) {
            const { error } = await supabase.from('properties').delete().eq('id', id);
            if (error) {
                console.error(error);
                toast.error("Failed to delete property");
            } else {
                toast.success("Property deleted");
                fetchProperties();
            }
        }
    };

    const handleDialogSuccess = () => {
        setIsDialogOpen(false);
        setEditingProperty(null);
        fetchProperties();
    };

    if (!isAuthenticated) {
        return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 pt-24 min-h-[calc(100vh-80px)]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Property Management</h1>
                        <p className="text-muted-foreground mt-1">Manage your property listings and details.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={startAdd} className="gap-2">
                            <Plus className="h-4 w-4" /> Add Property
                        </Button>
                        <Button variant="outline" onClick={handleLogout} className="gap-2">
                            <LogOut className="h-4 w-4" /> Logout
                        </Button>
                    </div>
                </div>

                <PropertyList
                    properties={properties}
                    onEdit={startEdit}
                    onDelete={handleDelete}
                />

                <PropertyDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    editingProperty={editingProperty}
                    onSuccess={handleDialogSuccess}
                />
            </div>
        </Layout>
    );
};

export default Admin;
