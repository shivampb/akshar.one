import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
    id: string;
    label: string;
}

const navItems: NavItem[] = [
    { id: "specifications", label: "Specifications" },
    { id: "overview", label: "Overview" },
    { id: "photos", label: "Photos & Videos" },
    { id: "amenities", label: "Amenities" },
    { id: "brochure", label: "Brochure" },
    { id: "location", label: "Location" },
    { id: "faqs", label: "FAQ" },
    { id: "similar-properties", label: "Nearby Properties" },
];

interface PropertyNavbarProps {
    hasBrochure?: boolean;
    hasFaqs?: boolean;
    hasSimilarProperties?: boolean;
}

export const PropertyNavbar = ({ hasBrochure, hasFaqs, hasSimilarProperties }: PropertyNavbarProps) => {
    const [activeSection, setActiveSection] = useState<string>("specifications");

    const visibleNavItems = navItems.filter(item => {
        if (item.id === "brochure" && !hasBrochure) return false;
        if (item.id === "faqs" && !hasFaqs) return false;
        if (item.id === "similar-properties" && !hasSimilarProperties) return false;
        return true;
    });

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Adjust based on your sticky header height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            setActiveSection(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 120; // Offset for sticky header

            for (const item of visibleNavItems) {
                const element = document.getElementById(item.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(item.id);
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="sticky top-[80px] z-30 bg-background/95 backdrop-blur-sm border-b border-border my-6">
            <div className="container-luxury overflow-x-auto">
                <div className="flex items-center gap-6 md:gap-8 min-w-max">
                    {visibleNavItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={cn(
                                "py-4 text-base font-medium border-b-2 transition-colors hover:text-primary",
                                activeSection === item.id
                                    ? "border-primary text-primary"
                                    : "border-transparent text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
