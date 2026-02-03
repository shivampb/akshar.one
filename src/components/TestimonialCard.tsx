import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export const TestimonialCard = ({ testimonial, index = 0 }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-card p-8 rounded-sm shadow-soft"
    >
      <Quote className="w-10 h-10 text-gold/30 mb-6" />
      <blockquote className="text-foreground text-lg leading-relaxed mb-6">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-white font-serif font-semibold text-lg">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};
