import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Property } from "@/data/properties";
import { motion } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  ArrowLeft,
  Check,
  Calendar,
  MessageSquare,
  Share2,
  ArrowUp,
  Compass,
  Droplets,
  Building,
  History,
  Wrench,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ImageGallery } from "@/components/ImageGallery";
import { ContactForm } from "@/components/ContactForm";
import { PropertyCard } from "@/components/PropertyCard";
import { formatPrice } from "@/lib/utils";


const PropertyDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [fetchedLocation, setFetchedLocation] = useState<string | null>(null);
  const [selectedAreaUnit, setSelectedAreaUnit] = useState<string>("sqft");
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);

  // Area conversion factors (from sqft)
  const areaUnits = {
    sqft: { label: "sqft", factor: 1 },
    sqyrd: { label: "sqyrd", factor: 0.111111 }, // 1 sq yard = 9 sqft
    sqm: { label: "sqm", factor: 0.092903 }, // 1 sq meter = 10.764 sqft
    acre: { label: "acre", factor: 0.000022956 }, // 1 acre = 43560 sqft
    bigha: { label: "bigha", factor: 0.000367 }, // 1 bigha = 27225 sqft (varies by region)
    hectare: { label: "hectare", factor: 0.000009290304 }, // 1 hectare = 107639 sqft
    marla: { label: "marla", factor: 0.003673 }, // 1 marla = 272.25 sqft
    kanal: { label: "kanal", factor: 0.000183486 }, // 1 kanal = 5445 sqft
    biswai: { label: "biswai", factor: 0.007334 }, // 1 biswai = 136.36 sqft (approx)
    cent: { label: "cent", factor: 0.002296 }, // 1 cent = 435.6 sqft
    perch: { label: "perch", factor: 0.003673 }, // 1 perch = 272.25 sqft
    guntha: { label: "guntha", factor: 0.000918 }, // 1 guntha = 1089 sqft
    are: { label: "are", factor: 0.000929 }, // 1 are = 1076.39 sqft
    katha: { label: "katha", factor: 0.001389 }, // 1 katha = 720 sqft (approx)
    gaj: { label: "gaj", factor: 0.111111 }, // 1 gaj = 9 sqft (square yard)
    killa: { label: "killa", factor: 0.000230 }, // 1 killa = 4356 sqft
    kuncham: { label: "kuncham", factor: 0.000918 }, // Similar to guntha
  };

  const convertArea = (sqft: number, unit: string) => {
    const converted = sqft * areaUnits[unit as keyof typeof areaUnits].factor;
    return converted.toFixed(2);
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (!slug) return;

        const { data: propertyData, error } = await supabase
          .from('properties')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error("Error fetching property:", error);
          setLoading(false);
          return;
        }

        if (propertyData) {
          setProperty(propertyData as Property);

          // Fetch related properties
          const { data: relatedData } = await supabase
            .from('properties')
            .select('*')
            .eq('type', propertyData.type)
            .neq('id', propertyData.id)
            .limit(3);

          if (relatedData) {
            setRelatedProperties(relatedData as Property[]);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [slug]);

  useEffect(() => {
    const fetchLocationName = async () => {
      if (property?.coordinates && property.coordinates.lat !== 0 && property.coordinates.lng !== 0) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${property.coordinates.lat},${property.coordinates.lng}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            // Try to find locality and sublocality
            const addressComponents = data.results[0].address_components;
            let city = "";
            let area = "";

            for (const component of addressComponents) {
              if (component.types.includes("locality")) {
                city = component.long_name;
              }
              if (component.types.includes("sublocality") || component.types.includes("sublocality_level_1")) {
                area = component.long_name;
              }
            }

            if (area && city) {
              setFetchedLocation(`${area}, ${city}`);
            } else if (data.results[0].formatted_address) {
              setFetchedLocation(data.results[0].formatted_address);
            }
          }
        } catch (error) {
          console.error("Error fetching location name:", error);
        }
      }
    };

    if (property) {
      fetchLocationName();
    }
  }, [property]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 pt-24 min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return <Navigate to="/properties" replace />;
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="pt-28 pb-4">
        <div className="container-luxury">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/properties"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Properties
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{property.name}</span>
          </nav>
        </div>
      </section>

      {/* Property Header */}
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
              <p className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">
                {formatPrice(property.price)}
              </p>
              <div className="flex flex-col items-start lg:items-end gap-1">
                {property.features.area > 0 && (
                  <p className="text-sm font-medium text-gold">
                    ₹{Math.round(property.price / property.features.area).toLocaleString()}/sq.ft
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pb-12">
        <div className="container-luxury">
          <ImageGallery images={property.images} propertyName={property.name} />
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Key Features */}
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

                  {(property.category === "Residential" ||
                    ["Apartment", "Villa", "Bungalow"].includes(property.type) ||
                    (!property.category && !["Shop", "Office", "Showroom", "Warehouse", "Commercial", "Plot", "Residential Plot", "Commercial Plot", "Industrial Plot", "Agricultural Land"].includes(property.type))) && (
                      <>
                        {/* Bedrooms */}
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Bedrooms</p>
                          <p className="font-serif text-xl font-bold text-foreground">
                            {property.features.bedrooms}
                          </p>
                        </div>

                        {/* Bathrooms */}
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Bathrooms</p>
                          <p className="font-serif text-xl font-bold text-foreground">
                            {property.features.bathrooms}
                          </p>
                        </div>

                        {/* Parking */}
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Parking</p>
                          <p className="font-serif text-xl font-bold text-foreground">
                            {property.features.parking}
                          </p>
                        </div>
                      </>
                    )}

                  {/* Additional Specs */}
                  {property.features.propertyAge && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Property Age</p>
                      <p className="font-serif text-xl font-bold text-foreground">
                        {property.features.propertyAge}
                      </p>
                    </div>
                  )}

                  {property.features.facing && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Facing</p>
                      <p className="font-serif text-xl font-bold text-foreground">
                        {property.features.facing}
                      </p>
                    </div>
                  )}

                  {property.features.waterAvailability && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Water Availability</p>
                      <p className="font-serif text-xl font-bold text-foreground">
                        {property.features.waterAvailability}
                      </p>
                    </div>
                  )}

                  {(property.features.unitsOnFloor !== undefined && property.features.unitsOnFloor > 0) && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Units On Floor</p>
                      <p className="font-serif text-xl font-bold text-foreground">
                        {property.features.unitsOnFloor}
                      </p>
                    </div>
                  )}

                  {(property.features.lifts !== undefined && property.features.lifts > 0) && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Lifts</p>
                      <p className="font-serif text-xl font-bold text-foreground">
                        {property.features.lifts}
                      </p>
                    </div>
                  )}

                  {(property.features.maintenanceCharges !== undefined && property.features.maintenanceCharges > 0) && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Maintenance Charges</p>
                      <p className="font-serif text-xl font-bold text-foreground">
                        ₹{property.features.maintenanceCharges} Monthly
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-2xl font-medium mb-4">
                  Property Overview
                </h2>
                <div className="gold-line mb-6 mx-0" />
                <p className="text-muted-foreground leading-relaxed">
                  {property.fullDescription}
                </p>
              </motion.div>

              {/* Amenities */}
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
                  {property.amenities.map((amenity) => (
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

              {/* Location Map */}
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

                <div className="aspect-video rounded-sm overflow-hidden bg-muted">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${property.coordinates && property.coordinates.lat !== 0
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
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card p-6 rounded-sm shadow-soft"
                >
                  <h3 className="font-serif text-xl font-medium mb-6">
                    Interested in this property?
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="#inquiry-form"
                      className="btn-luxury-gold w-full flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Enquire Now
                    </a>
                    <Link
                      to="/contact"
                      className="btn-luxury-outline w-full flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Schedule a Visit
                    </Link>
                    <button className="btn-luxury w-full flex items-center justify-center gap-2 border border-border hover:bg-secondary transition-colors">
                      <Share2 className="w-4 h-4" />
                      Share Property
                    </button>
                  </div>
                </motion.div>

                {/* Inquiry Form */}
                <motion.div
                  id="inquiry-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card p-6 rounded-sm shadow-soft"
                >
                  <h3 className="font-serif text-xl font-medium mb-6">
                    Send an Inquiry
                  </h3>
                  <ContactForm propertyName={property.name} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="section-luxury bg-secondary">
          <div className="container-luxury">
            <h2 className="font-serif text-3xl font-medium text-center mb-4">
              Similar Properties
            </h2>
            <div className="gold-line mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default PropertyDetails;
