import * as z from "zod";

export const propertySchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.enum(["Apartment", "Villa", "Plot", "Commercial"] as const),
    location: z.string().min(1, "Location is required"),
    address: z.string().min(1, "Address is required"),
    price: z.number().min(0, "Price must be positive"),
    shortDescription: z.string().min(1, "Short description is required"),
    fullDescription: z.string().min(1, "Full description is required"),
    isFeatured: z.boolean().default(false),
    features: z.object({
        area: z.number().min(0),
        bedrooms: z.number().min(0),
        bathrooms: z.number().min(0),
        parking: z.number().min(0),
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
});

export type PropertyFormValues = z.infer<typeof propertySchema>;
