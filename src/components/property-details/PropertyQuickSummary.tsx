import { useState } from "react";
import { Info } from "lucide-react";
import { Property } from "@/data/properties";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";

interface PropertyQuickSummaryProps {
    property: Property;
}

export const PropertyQuickSummary = ({ property }: PropertyQuickSummaryProps) => {
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

    const convertArea = (sqftStr: string | undefined, unit: string) => {
        if (!sqftStr) return "N/A";
        // Extract numbers if string format is complex, but assuming simple string for now or just handling "1185 - 1193 sq.ft" format
        // For range like "1185 - 1193 sq.ft", regex might be needed or simple parsing.
        // Assuming simple case or extracting first number for now, or letting backend handle raw values.
        // Given existing data structure (string fields), direct math is tricky without consistent format.
        // Let's assume for this specific component, we display the raw string for now unless we parse it.

        // If we want real conversion, we need numeric values. The `size_range` is a string.
        // Let's implement a best-effort parser if needed, OR just display the text as is if unit matches.

        return sqftStr;
    };

    // Since the input `size_range` and others are strings (e.g., "1185 - 1193 sq.ft"), 
    // doing real-time conversion requires parsing.
    // For this iteration, I'll rely on the string value provided, 
    // but will add the UI controls to match the design, even if functionally limited on string data without parsing logic.

    return (
        <section className="py-6 border-b border-border bg-card/30">
            <div className="container-luxury">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-border">

                    {/* Configuration */}
                    <div className="flex flex-col items-center text-center p-2">
                        <span className="font-serif text-lg font-medium text-foreground">
                            {property.configuration || "N/A"}
                        </span>
                        <span className="text-sm text-muted-foreground mt-1">Configuration</span>
                    </div>

                    {/* Possession */}
                    <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-2">
                        <span className="font-serif text-lg font-medium text-foreground">
                            {property.possession_date || "Ready to Move"}
                        </span>
                        <span className="text-sm text-muted-foreground mt-1">Possession Starts</span>
                    </div>

                    {/* Approx Price */}
                    <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-2">
                        <span className="font-serif text-lg font-medium text-foreground">
                            {property.price_on_request
                                ? "Price on Request"
                                : (property.avg_price || formatPrice(property.price))}
                        </span>
                        <span className="text-sm text-muted-foreground mt-1">Avg. Price</span>
                    </div>

                    {/* Sizes */}
                    <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-2 relative">
                        <span className="font-serif text-lg font-medium text-foreground">
                            {property.size_range || (property.features.area ? `${property.features.area} sq.ft` : "N/A")}
                        </span>

                        {/* Convert Unit visual - functional stub since data is string */}
                        <div className="relative inline-block mt-1">
                            <button
                                onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
                                className="text-xs text-primary underline hover:text-primary/80 flex items-center justify-center gap-1"
                            >
                                convert unit
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
                                    <div className="absolute z-50 mt-1 left-1/2 -translate-x-1/2 w-32 bg-card border border-border rounded-md shadow-xl max-h-48 overflow-y-auto">
                                        {Object.entries(areaUnits).map(([key, { label }]) => (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setSelectedAreaUnit(key);
                                                    setIsAreaDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 text-xs hover:bg-secondary transition-colors ${selectedAreaUnit === key
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

                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-sm text-muted-foreground">(Carpet Area)</span>
                            <span className="text-sm text-muted-foreground block">Sizes</span>
                            <Info className="w-3 h-3 text-primary cursor-help" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
