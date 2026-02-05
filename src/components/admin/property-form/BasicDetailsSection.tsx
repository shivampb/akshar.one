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
import { PropertyType } from "@/data/properties";



export const BasicDetailsSection = () => {
    const { register, setValue, formState: { errors } } = useFormContext<PropertyFormValues>();

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="name">Property Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                    onValueChange={(value) => setValue("type", value as PropertyType)}
                    defaultValue="Apartment"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Plot">Plot</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
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
