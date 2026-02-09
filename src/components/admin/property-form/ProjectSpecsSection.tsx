import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyFormValues } from "./schema";

export const ProjectSpecsSection = () => {
    const { register } = useFormContext<PropertyFormValues>();

    return (
        <div className="space-y-4 rounded-lg bg-card p-4 border shadow-sm">
            <h3 className="text-lg font-medium">Project Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="features.area">Super Area (sq ft)</Label>
                    <Input id="features.area" type="number" {...register("features.area", { valueAsNumber: true })} placeholder="e.g. 1500" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="features.facing">Facing</Label>
                    <Input id="features.facing" {...register("features.facing")} placeholder="e.g. North-East" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="project_units">Project Units</Label>
                    <Input id="project_units" {...register("project_units")} placeholder="e.g. 104" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="project_area">Project Area</Label>
                    <Input id="project_area" {...register("project_area")} placeholder="e.g. 0.67 Acres" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="size_range">Size Range</Label>
                    <Input id="size_range" {...register("size_range")} placeholder="e.g. 1185 - 1193 sq.ft." />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="project_size">Project Size</Label>
                    <Input id="project_size" {...register("project_size")} placeholder="e.g. 2 Buildings - 104 units" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="launch_date">Launch Date</Label>
                    <Input id="launch_date" {...register("launch_date")} placeholder="e.g. Dec, 2022" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="possession_date">Possession Date <span className="text-destructive">*</span></Label>
                    <Input id="possession_date" {...register("possession_date")} placeholder="e.g. Dec, 2027" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="possession_status">Possession Status <span className="text-destructive">*</span></Label>
                    <Input id="possession_status" {...register("possession_status")} placeholder="e.g. Under Construction" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="avg_price">Avg. Price</Label>
                    <Input id="avg_price" {...register("avg_price")} placeholder="e.g. Price on request" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="configuration">Configuration <span className="text-destructive">*</span></Label>
                    <Input id="configuration" {...register("configuration")} placeholder="e.g. 3 BHK Apartment" />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="rera_id">RERA ID</Label>
                    <Input id="rera_id" {...register("rera_id")} placeholder="e.g. PR/GJ/..." />
                </div>
            </div>
        </div>
    );
};
