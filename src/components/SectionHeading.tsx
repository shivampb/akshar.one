import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  showLine?: boolean;
}

export const SectionHeading = ({
  title,
  subtitle,
  alignment = "center",
  showLine = true,
}: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 lg:mb-16 ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      <h2 className="section-title">{title}</h2>
      {showLine && (
        <div
          className={`gold-line mt-4 mb-4 ${
            alignment === "left" ? "mx-0" : ""
          }`}
        />
      )}
      {subtitle && (
        <p className={`section-subtitle ${alignment === "left" ? "mx-0" : ""}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
