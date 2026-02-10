"use client";

import { useState, useEffect } from "react";
// import { useParams, Link, Navigate } from "react-router-dom"; // Removed
import Link from "next/link";
// import { supabase } from "@/lib/supabase"; // Removed (fetching in page.tsx)
import { Property } from "@/data/properties";
import { ArrowLeft } from "lucide-react";
// import { Layout } from "@/components/layout/Layout"; // Removed
import { ImageGallery } from "@/components/ImageGallery";
import { PropertyHeader } from "@/components/property-details/PropertyHeader";

import { PropertyOverview } from "@/components/property-details/PropertyOverview";
import { PropertyAmenities } from "@/components/property-details/PropertyAmenities";
import { ProjectSpecifications } from "@/components/property-details/ProjectSpecifications";
import { PropertyLocation } from "@/components/property-details/PropertyLocation";
import { PropertySidebar } from "@/components/property-details/PropertySidebar";
import { SimilarProperties } from "@/components/property-details/SimilarProperties";
import { PropertyNavbar } from "@/components/property-details/PropertyNavbar";
import { PropertyQuickSummary } from "@/components/property-details/PropertyQuickSummary";
import { PropertyBrochure } from "@/components/property-details/PropertyBrochure";
import { PropertyFAQ } from "@/components/property-details/PropertyFAQ";
import { PropertyPhotosVideos } from "@/components/property-details/PropertyPhotosVideos";

// import { Helmet } from "react-helmet-async"; // Removed

interface PropertyDetailsProps {
  property: Property;
  relatedProperties: Property[];
}

const PropertyDetails = ({ property, relatedProperties }: PropertyDetailsProps) => {
  const [fetchedLocation, setFetchedLocation] = useState<string | null>(null);

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

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-28 pb-4">
        <div className="container-luxury">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/properties"
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
      <PropertyHeader property={property} fetchedLocation={fetchedLocation} />

      {/* Image Gallery */}
      <section className="pb-12">
        <div className="container-luxury">
          <ImageGallery images={property.images} propertyName={property.name} />
        </div>
      </section>

      {/* Quick Summary */}
      <PropertyQuickSummary property={property} />

      {/* Navigation */}
      <PropertyNavbar
        hasBrochure={!!property.brochure_url}
        hasFaqs={!!property.faqs && property.faqs.length > 0}
        hasSimilarProperties={relatedProperties.length > 0}
      />

      {/* Main Content */}
      <section className="pb-20 pt-8" id="overview">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Specifications */}
              <div id="specifications" className="scroll-mt-32 p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <ProjectSpecifications property={property} />
              </div>

              {/* Description */}
              <div id="overview" className="scroll-mt-32 p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <PropertyOverview fullDescription={property.fullDescription} />
              </div>

              {/* Photos & Videos */}
              <div id="photos" className="scroll-mt-32 p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <PropertyPhotosVideos images={property.images} propertyName={property.name} />
              </div>

              {/* Amenities */}
              <div id="amenities" className="scroll-mt-32 p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <PropertyAmenities amenities={property.amenities} />
              </div>

              {/* Brochure */}
              {property.brochure_url && (
                <div id="brochure" className="scroll-mt-32 p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                  <PropertyBrochure brochureUrl={property.brochure_url} propertyName={property.name} />
                </div>
              )}

              {/* Location Map */}
              <div id="location" className="scroll-mt-32 p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <PropertyLocation property={property} />
              </div>

              {/* FAQs */}
              {property.faqs && property.faqs.length > 0 && (
                <div id="faqs" className="scroll-mt-32 p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                  <PropertyFAQ faqs={property.faqs} />
                </div>
              )}

            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <PropertySidebar propertyName={property.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      <SimilarProperties properties={relatedProperties} areaName={property.area_name} />
    </>
  );
};

export default PropertyDetails;
