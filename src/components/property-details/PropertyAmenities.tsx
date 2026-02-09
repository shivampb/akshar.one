import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PropertyAmenitiesProps {
    amenities: string[];
}

export const PropertyAmenities = ({ amenities }: PropertyAmenitiesProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h2 className="font-serif text-2xl font-medium mb-4">
                Amenities & Features
            </h2>
            <div className="gold-line mb-6 mx-0" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity) => (
                    <div
                        key={amenity}
                        className="flex items-center gap-3 p-3 bg-secondary rounded-sm"
                    >
                        <Check className="w-5 h-5 text-gold shrink-0" />
                        <span className="text-sm">{amenity}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
