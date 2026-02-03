import { useParams, Link, Navigate } from "react-router-dom";
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
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ImageGallery } from "@/components/ImageGallery";
import { ContactForm } from "@/components/ContactForm";
import { PropertyCard } from "@/components/PropertyCard";
import { getPropertyBySlug, properties } from "@/data/properties";

const PropertyDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const property = slug ? getPropertyBySlug(slug) : undefined;

  if (!property) {
    return <Navigate to="/properties" replace />;
  }

  // Get related properties (same type, different id)
  const relatedProperties = properties
    .filter((p) => p.type === property.type && p.id !== property.id)
    .slice(0, 3);

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
                <span>{property.address}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-left lg:text-right"
            >
              <p className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">
                {property.priceLabel}
              </p>
              <p className="text-sm text-muted-foreground">Starting Price</p>
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
                className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-secondary rounded-sm"
              >
                <div className="text-center">
                  <Square className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="font-serif text-xl font-semibold">
                    {property.features.area.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Sq Ft</p>
                </div>
                <div className="text-center">
                  <Bed className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="font-serif text-xl font-semibold">
                    {property.features.bedrooms}
                  </p>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                </div>
                <div className="text-center">
                  <Bath className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="font-serif text-xl font-semibold">
                    {property.features.bathrooms}
                  </p>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                </div>
                <div className="text-center">
                  <Car className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="font-serif text-xl font-semibold">
                    {property.features.parking}
                  </p>
                  <p className="text-sm text-muted-foreground">Parking</p>
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
                <div className="aspect-video rounded-sm overflow-hidden bg-muted">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                      property.address
                    )}`}
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
