import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  variant?: "default" | "dark" | "gold";
}

export const CTASection = ({
  title = "Ready to Find Your Dream Property?",
  subtitle = "Schedule a private viewing or speak with our luxury real estate experts today.",
  primaryButtonText = "Schedule a Visit",
  primaryButtonLink = "/contact",
  secondaryButtonText = "View Properties",
  secondaryButtonLink = "/properties",
  variant = "default",
}: CTASectionProps) => {
  const bgClasses = {
    default: "bg-secondary",
    dark: "bg-primary text-primary-foreground",
    gold: "bg-gradient-to-r from-gold to-gold-light",
  };

  const textClasses = {
    default: "text-foreground",
    dark: "text-primary-foreground",
    gold: "text-white",
  };

  const subtextClasses = {
    default: "text-muted-foreground",
    dark: "text-primary-foreground/70",
    gold: "text-white/80",
  };

  return (
    <section className={`section-luxury ${bgClasses[variant]}`}>
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className={`section-title ${textClasses[variant]} mb-4`}>
            {title}
          </h2>
          <p className={`text-lg ${subtextClasses[variant]} mb-10`}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={primaryButtonLink}
              className={
                variant === "gold"
                  ? "btn-luxury bg-white text-charcoal hover:bg-white/90"
                  : "btn-luxury-gold"
              }
            >
              {primaryButtonText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to={secondaryButtonLink}
              className={`btn-luxury border-2 ${
                variant === "default"
                  ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
            >
              {secondaryButtonText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
