import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Award, Gem, Building } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { supabase } from "@/lib/supabase";
import { Property } from "@/data/properties";
import heroImage from "@/assets/hero-home.jpg";
import property1 from "@/assets/property-1.jpg";
import property3 from "@/assets/property-3.jpg";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const heroImages = [heroImage, property1, property3];

const features = [
  {
    icon: Shield,
    title: "Trusted Excellence",
    description:
      "Over 15 years of experience in luxury real estate, serving discerning clients worldwide.",
  },
  {
    icon: Award,
    title: "Award-Winning Service",
    description:
      "Recognized for exceptional client service and innovative marketing strategies.",
  },
  {
    icon: Gem,
    title: "Exclusive Properties",
    description:
      "Access to off-market listings and exclusive properties not available elsewhere.",
  },
  {
    icon: Building,
    title: "Global Network",
    description:
      "Connections with elite buyers and sellers across major international markets.",
  },
];

const stats = [
  { value: "₹2.5B+", label: "Properties Sold" },
  { value: "500+", label: "Happy Clients" },
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Luxury Properties" },
];

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Embla Carousel Hook - Continuous Auto Scroll
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    AutoScroll({
      speed: 1, // Slow speed
      stopOnInteraction: false,
      stopOnMouseEnter: true // Optional: pause when user hovers
    }),
  ]);

  useEffect(() => {
    const fetchFeatured = async () => {
      // Fetches ALL featured properties (limit removed)
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('isFeatured', true);

      if (data) {
        setFeaturedProperties(data as Property[]);
      }
    };

    fetchFeatured();

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              src={heroImages[currentImageIndex]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              alt="Luxury property"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 image-overlay z-10" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-luxury pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-gold font-medium tracking-widest uppercase text-sm mb-6"
            >
              Luxury Real Estate
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 text-white"
            >
              Luxury Properties
              <br />
              <span className="text-gold">Designed for Modern Living</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 mb-10 max-w-xl"
            >
              Discover exceptional properties curated for the discerning buyer.
              Where luxury meets lifestyle.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/properties" className="btn-luxury-gold">
                View Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="btn-luxury border-2 border-white/30 text-white hover:bg-white/10"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/90 text-xs uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/90 to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-primary-foreground/5 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/10 hover:bg-primary-foreground/10 transition-colors"
              >
                <p className="font-serif text-3xl md:text-4xl font-semibold text-gold mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/70 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section - Carousel */}
      <section className="section-luxury">
        <div className="container-luxury">
          <SectionHeading
            title="Featured Properties"
            subtitle="Explore our handpicked selection of extraordinary homes, each offering unparalleled luxury and exceptional value."
          />

          {/* Mobile View: Grid Limit 3 */}
          <div className="block md:hidden grid grid-cols-1 gap-8">
            {featuredProperties.slice(0, 3).map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </div>

          {/* Desktop/Tablet View: Carousel */}
          <div className="hidden md:block overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {featuredProperties.map((property, index) => (
                <div key={property.id} className="flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 min-w-0">
                  <PropertyCard
                    property={property}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-dark font-medium transition-colors"
            >
              View All Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-luxury bg-secondary">
        <div className="container-luxury">
          <SectionHeading
            title="Why Choose Us"
            subtitle="We combine deep market expertise with personalized service to deliver an exceptional real estate experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="modular-card text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-medium mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-luxury">
        <div className="container-luxury">
          <SectionHeading
            title="Client Testimonials"
            subtitle="Hear from our satisfied clients about their experience working with us."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection variant="dark" backgroundImage={heroImage} />
    </Layout>
  );
};

export default Home;
