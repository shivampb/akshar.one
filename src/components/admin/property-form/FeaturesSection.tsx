import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PropertyFormValues } from "./schema";

export const FeaturesSection = () => {
    const { register, watch, setValue } = useFormContext<PropertyFormValues>();

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="area">Area (sq ft)</Label>
                    <Input
                        id="area"
                        type="number"
                        {...register("features.area", { valueAsNumber: true })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                        id="bedrooms"
                        type="number"
                        {...register("features.bedrooms", { valueAsNumber: true })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                        id="bathrooms"
                        type="number"
                        {...register("features.bathrooms", { valueAsNumber: true })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="parking">Parking</Label>
                    <Input
                        id="parking"
                        type="number"
                        {...register("features.parking", { valueAsNumber: true })}
                    />
                </div>
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
        </div>
    );
};
