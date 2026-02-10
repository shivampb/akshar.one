import * as z from "zod";

export const propertySchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.enum(["Residential", "Commercial", "Plot"] as const),
    type: z.string().min(1, "Type is required"),
    location: z.string().min(1, "Location is required"),
    address: z.string().min(1, "Address is required"),
    price: z.number().min(0).optional().default(0),
    price_on_request: z.boolean().optional().default(false),
    shortDescription: z.string().min(1, "Short description is required"),
    fullDescription: z.string().min(1, "Full description is required"),
    isFeatured: z.boolean().default(false),
    features: z.object({
        area: z.number().min(0),
        facing: z.string().optional(),
    }),
    images: z.array(z.string()).min(1, "At least one image is required"),
    amenities: z.array(z.string()).default([]),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
    }).default({ lat: 0, lng: 0 }),

    // Project Specifications
    project_units: z.string().optional(),
    project_area: z.string().optional(),
    size_range: z.string().optional(),
    project_size: z.string().optional(),
    launch_date: z.string().optional(),
    possession_date: z.string().min(1, "Possession Date is required"),
    avg_price: z.string().optional(),
    configuration: z.string().min(1, "Configuration is required"),
    rera_id: z.string().optional(),
    brochure_url: z.string().optional(),
    possession_status: z.string().min(1, "Possession Status is required"),
    area_name: z.string().optional(),
    map_url: z.string().optional(),
    faqs: z.array(z.object({
        question: z.string().min(1, "Question is required"),
        answer: z.string().min(1, "Answer is required"),
    })).optional(),
    // SEO Fields
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    keywords: z.string().optional(),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;
