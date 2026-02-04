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
  backgroundImage?: string;
}

export const CTASection = ({
  title = "Ready to Find Your Dream Property?",
  subtitle = "Schedule a private viewing or speak with our luxury real estate experts today.",
  primaryButtonText = "Schedule a Visit",
  primaryButtonLink = "/contact",
  secondaryButtonText = "View Properties",
  secondaryButtonLink = "/properties",
  variant = "default",
  backgroundImage,
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

  // If we have a background image, force text to be white/light
  const isImageBackground = !!backgroundImage;
  const activeVariant = isImageBackground ? "dark" : variant;

  return (
    <section className={`section-luxury relative overflow-hidden ${!isImageBackground ? bgClasses[variant] : ""}`}>
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
      )}

      <div className="container-luxury relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className={`section-title ${isImageBackground ? "text-white" : textClasses[variant]} mb-4`}>
            {title}
          </h2>
          <p className={`text-lg ${isImageBackground ? "text-white/80" : subtextClasses[variant]} mb-10`}>
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
              className={`btn-luxury border-2 ${isImageBackground || variant === "dark" || variant === "gold"
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
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
