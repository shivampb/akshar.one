import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Award, Gem, Building } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { BlogCard } from "@/components/BlogCard";
import { HeroSearchBar } from "@/components/HeroSearchBar";
import { testimonials } from "@/data/testimonials";
import { blogs } from "@/data/blogs";
import { supabase } from "@/lib/supabase";
import { Property } from "@/data/properties";
import heroImage from "@/assets/hero-home.jpg";
import property1 from "@/assets/property-1.jpg";
import property3 from "@/assets/property-3.jpg";
import useEmblaCarousel from "embla-carousel-react";


const heroContent = [
  {
    type: "video",
    src: "https://videos.pexels.com/video-files/3205777/3205777-uhd_2560_1440_25fps.mp4",
    poster: heroImage
  },
  {
    type: "image",
    src: heroImage
  },
  {
    type: "image",
    src: property1
  },
  {
    type: "image",
    src: property3
  }
];

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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Embla Carousel Hook - Continuous Auto Scroll for Properties
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  // Embla Carousel Hook - Continuous Auto Scroll for Blogs
  const [emblaRefBlogs] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    const fetchFeatured = async () => {
      if (!supabase) return;

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
      setCurrentSlideIndex((prev) => (prev + 1) % heroContent.length);
    }, 8000); // 8 seconds for video to play more
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Akshar One | Luxury Real Estate & Premium Homes</title>
        <meta name="title" content="Akshar One | Luxury Real Estate & Premium Homes" />
        <meta name="description" content="Discover India's finest luxury real estate with Akshar One. Browse exclusive listings of premium villas, apartments, and penthouses in prime locations." />
        <meta name="keywords" content="luxury real estate india, premium home buying, luxury villas for sale, high end apartments, real estate investment" />
        <meta property="og:title" content="Akshar One | Luxury Real Estate & Premium Homes" />
        <meta property="og:description" content="Discover India's finest luxury real estate with Akshar One. Browse exclusive listings of premium villas, apartments, and penthouses in prime locations." />
        <meta property="og:image" content={heroImage} />
        <link rel="canonical" href="https://aksharone.com/" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Video/Image Carousel */}
        <div className="absolute inset-0 w-full h-full bg-black">
          <AnimatePresence mode="popLayout">
            {heroContent[currentSlideIndex].type === "video" ? (
              <motion.div
                key={`slide-${currentSlideIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  poster={heroContent[currentSlideIndex].poster}
                >
                  <source src={heroContent[currentSlideIndex].src} type="video/mp4" />
                </video>
              </motion.div>
            ) : (
              <motion.img
                key={`slide-${currentSlideIndex}`}
                src={heroContent[currentSlideIndex].src}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                alt="Luxury property"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </AnimatePresence>

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        {/* Content - Left Aligned */}
        <div className="relative z-20 container mx-auto px-6 lg:px-12 pt-32 pb-20 md:pb-40">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Discover Luxury Living
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg md:text-2xl text-white mb-8 font-light"
            >
              Find your perfect home in our exclusive collection of premium properties.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                to="/properties"
                className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                Know More
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Carousel Dots Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-12 right-6 md:bottom-28 md:right-auto md:left-1/2 md:-translate-x-1/2 z-20 flex items-center gap-2"
        >
          {heroContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlideIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlideIndex === index
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>

        {/* Search Bar Overlay - Responsive Position */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute left-0 w-full z-20 flex justify-center px-4 md:px-6 bottom-24 md:bottom-12"
        >
          <HeroSearchBar />
        </motion.div>

        {/* Chat Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-30"
        >
          <button className="bg-white text-black px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 text-sm font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Chat with us
          </button>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-all"
              >
                <p className="font-serif text-3xl md:text-4xl font-semibold text-black mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 text-sm uppercase tracking-wider">
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

          {/* Featured Properties Carousel - Responsive */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {featuredProperties.map((property, index) => (
                <div key={property.id} className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 min-w-0">
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

      {/* Latest Insights / Blogs Carousel Section */}
      <section className="section-luxury bg-secondary">
        <div className="container-luxury">
          <SectionHeading
            title="Latest Insights"
            subtitle="Stay informed with the latest trends, market analysis, and expert advice in luxury real estate."
          />

          {/* Blogs Carousel */}
          <div className="overflow-hidden" ref={emblaRefBlogs}>
            <div className="flex -ml-8">
              {blogs.map((blog, index) => (
                <div key={blog.id} className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-8 min-w-0">
                  <BlogCard blog={blog} index={index} />
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
              to="/blogs"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-dark font-medium transition-colors group"
            >
              View All Insights
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        variant="minimal"
        title="Looking for dream spaces, not sure where to start?"
        subtitle="Leave us a query and our representative will get back to you."
        primaryButtonText="Get in touch"
        primaryButtonLink="/contact"
        secondaryButtonText="" // Hides secondary button
      />
    </Layout >
  );
};

export default Home;
