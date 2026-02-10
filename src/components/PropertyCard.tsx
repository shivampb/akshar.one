import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Square, ArrowRight } from "lucide-react";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="property-card group"
    >
      <Link to={`/properties/${property.slug}`}>
        {/* Image */}
        <div className="property-card-image">
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Property Type Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-background/90 backdrop-blur-sm text-foreground rounded-sm">
              {property.type}
            </span>
          </div>

          {/* Featured Badge */}
          {property.isFeatured && (
            <div className="absolute top-4 right-4">
              <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-gold text-white rounded-sm">
                Featured
              </span>
            </div>
          )}

          {/* View Details Overlay */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
              View Details
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-medium text-foreground mb-2 group-hover:text-gold transition-colors">
            {property.name}
          </h3>

          {/* Features */}
          <div className="flex items-center gap-4 pb-4 border-b border-border">
            {/* Show Bed/Bath only for Residential */}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {property.configuration && (
                <span>{property.configuration}</span>
              )}
              {property.features.area > 0 ? (
                <div className="flex items-center gap-1.5">
                  <Square className="w-4 h-4" />
                  <span>{property.features.area.toLocaleString()} sqft</span>
                </div>
              ) : property.size_range ? (
                <div className="flex items-center gap-1.5">
                  <Square className="w-4 h-4" />
                  <span>{property.size_range}</span>
                </div>
              ) : property.project_area ? (
                <div className="flex items-center gap-1.5">
                  <Square className="w-4 h-4" />
                  <span>{property.project_area}</span>
                </div>
              ) : property.project_size ? (
                <div className="flex items-center gap-1.5">
                  <Square className="w-4 h-4" />
                  <span>{property.project_size}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Price */}
          <div className="pt-4">
            <p className="text-2xl font-serif font-semibold text-gold">
              {property.price_on_request ? "Price on Request" : formatPrice(property.price)}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
