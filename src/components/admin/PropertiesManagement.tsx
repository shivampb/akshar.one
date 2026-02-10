"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { PropertyList } from "@/components/admin/PropertyList";
import { PropertyDialog } from "@/components/admin/PropertyDialog";
import { supabase } from "@/lib/supabase";
import { Property } from "@/data/properties";
import { useParams } from "next/navigation";

export default function PropertiesManagement() {
    const router = useRouter();
    const [properties, setProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const params = useParams();
    const autoOpenRef = useRef(false);


    useEffect(() => {
        fetchProperties();
    }, []);

    useEffect(() => {
        if (search) {
            const filtered = properties.filter((property) =>
                property.name.toLowerCase().includes(search.toLowerCase()) ||
                property.location.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProperties(filtered);
        } else {
            setFilteredProperties(properties);
        }
    }, [search, properties]);

    // Auto-open dialog based on URL (Only on initial load/mount)
    useEffect(() => {
        if (properties.length === 0 || autoOpenRef.current) return;

        const id = params?.id;
        if (id) {
            const prop = properties.find(p => String(p.id) === String(id));
            if (prop) {
                setEditingProperty(prop);
                setIsDialogOpen(true);
                autoOpenRef.current = true; // Prevent re-triggering if we stay on this page
            }
        }
    }, [params, properties]);

    async function fetchProperties() {
        if (!supabase) {
            setIsLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from("properties")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;

            const mappedProperties: Property[] = (data || []).map((item: any) => ({
                id: item.id,
                name: item.name,
                slug: item.slug,
                category: item.category,
                type: item.type,
                location: item.location,
                address: item.address,
                price: item.price,
                price_on_request: item.price_on_request,
                shortDescription: item.shortDescription,
                fullDescription: item.fullDescription,
                images: item.images || [],
                features: item.features || { area: 0 },
                status: item.status,
                isFeatured: item.isFeatured,
                // Project Specs
                project_units: item.project_units,
                project_area: item.project_area,
                size_range: item.size_range,
                project_size: item.project_size,
                launch_date: item.launch_date,
                possession_date: item.possession_date,
                avg_price: item.avg_price,
                configuration: item.configuration,
                rera_id: item.rera_id,
                brochure_url: item.brochure_url,
                possession_status: item.possession_status,
                area_name: item.area_name,
                map_url: item.map_url,
                faqs: item.faqs || [],
                amenities: item.amenities || [],
                coordinates: item.coordinates || { lat: 0, lng: 0 },
                country: item.country,
                state: item.state,
                city: item.city,
                // SEO Fields
                meta_title: item.meta_title,
                meta_description: item.meta_description,
                keywords: item.keywords,
            }));

            setProperties(mappedProperties);
            setFilteredProperties(mappedProperties);
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this property?")) return;

        if (!supabase) return;

        try {
            const { error } = await supabase.from("properties").delete().eq("id", id);

            if (error) throw error;

            await fetchProperties();
        } catch (error) {
            console.error("Error deleting property:", error);
            alert("Failed to delete property");
        }
    }

    function handleEdit(property: Property) {
        setEditingProperty(property);
        setIsDialogOpen(true);
        // Use pushState instead of router.push to avoid full page remount/flicker
        window.history.pushState(null, '', `/admin/properties/edit/${property.id}`);
    }

    function handleAdd() {
        setEditingProperty(null);
        setIsDialogOpen(true);
        window.history.pushState(null, '', `/admin/properties/add`);
    }

    function handleDialogClose(open: boolean) {
        setIsDialogOpen(open);
        if (!open) {
            setEditingProperty(null);
            window.history.pushState(null, '', `/admin/properties`);
        }
    }

    function handleSuccess() {
        handleDialogClose(false);
        fetchProperties();
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
                        <p className="text-gray-600 mt-1">
                            Manage your property listings
                        </p>
                    </div>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleAdd}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Property
                    </Button>
                </div>

                {/* Search Bar */}
                <Card className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search properties by name or location..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </Card>

                {/* Properties List */}
                <Card className="p-6">
                    {isLoading ? (
                        <div className="text-center py-8">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                            <p className="mt-4 text-gray-600">Loading properties...</p>
                        </div>
                    ) : (
                        <PropertyList
                            properties={filteredProperties}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </Card>

                <PropertyDialog
                    open={isDialogOpen}
                    onOpenChange={handleDialogClose}
                    editingProperty={editingProperty}
                    onSuccess={handleSuccess}
                />
            </div>
        </AdminLayout>
    );
}
