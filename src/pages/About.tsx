import { motion } from "framer-motion";
import { Award, Users, Target, Heart, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import heroImage from "@/assets/hero-home.jpg";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for excellence in every aspect of our service, from property selection to client communication.",
  },
  {
    icon: Users,
    title: "Client First",
    description:
      "Our clients' needs and goals are at the center of everything we do. Your success is our success.",
  },
  {
    icon: Target,
    title: "Precision",
    description:
      "We approach each transaction with meticulous attention to detail, ensuring nothing is overlooked.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "We're passionate about real estate and dedicated to helping you find your perfect property.",
  },
];

const milestones = [
  { year: "2008", title: "Founded", description: "EstateLuxe was established with a vision for luxury real estate" },
  { year: "2012", title: "First $100M", description: "Reached our first $100 million in property sales" },
  { year: "2016", title: "Global Expansion", description: "Expanded operations to international markets" },
  { year: "2020", title: "$1B Milestone", description: "Surpassed $1 billion in total property sales" },
  { year: "2024", title: "Industry Leader", description: "Recognized as a leading luxury real estate brand" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pb-32">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImage}
            alt="Luxury property"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-gold font-medium tracking-widest uppercase text-sm mb-6"
            >
              Our Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6"
            >
              Redefining Luxury
              <br />
              <span className="text-gold">Real Estate</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              For over 15 years, we've been connecting discerning buyers with
              extraordinary properties around the world. Our commitment to
              excellence has made us a trusted name in luxury real estate.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-luxury bg-secondary">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
                Built on Trust,
                <br />
                Driven by Excellence
              </h2>
              <div className="gold-line mb-6 mx-0" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  EstateLuxe was founded with a singular vision: to transform
                  the luxury real estate experience. What began as a boutique
                  agency has evolved into a globally recognized brand, known for
                  exceptional service and an unparalleled portfolio of premium
                  properties.
                </p>
                <p>
                  Our journey has been defined by meaningful relationships with
                  clients who trust us with their most significant investments.
                  We don't just sell properties—we help our clients realize
                  their dreams of luxury living.
                </p>
                <p>
                  Today, our team of seasoned professionals brings together
                  decades of combined experience, deep market knowledge, and an
                  extensive network of connections to deliver results that
                  exceed expectations.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-sm overflow-hidden">
                <img
                  src={heroImage}
                  alt="Luxury property exterior"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground p-8 rounded-sm shadow-elevated">
                <p className="font-serif text-4xl font-semibold text-gold mb-2">
                  15+
                </p>
                <p className="text-sm text-primary-foreground/70 uppercase tracking-wider">
                  Years of Excellence
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-luxury">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-10 rounded-sm shadow-soft"
            >
              <h3 className="font-serif text-2xl font-medium mb-4">
                Our Mission
              </h3>
              <div className="gold-line mb-6 mx-0" />
              <p className="text-muted-foreground leading-relaxed">
                To provide an unparalleled luxury real estate experience by
                combining expert market knowledge, personalized service, and
                access to the world's most exceptional properties. We are
                committed to exceeding our clients' expectations at every step
                of their journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card p-10 rounded-sm shadow-soft"
            >
              <h3 className="font-serif text-2xl font-medium mb-4">
                Our Vision
              </h3>
              <div className="gold-line mb-6 mx-0" />
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted and respected name in luxury real estate
                worldwide. We envision a future where every client experiences
                the joy of finding their perfect property through our dedicated
                expertise and unwavering commitment to excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-luxury bg-secondary">
        <div className="container-luxury">
          <SectionHeading
            title="Our Core Values"
            subtitle="The principles that guide everything we do"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-medium mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-luxury">
        <div className="container-luxury">
          <SectionHeading
            title="Our Journey"
            subtitle="Key milestones in our growth and success"
          />

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-white font-medium text-sm">
                    {milestone.year.slice(2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-sm text-gold font-medium mb-1">
                    {milestone.year}
                  </p>
                  <h4 className="font-serif text-xl font-medium mb-2">
                    {milestone.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="section-luxury bg-primary text-primary-foreground">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8">
              Why Trust EstateLuxe?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                "Proven track record with $2.5B+ in sales",
                "Exclusive access to off-market properties",
                "Dedicated team of luxury real estate experts",
                "Personalized service tailored to your needs",
                "Global network and international reach",
                "Transparent process from start to finish",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/90">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Work With Us?"
        subtitle="Let's discuss how we can help you find your dream property."
        primaryButtonText="Get in Touch"
        primaryButtonLink="/contact"
        secondaryButtonText="View Properties"
        secondaryButtonLink="/properties"
      />
    </Layout>
  );
};

export default About;
