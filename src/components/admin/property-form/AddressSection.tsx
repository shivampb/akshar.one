import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyFormValues } from "./schema";

export const AddressSection = () => {
    const { register, setValue } = useFormContext<PropertyFormValues>();

    const handleMapUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        const latLngRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const match = url.match(latLngRegex);

        if (match) {
            const lat = parseFloat(match[1]);
            const lng = parseFloat(match[2]);
            if (!isNaN(lat) && !isNaN(lng)) {
                setValue("coordinates", { lat, lng });
                toast.success("Coordinates extracted from map link!");
            }
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input id="address" {...register("address")} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="mapUrl">Google Maps Link (Optional)</Label>
                <Input
                    id="mapUrl"
                    placeholder="Paste Google Maps URL (@lat,lng) to precise location..."
                    onChange={handleMapUrlChange}
                />
                <p className="text-xs text-muted-foreground">
                    Pasting a Google Maps link like ".../place/.../@40.712,-74.006,17z" will auto-save accurate coordinates.
                </p>
            </div>
        </div>
    );
};
