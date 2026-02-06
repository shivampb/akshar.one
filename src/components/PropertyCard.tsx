import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react";
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

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {property.shortDescription}
          </p>

          {/* Features */}
          <div className="flex items-center gap-4 pb-4 mb-4 border-b border-border">
            {/* Show Bed/Bath only for Residential */}
            {(property.category === "Residential" ||
              ["Apartment", "Villa", "Bungalow"].includes(property.type) ||
              (!property.category && !["Shop", "Office", "Showroom", "Warehouse", "Commercial", "Plot", "Residential Plot", "Commercial Plot", "Industrial Plot", "Agricultural Land"].includes(property.type))) && (
                <>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Bed className="w-4 h-4" />
                    <span>{property.features.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Bath className="w-4 h-4" />
                    <span>{property.features.bathrooms}</span>
                  </div>
                </>
              )}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Square className="w-4 h-4" />
              <span>{property.features.area.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl font-semibold text-foreground">
              {formatPrice(property.price)}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Starting Price
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
