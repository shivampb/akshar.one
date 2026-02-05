import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PropertyFormValues } from "./schema";

export const DescriptionSection = () => {
    const { register } = useFormContext<PropertyFormValues>();

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input id="shortDescription" {...register("shortDescription")} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea id="fullDescription" {...register("fullDescription")} className="min-h-[100px]" />
            </div>
        </div>
    );
};
