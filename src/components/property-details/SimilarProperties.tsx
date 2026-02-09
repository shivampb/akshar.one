import { useRef } from "react";
import { Property } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SimilarPropertiesProps {
    properties: Property[];
    areaName?: string;
}

export const SimilarProperties = ({ properties, areaName }: SimilarPropertiesProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    if (properties.length === 0) return null;

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of view
            const newScrollLeft = direction === "left"
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        }
    };

    return (
        <section id="similar-properties" className="section-luxury bg-secondary/30">
            <div className="container-luxury">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="font-serif text-3xl font-medium mb-2">
                            Properties in the {areaName || "Same Area"}
                        </h2>
                        <p className="text-sm text-muted-foreground">Explore more options nearby</p>
                        <div className="gold-line mx-0 my-0" />
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="p-2 rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-2 rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {properties.map((property, index) => (
                        <div key={property.id} className="min-w-[300px] md:min-w-[350px] snap-center">
                            <PropertyCard
                                property={property}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
