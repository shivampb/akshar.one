import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

import { Property } from "@/data/properties";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { propertySchema, PropertyFormValues } from "./property-form/schema";
import { BasicDetailsSection } from "./property-form/BasicDetailsSection";
import { AddressSection } from "./property-form/AddressSection";
import { DescriptionSection } from "./property-form/DescriptionSection";
import { ImageUploadSection } from "./property-form/ImageUploadSection";
import { FeaturesSection } from "./property-form/FeaturesSection";
import { LocationSection } from "./property-form/LocationSection";

interface PropertyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingProperty: Property | null;
    onSuccess: () => void;
}

const getCategoryFromType = (type: string): "Residential" | "Commercial" | "Plot" => {
    if (["Apartment", "Villa", "Bungalow"].includes(type)) return "Residential";
    if (["Shop", "Office", "Showroom", "Warehouse", "Commercial"].includes(type)) return "Commercial";
    if (["Plot", "Residential Plot", "Commercial Plot", "Industrial Plot", "Agricultural Land"].includes(type)) return "Plot";
    return "Residential";
};

export const PropertyDialog = ({
    open,
    onOpenChange,
    editingProperty,
    onSuccess,
}: PropertyDialogProps) => {

    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            category: "Residential",
            type: "Apartment",
            isFeatured: false,
            features: { area: 0, bedrooms: 0, bathrooms: 0, parking: 0 },
            images: [],
            coordinates: { lat: 0, lng: 0 },
            country: "",
            city: "",
        },
    });

    useEffect(() => {
        if (editingProperty) {
            form.reset({
                name: editingProperty.name,
                category: editingProperty.category || getCategoryFromType(editingProperty.type),
                type: editingProperty.type,
                location: editingProperty.location,
                address: editingProperty.address,
                price: editingProperty.price,
                shortDescription: editingProperty.shortDescription,
                fullDescription: editingProperty.fullDescription,
                isFeatured: editingProperty.isFeatured,
                features: editingProperty.features,
                images: editingProperty.images || [],
                coordinates: editingProperty.coordinates || { lat: 0, lng: 0 },
                country: editingProperty.country || "",
                state: editingProperty.state || "",
                city: editingProperty.city || "",
            });
        } else {
            form.reset({
                category: "Residential",
                type: "Apartment",
                isFeatured: false,
                features: {
                    area: 0,
                    bedrooms: 0,
                    bathrooms: 0,
                    parking: 0,
                    maintenanceCharges: 0,
                    unitsOnFloor: 0,
                    lifts: 0,
                },
                images: [],
                coordinates: { lat: 0, lng: 0 },
                country: "",
                state: "",
                city: "",
                amenities: [],
            });
        }
    }, [editingProperty, form]);



    const onSubmit = async (data: PropertyFormValues) => {
        const slug = data.name.toLowerCase().replace(/ /g, "-");
        const priceLabel = formatPrice(data.price);

        const propertyData = {
            name: data.name,
            category: data.category,
            type: data.type,
            location: data.location,
            address: data.address,
            price: data.price,
            shortDescription: data.shortDescription,
            fullDescription: data.fullDescription,
            isFeatured: data.isFeatured,
            features: data.features,
            images: data.images,
            slug,
            priceLabel,
            amenities: data.amenities,
            coordinates: data.coordinates,
            country: data.country,
            state: data.state,
            city: data.city,
        };

        if (editingProperty) {
            // Update existing
            const { error } = await supabase
                .from('properties')
                .update(propertyData)
                .eq('id', editingProperty.id);

            if (error) {
                console.error(error);
                toast.error("Failed to update property");
                return;
            }

            toast.success("Property updated");
        } else {
            // Add new
            const { error } = await supabase
                .from('properties')
                .insert([propertyData]);

            if (error) {
                console.error(error);
                toast.error("Failed to create property");
                return;
            }

            toast.success("Property added");
        }

        onSuccess();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{editingProperty ? "Edit Property" : "Add Property"}</DialogTitle>
                </DialogHeader>

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">

                        <BasicDetailsSection />

                        <LocationSection />

                        <AddressSection />

                        <DescriptionSection /> <ImageUploadSection />

                        <FeaturesSection />

                        <Button type="submit" className="w-full">
                            {editingProperty ? "Update Property" : "Create Property"}
                        </Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};
