import { motion } from "framer-motion";

interface PropertyOverviewProps {
    fullDescription: string;
}

export const PropertyOverview = ({ fullDescription }: PropertyOverviewProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h2 className="font-serif text-2xl font-medium mb-4">
                Property Overview
            </h2>
            <div className="gold-line mb-6 mx-0" />
            <div className="text-muted-foreground leading-relaxed space-y-4">
                {fullDescription.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                        <p key={index} className="mb-4 last:mb-0">
                            {paragraph}
                        </p>
                    )
                ))}
            </div>
        </motion.div>
    );
};
