import { motion } from "framer-motion";
import { Property } from "@/data/properties";

interface PropertyLocationProps {
    property: Property;
}

export const PropertyLocation = ({ property }: PropertyLocationProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h2 className="font-serif text-2xl font-medium mb-4">
                Location
            </h2>
            <div className="gold-line mb-6 mx-0" />

            {/* Display City, State, Country if available */}
            {(property.city || property.state || property.country) && (
                <div className="flex flex-wrap gap-2 mb-4 text-muted-foreground">
                    {property.city && (
                        <span className="flex items-center gap-1">
                            <span className="font-medium text-foreground">City:</span> {property.city}
                        </span>
                    )}
                    {property.state && (
                        <span className="flex items-center gap-1">
                            <span className="text-gold">•</span>
                            <span className="font-medium text-foreground">State:</span> {property.state}
                        </span>
                    )}
                    {property.country && (
                        <span className="flex items-center gap-1">
                            <span className="text-gold">•</span>
                            <span className="font-medium text-foreground">Country:</span> {property.country}
                        </span>
                    )}
                </div>
            )}

            {/* Full Address */}
            <div className="mb-6 p-4 bg-secondary/10 rounded-lg border border-primary/10">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Property Address</h3>
                <p className="text-lg font-serif mb-1">{property.address}</p>
                {property.area_name && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
                        <span className="font-medium">Area:</span> {property.area_name}
                    </p>
                )}
            </div>

            <div className="aspect-video rounded-sm overflow-hidden bg-muted">
                <iframe
                    src={property.map_url || `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${property.coordinates && property.coordinates.lat !== 0
                        ? `${property.coordinates.lat},${property.coordinates.lng}`
                        : encodeURIComponent(property.address)
                        }`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map location of ${property.name}`}
                />
            </div>
        </motion.div>
    );
};
