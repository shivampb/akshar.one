import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PropertyFormValues } from "./schema";
import { useEffect } from "react";

export const FeaturesSection = () => {
    const { register, watch, setValue } = useFormContext<PropertyFormValues>();
    const category = watch("category");

    // Default to residential if not set (though it should be)
    const isResidential = !category || category === "Residential";
    const isCommercial = category === "Commercial";
    const isPlot = category === "Plot";

    const type = watch("type");
    const isApartment = type === "Apartment";

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
                {/* Additional Fields */}
            </div>

            <div className="space-y-2">
                <Label htmlFor="amenities">Amenities (comma separated)</Label>
                <Input
                    id="amenities"
                    placeholder="Pool, Gym, Wi-Fi, Garden"
                    onChange={(e) => {
                        const val = e.target.value;
                        const arr = val.split(",").map(s => s.trim()).filter(Boolean);
                        setValue("amenities", arr);
                    }}
                    defaultValue={watch("amenities")?.join(", ")}
                />
            </div>

            <div className="flex items-center space-x-2 bg-secondary/20 p-4 rounded-md">
                <Checkbox
                    id="isFeatured"
                    checked={watch("isFeatured")}
                    onCheckedChange={(checked) => setValue("isFeatured", checked as boolean)}
                />
                <Label htmlFor="isFeatured" className="cursor-pointer">Mark as Featured</Label>
            </div>
        </div >
    );
};
