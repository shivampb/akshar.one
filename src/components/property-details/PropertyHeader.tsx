import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Property } from "@/data/properties";

interface PropertyHeaderProps {
    property: Property;
    fetchedLocation: string | null;
}

export const PropertyHeader = ({ property, fetchedLocation }: PropertyHeaderProps) => {
    return (
        <section className="pb-8">
            <div className="container-luxury">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-secondary text-foreground rounded-sm">
                                {property.type}
                            </span>
                            {property.isFeatured && (
                                <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-gold text-white rounded-sm">
                                    Featured
                                </span>
                            )}
                        </div>
                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-3">
                            {property.name}
                        </h1>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{fetchedLocation || property.address}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-left lg:text-right"
                    >
                        <div>
                            <p className="text-2xl md:text-3xl font-serif font-bold text-gold">
                                {property.price_on_request ? "Price on Request" : formatPrice(property.price)}
                            </p>
                        </div>
                        <div className="flex flex-col items-start lg:items-end gap-1">
                            {!property.price_on_request && property.features.area > 0 && (
                                <p className="text-sm font-medium text-gold">
                                    ₹{Math.round(property.price / property.features.area).toLocaleString()}/sq.ft
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
