import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyBrochureProps {
    brochureUrl?: string;
    propertyName: string;
}

export const PropertyBrochure = ({ brochureUrl, propertyName }: PropertyBrochureProps) => {
    if (!brochureUrl) return null;

    const handleDownload = () => {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = brochureUrl;
        link.download = `${propertyName.replace(/\s+/g, '-')}-brochure.pdf`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="bg-background border rounded-lg p-6 shadow-sm my-8">
            <h3 className="font-serif text-xl font-medium mb-4">
                {propertyName} - Brochure
            </h3>

            <div className="bg-secondary/10 border border-dashed border-primary/20 rounded-lg p-8 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileDown className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h4 className="font-medium text-lg">Download Official Brochure</h4>
                    <p className="text-muted-foreground text-sm mt-1 max-w-sm">
                        Get detailed floor plans, specifications, and layout analysis in our comprehensive brochure.
                    </p>
                </div>
                <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="border-primary text-primary hover:bg-blue-600 hover:text-white transition-colors mt-2"
                >
                    <FileDown className="w-4 h-4 mr-2" />
                    Download Brochure
                </Button>
            </div>
        </section>
    );
};
