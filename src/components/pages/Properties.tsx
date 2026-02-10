"use client";

import { useState, useMemo, useEffect } from "react";
// import { Helmet } from "react-helmet-async"; // Removed for Next.js
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
// import { Layout } from "@/components/layout/Layout"; // Removed
import { PropertyCard } from "@/components/PropertyCard";
import { CTASection } from "@/components/CTASection";
import {
  PropertyType,
  Property,
} from "@/data/properties";
import { supabase } from "@/lib/supabase";
import { Country, State, City } from "country-state-city";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹5 Crore", min: 0, max: 50000000 },
  { label: "₹5 Cr - ₹10 Cr", min: 50000000, max: 100000000 },
  { label: "₹10 Cr - ₹20 Cr", min: 100000000, max: 200000000 },
  { label: "Over ₹20 Crore", min: 200000000, max: Infinity },
];

const Properties = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedType, setSelectedType] = useState<PropertyType | "All">("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);

  // New Location Filters
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedState, setSelectedState] = useState<string>("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [searchText, setSearchText] = useState<string>("");

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!supabase) return;
      const { data, error } = await supabase.from('properties').select('*');
      if (error) {
        console.error('Error fetching properties:', error);
      } else {
        setProperties(data as Property[]);
      }
    };
    fetchProperties();
  }, []);

  // Read URL parameters and set filters
  useEffect(() => {
    const searchParam = searchParams.get("search");
    const locationParam = searchParams.get("location");
    const typeParam = searchParams.get("type");
    // const statusParam = searchParams.get("status");

    // Set search text
    if (searchParam) {
      setSearchText(searchParam);
    }

    // Map location string to city (case-insensitive)
    if (locationParam) {
      const cityName = locationParam.charAt(0).toUpperCase() + locationParam.slice(1).toLowerCase();
      setSelectedCity(cityName);
    }

    // Map type to property type
    if (typeParam) {
      const typeMapping: { [key: string]: PropertyType } = {
        "residential": "Apartment",
        "commercial": "Commercial",
        "agricultural": "Plot"
      };
      const mappedType = typeMapping[typeParam.toLowerCase()];
      if (mappedType) {
        setSelectedType(mappedType);
      }
    }
  }, [searchParams]);

  const propertyTypes = useMemo(() => ["Apartment", "Villa", "Plot", "Commercial"], []);

  // --- Dynamic Filter Options ---
  // Only show Countries that actually exist in our properties list
  const availableCountries = useMemo(() => {
    // Get unique country codes from properties
    const uniqueCountryCodes = new Set(properties.map(p => p.country).filter(Boolean));

    // Get country details for these codes
    return Country.getAllCountries().filter(c => uniqueCountryCodes.has(c.isoCode));
  }, [properties]);

  // Only show States that actually exist in our properties list (filtered by selected Country if any)
  const availableStates = useMemo(() => {
    let filteredProperties = properties;
    if (selectedCountry !== "All") {
      filteredProperties = properties.filter(p => p.country === selectedCountry);
    }

    const uniqueStateCodes = new Set(filteredProperties.map(p => p.state).filter(Boolean));

    if (selectedCountry !== "All") {
      return State.getStatesOfCountry(selectedCountry).filter(s => uniqueStateCodes.has(s.isoCode));
    } else {
      return [];
    }
  }, [properties, selectedCountry]);

  // Only show Cities that exist in properties
  const availableCities = useMemo(() => {
    let filteredProperties = properties;
    if (selectedCountry !== "All") {
      filteredProperties = filteredProperties.filter(p => p.country === selectedCountry);
    }
    if (selectedState !== "All") {
      filteredProperties = filteredProperties.filter(p => p.state === selectedState);
    }

    const uniqueCityNames = new Set(filteredProperties.map(p => p.city).filter(Boolean));
    return Array.from(uniqueCityNames).sort();
  }, [properties, selectedCountry, selectedState]);


  // Reset dependent filters
  useEffect(() => {
    setSelectedState("All");
    setSelectedCity("All");
  }, [selectedCountry]);

  useEffect(() => {
    setSelectedCity("All");
  }, [selectedState]);


  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search text filter
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        const matchesSearch =
          property.name?.toLowerCase().includes(searchLower) ||
          property.city?.toLowerCase().includes(searchLower) ||
          property.location?.toLowerCase().includes(searchLower) ||
          property.shortDescription?.toLowerCase().includes(searchLower) ||
          property.fullDescription?.toLowerCase().includes(searchLower) ||
          property.type?.toLowerCase().includes(searchLower);

        if (!matchesSearch) {
          return false;
        }
      }

      // Type filter
      if (selectedType !== "All" && property.type !== selectedType) {
        return false;
      }

      // Country Filter
      if (selectedCountry !== "All" && property.country !== selectedCountry) {
        return false;
      }
      // State Filter (relaxed check for now as some old data might miss state)
      if (selectedState !== "All" && property.state !== selectedState) {
        return false;
      }
      // City Filter
      if (selectedCity !== "All" && property.city !== selectedCity) {
        return false;
      }

      // Price filter
      const range = priceRanges[selectedPriceRange];
      if (property.price < range.min || property.price > range.max) {
        return false;
      }

      return true;
    });
  }, [properties, searchText, selectedType, selectedCountry, selectedState, selectedCity, selectedPriceRange]);

  const hasActiveFilters =
    selectedType !== "All" ||
    selectedCountry !== "All" ||
    selectedState !== "All" ||
    selectedCity !== "All" ||
    selectedPriceRange !== 0;

  const clearFilters = () => {
    setSelectedType("All");
    setSelectedCountry("All");
    setSelectedState("All");
    setSelectedCity("All");
    setSelectedPriceRange(0);
  };

  return (
    <>
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

          {/* Desktop Filters */}
          <div className="hidden lg:grid grid-cols-5 gap-4">
            {/* Country Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="input-luxury py-2 px-3 w-full text-sm"
              >
                <option value="All">All Countries</option>
                {availableCountries.map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={selectedCountry === "All"}
                className="input-luxury py-2 px-3 w-full text-sm disabled:opacity-50"
              >
                <option value="All">All States</option>
                {availableStates.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={selectedState === "All" && selectedCountry === "All"}
                className="input-luxury py-2 px-3 w-full text-sm disabled:opacity-50"
              >
                <option value="All">All Cities</option>
                {availableCities.map((cityName) => (
                  <option key={cityName} value={cityName}>{cityName}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">Type</label>
              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value as PropertyType | "All")
                }
                className="input-luxury py-2 px-3 w-full text-sm"
              >
                <option value="All">All Types</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">Price Range</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                className="input-luxury py-2 px-3 w-full text-sm"
              >
                {priceRanges.map((range, index) => (
                  <option key={range.label} value={index}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Summary & Clear (Desktop) */}
          <div className="hidden lg:flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredProperties.length}</span> properties
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
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
                  !
                </span>
              )}
            </button>
            <p className="text-sm text-muted-foreground">
              {filteredProperties.length} Results
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
              {/* Matches desktop fields but stacked */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="input-luxury py-2 px-3 w-full"
                >
                  <option value="All">All Countries</option>
                  {availableCountries.map((c) => (
                    <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase">State</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  disabled={selectedCountry === "All"}
                  className="input-luxury py-2 px-3 w-full disabled:opacity-50"
                >
                  <option value="All">All States</option>
                  {availableStates.map((s) => (
                    <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={selectedState === "All" && selectedCountry === "All"}
                  className="input-luxury py-2 px-3 w-full disabled:opacity-50"
                >
                  <option value="All">All Cities</option>
                  {availableCities.map((cityName) => (
                    <option key={cityName} value={cityName}>{cityName}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(e.target.value as PropertyType | "All")
                  }
                  className="input-luxury py-2 px-3 w-full"
                >
                  <option value="All">All Types</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase">Price</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                  className="input-luxury py-2 px-3 w-full"
                >
                  {priceRanges.map((range, index) => (
                    <option key={range.label} value={index}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 bg-destructive/10 text-destructive rounded-sm text-sm"
                >
                  Clear All Filters
                </button>
              )}
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
    </>
  );
};

export default Properties;
