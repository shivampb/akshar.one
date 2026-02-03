import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import {
  properties,
  getPropertyTypes,
  getLocations,
  type PropertyType,
} from "@/data/properties";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $5M", min: 0, max: 5000000 },
  { label: "$5M - $10M", min: 5000000, max: 10000000 },
  { label: "$10M - $20M", min: 10000000, max: 20000000 },
  { label: "Over $20M", min: 20000000, max: Infinity },
];

const Properties = () => {
  const [selectedType, setSelectedType] = useState<PropertyType | "All">("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const propertyTypes = getPropertyTypes();
  const locations = getLocations();

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Type filter
      if (selectedType !== "All" && property.type !== selectedType) {
        return false;
      }

      // Location filter
      if (selectedLocation !== "All" && property.location !== selectedLocation) {
        return false;
      }

      // Price filter
      const range = priceRanges[selectedPriceRange];
      if (property.price < range.min || property.price > range.max) {
        return false;
      }

      return true;
    });
  }, [selectedType, selectedLocation, selectedPriceRange]);

  const hasActiveFilters =
    selectedType !== "All" ||
    selectedLocation !== "All" ||
    selectedPriceRange !== 0;

  const clearFilters = () => {
    setSelectedType("All");
    setSelectedLocation("All");
    setSelectedPriceRange(0);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-gold font-medium tracking-widest uppercase text-sm mb-4">
              Our Portfolio
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
              Exceptional Properties
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse our curated collection of luxury homes, each selected for
              its exceptional quality, prime location, and investment potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-border sticky top-[72px] bg-background/95 backdrop-blur-sm z-30">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value as PropertyType | "All")
                }
                className="input-luxury py-2 px-4 min-w-[160px]"
              >
                <option value="All">All Types</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input-luxury py-2 px-4 min-w-[180px]"
              >
                <option value="All">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              {/* Price Filter */}
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                className="input-luxury py-2 px-4 min-w-[160px]"
              >
                {priceRanges.map((range, index) => (
                  <option key={range.label} value={index}>
                    {range.label}
                  </option>
                ))}
              </select>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-5 h-5 rounded-full bg-gold text-white text-xs flex items-center justify-center">
                    {(selectedType !== "All" ? 1 : 0) +
                      (selectedLocation !== "All" ? 1 : 0) +
                      (selectedPriceRange !== 0 ? 1 : 0)}
                  </span>
                )}
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground">
              Showing {filteredProperties.length} of {properties.length}{" "}
              properties
            </p>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-6 space-y-4"
            >
              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value as PropertyType | "All")
                }
                className="input-luxury py-2 px-4 w-full"
              >
                <option value="All">All Types</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input-luxury py-2 px-4 w-full"
              >
                <option value="All">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                className="input-luxury py-2 px-4 w-full"
              >
                {priceRanges.map((range, index) => (
                  <option key={range.label} value={index}>
                    {range.label}
                  </option>
                ))}
              </select>
            </motion.div>
          )}
        </div>
      </section>

      {/* Properties Grid */}
      <section className="section-luxury">
        <div className="container-luxury">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl font-serif text-muted-foreground mb-4">
                No properties found
              </p>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to see more results.
              </p>
              <button
                onClick={clearFilters}
                className="btn-luxury-outline"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Can't Find What You're Looking For?"
        subtitle="Our experts can help you find the perfect property. Contact us for personalized assistance."
        primaryButtonText="Contact Us"
        primaryButtonLink="/contact"
        secondaryButtonText="About Our Services"
        secondaryButtonLink="/about"
      />
    </Layout>
  );
};

export default Properties;
