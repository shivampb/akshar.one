import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PropertyFormValues } from "./schema";

export const LocationSection = () => {
    const { setValue, watch, formState: { errors } } = useFormContext<PropertyFormValues>();

    // Watch fields to handle dependencies
    const selectedCountryCode = watch("country");
    const selectedStateCode = watch("state");

    // Get all countries - Memoized
    const countries = useMemo(() => Country.getAllCountries(), []);

    // Get states based on selected country - Memoized
    const states = useMemo(() => {
        if (!selectedCountryCode) return [];
        return State.getStatesOfCountry(selectedCountryCode);
    }, [selectedCountryCode]);

    // Get cities based on selected state - Memoized
    const cities = useMemo(() => {
        if (!selectedCountryCode || !selectedStateCode) return [];
        return City.getCitiesOfState(selectedCountryCode, selectedStateCode);
    }, [selectedCountryCode, selectedStateCode]);

    // Reset state and city when country changes
    useEffect(() => {
        setValue("state", "");
        setValue("city", "");
    }, [selectedCountryCode, setValue]);

    // Reset city when state changes
    useEffect(() => {
        setValue("city", "");
    }, [selectedStateCode, setValue]);

    // Update the main 'location' field whenever City, State or Country changes
    const selectedCity = watch("city");
    useEffect(() => {
        if (selectedCountryCode && selectedStateCode && selectedCity) {
            const country = countries.find(c => c.isoCode === selectedCountryCode)?.name;
            const state = states.find(s => s.isoCode === selectedStateCode)?.name;
            // Format: "City, State, Country"
            setValue("location", `${selectedCity}, ${state}, ${country}`);
        }
    }, [selectedCountryCode, selectedStateCode, selectedCity, setValue, countries, states]);

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                    onValueChange={(value) => setValue("country", value)}
                    value={watch("country")}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                        {countries.map((country) => (
                            <SelectItem key={country.isoCode} value={country.isoCode}>
                                {country.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.country && (
                    <p className="text-red-500 text-sm">{errors.country.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Select
                    onValueChange={(value) => setValue("state", value)}
                    value={watch("state")}
                    disabled={!selectedCountryCode}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={selectedCountryCode ? "Select State" : "Select Country First"} />
                    </SelectTrigger>
                    <SelectContent>
                        {states && states.length > 0 ? (
                            states.map((state) => (
                                <SelectItem key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem value="no-states" disabled>
                                No states found
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
                {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select
                    onValueChange={(value) => setValue("city", value)}
                    value={watch("city")}
                    disabled={!selectedStateCode}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={selectedStateCode ? "Select City" : "Select State First"} />
                    </SelectTrigger>
                    <SelectContent>
                        {cities && cities.length > 0 ? (
                            cities.map((city) => (
                                <SelectItem key={`${city.name}-${city.latitude}`} value={city.name}>
                                    {city.name}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem value="no-cities" disabled>
                                No cities found
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
                {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
            </div>
        </div>
    );
};
