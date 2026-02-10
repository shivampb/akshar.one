"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
// import { Helmet } from "react-helmet-async"; // Removed
// import { Layout } from "@/components/layout/Layout"; // Removed
import { ContactForm } from "@/components/ContactForm";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Luxury Avenue, Suite 500", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (234) 567-890", "+1 (234) 567-891"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@aksharone.com", "sales@aksharone.com"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
  },
];

const Contact = () => {
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
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-lg">
              Whether you're looking to buy, sell, or simply have questions
              about our services, we're here to help. Reach out to our team
              today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-sm shadow-soft text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-3">
                  {item.title}
                </h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground text-sm">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-luxury">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl font-medium mb-4">
                Send Us a Message
              </h2>
              <div className="gold-line mb-6 mx-0" />
              <p className="text-muted-foreground mb-8">
                Fill out the form below and one of our luxury real estate
                specialists will get back to you within 24 hours.
              </p>
              <ContactForm />
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl font-medium mb-4">
                Our Location
              </h2>
              <div className="gold-line mb-6 mx-0" />
              <p className="text-muted-foreground mb-8">
                Visit our flagship office in the heart of Manhattan. We welcome
                walk-ins and scheduled appointments.
              </p>
              <div className="aspect-square lg:aspect-[4/3] rounded-sm overflow-hidden bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=432+Park+Avenue,+New+York,+NY"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section-luxury bg-secondary">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl font-medium mb-4">
              Frequently Asked Questions
            </h2>
            <div className="gold-line mb-8" />

            <div className="space-y-6 text-left">
              {[
                {
                  q: "How do I schedule a property viewing?",
                  a: "You can schedule a viewing by contacting us through this form, calling our office, or clicking the 'Schedule a Visit' button on any property page.",
                },
                {
                  q: "Do you handle international transactions?",
                  a: "Yes, we have extensive experience with international buyers and can guide you through the entire process, including legal and financial considerations.",
                },
                {
                  q: "What areas do you specialize in?",
                  a: "We specialize in luxury properties across major metropolitan areas worldwide, including New York, London, Dubai, and more.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-sm"
                >
                  <h4 className="font-medium mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
