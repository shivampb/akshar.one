import { motion } from "framer-motion";
import { useState } from "react";
import {
    Square,
    Ruler,
    Building,
    Calendar,
    Banknote,
    Hammer,
    Layers,
    ShieldCheck,
    Copy,
    Check,
} from "lucide-react";
import { Property } from "@/data/properties";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ProjectSpecificationsProps {
    property: Property;
}

export const ProjectSpecifications = ({ property }: ProjectSpecificationsProps) => {
    // Only render if there are specifications to show
    if (!property.project_units && !property.project_area && !property.size_range &&
        !property.project_size && !property.launch_date && !property.possession_date &&
        !property.avg_price && !property.configuration && !property.rera_id) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h2 className="font-serif text-2xl font-medium mb-4">
                Project Specifications
            </h2>
            <div className="gold-line mb-6 mx-0" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">

                {/* Super Area */}
                {property.features.area > 0 && (
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Square className="w-4 h-4 text-gold" />
                            Super Area
                        </p>
                        <p className="font-serif text-lg font-medium text-foreground">
                            {property.features.area.toLocaleString()} sq.ft
                        </p>
                    </div>
                )}

                {/* Facing */}
                {property.features.facing && (
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Building className="w-4 h-4 text-gold" />
                            Facing
                        </p>
                        <p className="font-serif text-lg font-medium text-foreground">{property.features.facing}</p>
                    </div>
                )}

                {property.project_units && (
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Project Units</p>
                        <p className="font-serif text-lg font-medium text-foreground">{property.project_units}</p>
                    </div>
                )}

                {property.project_area && (
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Square className="w-4 h-4 text-gold" />
                            Project Area
                        </p>
                        <p className="font-serif text-lg font-medium text-foreground">{property.project_area}</p>
                    </div>
                )}

                {property.size_range && (
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Ruler className="w-4 h-4 text-gold" />
                            Sizes
                        </p>
                        <p className="font-serif text-lg font-medium text-foreground">{property.size_range}</p>
                    </div>
                )}

                {property.project_size && (
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Building className="w-4 h-4 text-gold" />
                            Project Size
                        </p>
                        <p className="font-serif text-lg font-medium text-foreground">{property.project_size}</p>
                    </div>
                )}

                {property.launch_date && (
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold" />
                            Launch Date
                        </p>
                        <p className="font-serif text-lg font-medium text-foreground">{property.launch_date}</p>
                    </div>
                )}

                {property.avg_price && (
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Banknote className="w-4 h-4 text-gold" />
                            Avg. Price
                        </p>
                        <p className="font-serif text-lg font-medium text-foreground">{property.avg_price}</p>
                    </div>
                )}

                {property.possession_date && (
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Hammer className="w-4 h-4 text-gold" />
                            Possession Starts
                        </p>
                        <p className="font-serif text-lg font-medium text-foreground">{property.possession_date}</p>
                    </div>
                )}

                {property.possession_status && (
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-gold" />
                            Possession Status
                        </p>
                        <p className="font-serif text-lg font-medium text-foreground">{property.possession_status}</p>
                    </div>
                )}

                {property.configuration && (
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Layers className="w-4 h-4 text-gold" />
                            Configuration
                        </p>
                        <p className="font-serif text-lg font-medium text-foreground">{property.configuration}</p>
                    </div>
                )}

                {property.rera_id && (
                    <ReraIdDialog reraId={property.rera_id} />
                )}
            </div>
        </motion.div>
    );
};

// RERA ID Dialog Component
const ReraIdDialog = ({ reraId }: { reraId: string }) => {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(reraId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <>
            <div className="space-y-1 md:col-span-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    Rera Id
                </p>
                <Button
                    onClick={() => setOpen(true)}
                    variant="outline"
                    size="sm"
                    className="text-primary border-primary hover:bg-primary hover:text-white"
                >
                    View ID
                </Button>
                <a href="#" className="block text-xs text-primary hover:underline font-medium mt-1">Check RERA Status</a>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>RERA Registration ID</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="bg-secondary/20 p-4 rounded-md border">
                            <p className="font-mono text-sm break-all">{reraId}</p>
                        </div>
                        <Button
                            onClick={handleCopy}
                            className="w-full"
                            variant="outline"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy RERA ID
                                </>
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
