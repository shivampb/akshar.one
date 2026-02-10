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
import { ProjectSpecsSection } from "./property-form/ProjectSpecsSection";
import { AddressSection } from "./property-form/AddressSection";
import { DescriptionSection } from "./property-form/DescriptionSection";
import { ImageUploadSection } from "./property-form/ImageUploadSection";
import { FeaturesSection } from "./property-form/FeaturesSection";
import { LocationSection } from "./property-form/LocationSection";
import { BrochureUploadSection } from "./property-form/BrochureUploadSection";
import { FAQSection } from "./property-form/FAQSection";
import { SeoSection } from "./property-form/SeoSection";

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

    const form = useForm<any>({
        resolver: zodResolver(propertySchema) as any,
        defaultValues: {
            name: "",
            category: "Residential",
            type: "Apartment",
            location: "",
            address: "",
            price: 0,
            price_on_request: false,
            shortDescription: "",
            fullDescription: "",
            isFeatured: false,
            features: { area: 0, facing: "" },
            images: [],
            amenities: [],
            country: "",
            state: "",
            city: "",
            coordinates: { lat: 0, lng: 0 },
            possession_date: "",
            configuration: "",
            possession_status: "",
            meta_title: "",
            meta_description: "",
            keywords: "",
            faqs: [],
        } as PropertyFormValues,
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
                // Project Specs
                project_units: editingProperty.project_units || "",
                project_area: editingProperty.project_area || "",
                size_range: editingProperty.size_range || "",
                project_size: editingProperty.project_size || "",
                launch_date: editingProperty.launch_date || "",
                possession_date: editingProperty.possession_date || "",
                avg_price: editingProperty.avg_price || "",
                configuration: editingProperty.configuration || "",
                rera_id: editingProperty.rera_id || "",
                brochure_url: editingProperty.brochure_url || "",
                possession_status: editingProperty.possession_status || "",
                area_name: editingProperty.area_name || "",
                map_url: editingProperty.map_url || "",
                faqs: editingProperty.faqs || [],
                price_on_request: editingProperty.price_on_request || false,
                amenities: editingProperty.amenities || [],
                // SEO Fields
                meta_title: editingProperty.meta_title || "",
                meta_description: editingProperty.meta_description || "",
                keywords: editingProperty.keywords || "",
            });
        } else {
            form.reset({
                category: "Residential",
                type: "Apartment",
                isFeatured: false,
                features: {
                    area: 0,
                    facing: "",
                },
                images: [],
                coordinates: { lat: 0, lng: 0 },
                country: "",
                state: "",
                city: "",
                // Project Specs
                project_units: "",
                project_area: "",
                size_range: "",
                project_size: "",
                launch_date: "",
                possession_date: "",
                avg_price: "",
                configuration: "",
                rera_id: "",
                brochure_url: "",
                possession_status: "",
                area_name: "",
                map_url: "",
                faqs: [],
                price_on_request: false,
                amenities: [],
                // SEO Fields
                meta_title: "",
                meta_description: "",
                keywords: "",
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

            // Project Specs
            project_units: data.project_units,
            project_area: data.project_area,
            size_range: data.size_range,
            project_size: data.project_size,
            launch_date: data.launch_date,
            possession_date: data.possession_date,
            avg_price: data.avg_price,
            configuration: data.configuration,
            rera_id: data.rera_id,
            brochure_url: data.brochure_url,
            possession_status: data.possession_status,
            area_name: data.area_name,
            map_url: data.map_url,
            faqs: data.faqs,
            price_on_request: data.price_on_request,
            // SEO Fields
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            keywords: data.keywords,
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
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{editingProperty ? "Edit Property" : "Add Property"}</DialogTitle>
                </DialogHeader>

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <BasicDetailsSection />
                                <LocationSection />
                                <AddressSection />
                                <DescriptionSection />
                                <FeaturesSection />
                                <SeoSection />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                <ProjectSpecsSection />
                                <ImageUploadSection />
                                <BrochureUploadSection />
                                <FAQSection />
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            {editingProperty ? "Update Property" : "Create Property"}
                        </Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};
