import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

    useEffect(() => {
        if (!isResidential) {
            setValue("features.bedrooms", 0);
            setValue("features.bathrooms", 0);
            setValue("features.parking", 0);
        }
    }, [isResidential, setValue]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2 col-span-4 sm:col-span-1">
                    <Label htmlFor="area">Area (sq ft)</Label>
                    <Input
                        id="area"
                        type="number"
                        {...register("features.area", { valueAsNumber: true })}
                    />
                </div>

                {isResidential && (
                    <>
                        <div className="space-y-2 col-span-4 sm:col-span-1">
                            <Label htmlFor="bedrooms">Bedrooms</Label>
                            <Input
                                id="bedrooms"
                                type="number"
                                {...register("features.bedrooms", { valueAsNumber: true })}
                            />
                        </div>
                        <div className="space-y-2 col-span-4 sm:col-span-1">
                            <Label htmlFor="bathrooms">Bathrooms</Label>
                            <Input
                                id="bathrooms"
                                type="number"
                                {...register("features.bathrooms", { valueAsNumber: true })}
                            />
                        </div>
                        <div className="space-y-2 col-span-4 sm:col-span-1">
                            <Label htmlFor="parking">Parking</Label>
                            <Input
                                id="parking"
                                type="number"
                                {...register("features.parking", { valueAsNumber: true })}
                            />
                        </div>
                    </>
                )}

                {/* Additional Fields */}
                {isCommercial && (
                    <div className="space-y-2 col-span-4 sm:col-span-1">
                        <Label htmlFor="maintenanceCharges">Maintenance (Monthly)</Label>
                        <Input
                            id="maintenanceCharges"
                            type="number"
                            {...register("features.maintenanceCharges", { valueAsNumber: true })}
                        />
                    </div>
                )}

                {!isPlot && (
                    <div className="space-y-2 col-span-4 sm:col-span-1">
                        <Label htmlFor="propertyAge">Property Age</Label>
                        <Select
                            onValueChange={(value) => setValue("features.propertyAge", value)}
                            defaultValue={watch("features.propertyAge")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Age" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="New Construction">New Construction</SelectItem>
                                <SelectItem value="0-1 Year">0-1 Year</SelectItem>
                                <SelectItem value="1-5 Years">1-5 Years</SelectItem>
                                <SelectItem value="5-10 Years">5-10 Years</SelectItem>
                                <SelectItem value="10+ Years">10+ Years</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {(isApartment || isCommercial) && (
                    <>
                        <div className="space-y-2 col-span-4 sm:col-span-1">
                            <Label htmlFor="unitsOnFloor">Units on Floor</Label>
                            <Input
                                id="unitsOnFloor"
                                type="number"
                                {...register("features.unitsOnFloor", { valueAsNumber: true })}
                            />
                        </div>
                        <div className="space-y-2 col-span-4 sm:col-span-1">
                            <Label htmlFor="lifts">Lifts</Label>
                            <Input
                                id="lifts"
                                type="number"
                                {...register("features.lifts", { valueAsNumber: true })}
                            />
                        </div>
                    </>
                )}

                <div className="space-y-2 col-span-4 sm:col-span-1">
                    <Label htmlFor="facing">Facing</Label>
                    <Select
                        onValueChange={(value) => setValue("features.facing", value)}
                        defaultValue={watch("features.facing")}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Facing" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="North">North</SelectItem>
                            <SelectItem value="South">South</SelectItem>
                            <SelectItem value="East">East</SelectItem>
                            <SelectItem value="West">West</SelectItem>
                            <SelectItem value="North-East">North-East</SelectItem>
                            <SelectItem value="North-West">North-West</SelectItem>
                            <SelectItem value="South-East">South-East</SelectItem>
                            <SelectItem value="South-West">South-West</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2 col-span-4 sm:col-span-1">
                    <Label htmlFor="waterAvailability">Water Availability</Label>
                    <Select
                        onValueChange={(value) => setValue("features.waterAvailability", value)}
                        defaultValue={watch("features.waterAvailability")}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="24 Hours">24 Hours</SelectItem>
                            <SelectItem value="12 Hours">12 Hours</SelectItem>
                            <SelectItem value="6 Hours">6 Hours</SelectItem>
                            <SelectItem value="Rare">Rare</SelectItem>
                        </SelectContent>
                    </Select>
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
