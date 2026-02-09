import { useState } from "react";
import { motion } from "framer-motion";
import { Property } from "@/data/properties";

interface PropertyKeyFeaturesProps {
    property: Property;
}

export const PropertyKeyFeatures = ({ property }: PropertyKeyFeaturesProps) => {
    const [selectedAreaUnit, setSelectedAreaUnit] = useState<string>("sqft");
    const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);

    // Area conversion factors (from sqft)
    const areaUnits = {
        sqft: { label: "sqft", factor: 1 },
        sqyrd: { label: "sqyrd", factor: 0.111111 },
        sqm: { label: "sqm", factor: 0.092903 },
        acre: { label: "acre", factor: 0.000022956 },
        bigha: { label: "bigha", factor: 0.000367 },
        hectare: { label: "hectare", factor: 0.000009290304 },
        marla: { label: "marla", factor: 0.003673 },
        kanal: { label: "kanal", factor: 0.000183486 },
        biswai: { label: "biswai", factor: 0.007334 },
        cent: { label: "cent", factor: 0.002296 },
        perch: { label: "perch", factor: 0.003673 },
        guntha: { label: "guntha", factor: 0.000918 },
        are: { label: "are", factor: 0.000929 },
        katha: { label: "katha", factor: 0.001389 },
        gaj: { label: "gaj", factor: 0.111111 },
        killa: { label: "killa", factor: 0.000230 },
        kuncham: { label: "kuncham", factor: 0.000918 },
    };

    const convertArea = (sqft: number, unit: string) => {
        const converted = sqft * areaUnits[unit as keyof typeof areaUnits].factor;
        return converted.toFixed(2);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-secondary/30 rounded-lg p-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Super Area with Dropdown */}
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Super Area</p>
                    <div className="flex items-baseline gap-2">
                        <p className="font-serif text-xl font-bold text-foreground">
                            {selectedAreaUnit === "sqft"
                                ? property.features.area.toLocaleString()
                                : convertArea(property.features.area, selectedAreaUnit)}
                        </p>

                        {/* Area Unit Dropdown */}
                        <div className="relative inline-block">
                            <button
                                onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
                                className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-0.5"
                            >
                                {areaUnits[selectedAreaUnit as keyof typeof areaUnits].label}
                                <svg
                                    className={`w-3 h-3 transition-transform ${isAreaDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isAreaDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsAreaDropdownOpen(false)}
                                    />
                                    <div className="absolute z-50 mt-1 left-0 w-36 bg-card border border-border rounded-md shadow-xl max-h-60 overflow-y-auto">
                                        {Object.entries(areaUnits).map(([key, { label }]) => (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setSelectedAreaUnit(key);
                                                    setIsAreaDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary transition-colors ${selectedAreaUnit === key
                                                    ? 'bg-secondary text-gold font-medium'
                                                    : 'text-foreground'
                                                    }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {property.features.area > 0 && (
                        <p className="text-xs text-muted-foreground">
                            ₹{Math.round(property.price / property.features.area).toLocaleString()}/sqft
                        </p>
                    )}
                </div>

                {property.features.facing && (
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Facing</p>
                        <p className="font-serif text-xl font-bold text-foreground">
                            {property.features.facing}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
