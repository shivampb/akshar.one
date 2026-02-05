import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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

export const PropertyDialog = ({
    open,
    onOpenChange,
    editingProperty,
    onSuccess,
}: PropertyDialogProps) => {

    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
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
                country: editingProperty.country || "", // Add migration or optional check if DB doesn't have it yet
                state: editingProperty.state || "",
                city: editingProperty.city || "",
            });
        } else {
            form.reset({
                type: "Apartment",
                isFeatured: false,
                features: { area: 0, bedrooms: 0, bathrooms: 0, parking: 0 },
                images: [],
                coordinates: { lat: 0, lng: 0 },
                country: "",
                state: "",
                city: "",
            });
        }
    }, [editingProperty, form]);


    const onSubmit = async (data: PropertyFormValues) => {
        const slug = data.name.toLowerCase().replace(/ /g, "-");
        const priceLabel = `₹${data.price.toLocaleString()}`;

        const propertyData = {
            name: data.name,
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
