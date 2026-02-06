import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PropertyFormValues } from "./schema";

const CATEGORIES = ["Residential", "Commercial", "Plot"] as const;

const PROPERTY_TYPES: Record<string, string[]> = {
    Residential: ["Apartment", "Villa", "Bungalow"],
    Commercial: ["Shop", "Office", "Showroom", "Warehouse", "Commercial"],
    Plot: ["Residential Plot", "Commercial Plot", "Industrial Plot", "Agricultural Land", "Plot"],
};

export const BasicDetailsSection = () => {
    const { register, setValue, watch, formState: { errors } } = useFormContext<PropertyFormValues>();
    const category = watch("category");
    const currentType = watch("type");

    useEffect(() => {
        if (category && PROPERTY_TYPES[category]) {
            if (!PROPERTY_TYPES[category].includes(currentType)) {
                setValue("type", PROPERTY_TYPES[category][0]);
            }
        }
    }, [category, setValue]);

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2 sm:col-span-1">
                <Label htmlFor="category">Category</Label>
                <Select
                    onValueChange={(value) => setValue("category", value as "Residential" | "Commercial" | "Plot")}
                    value={category}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
                <Label htmlFor="type">Property Type</Label>
                <Select
                    onValueChange={(value) => setValue("type", value)}
                    value={currentType}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        {category && PROPERTY_TYPES[category]?.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.type && (
                    <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
            </div>

            <div className="space-y-2 col-span-2">
                <Label htmlFor="name">Property Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2 col-span-2">
                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                />
            </div>

        </div>
    );
};
