import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Calendar, Share2 } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

interface PropertySidebarProps {
    propertyName: string;
}

export const PropertySidebar = ({ propertyName }: PropertySidebarProps) => {
    return (
        <div className="sticky top-28 space-y-6">
            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card p-6 rounded-sm shadow-soft"
            >
                <h3 className="font-serif text-xl font-medium mb-6">
                    Interested in this property?
                </h3>
                <div className="space-y-3">
                    <a
                        href="#inquiry-form"
                        className="btn-luxury-gold w-full flex items-center justify-center gap-2"
                    >
                        <MessageSquare className="w-4 h-4" />
                        Enquire Now
                    </a>
                    <Link
                        to="/contact"
                        className="btn-luxury-outline w-full flex items-center justify-center gap-2"
                    >
                        <Calendar className="w-4 h-4" />
                        Schedule a Visit
                    </Link>
                    <button
                        onClick={async () => {
                            const shareData = {
                                title: propertyName,
                                text: `Check out this property: ${propertyName}`,
                                url: window.location.href,
                            };

                            try {
                                if (navigator.share) {
                                    await navigator.share(shareData);
                                } else {
                                    // Fallback: Copy to clipboard
                                    await navigator.clipboard.writeText(window.location.href);
                                    alert("Property link copied to clipboard!");
                                }
                            } catch (err) {
                                if ((err as Error).name !== 'AbortError') {
                                    console.error('Error sharing:', err);
                                    // Additional fallback: Try to copy anyway
                                    try {
                                        await navigator.clipboard.writeText(window.location.href);
                                        alert("Property link copied to clipboard!");
                                    } catch (clipErr) {
                                        console.error('Clipboard failed:', clipErr);
                                    }
                                }
                            }
                        }}
                        className="btn-luxury w-full flex items-center justify-center gap-2 border border-border hover:bg-secondary transition-colors"
                    >
                        <Share2 className="w-4 h-4" />
                        Share Property
                    </button>
                </div>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div
                id="inquiry-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card p-6 rounded-sm shadow-soft"
            >
                <h3 className="font-serif text-xl font-medium mb-6">
                    Send an Inquiry
                </h3>
                <ContactForm propertyName={propertyName} />
            </motion.div>
        </div>
    );
};
