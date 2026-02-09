import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";
import { PropertyFormValues } from "./schema";

export const BrochureUploadSection = () => {
    const { register, watch, setValue, formState: { errors } } = useFormContext<PropertyFormValues>();
    const [isUploading, setIsUploading] = useState(false);
    const brochureUrl = watch('brochure_url');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            toast.error("Please upload a PDF file");
            return;
        }

        // 5MB limit
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            return;
        }

        setIsUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `brochure-${Date.now()}.${fileExt}`;
            const filePath = `brochures/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('properties') // Using the same bucket, maybe a folder
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('properties').getPublicUrl(filePath);

            setValue('brochure_url', data.publicUrl);
            toast.success("Brochure uploaded successfully");

        } catch (error) {
            console.error("Error uploading brochure:", error);
            toast.error("Failed to upload brochure");
        } finally {
            setIsUploading(false);
            e.target.value = "";
        }
    };

    const removeBrochure = () => {
        setValue('brochure_url', undefined);
    };

    return (
        <div className="space-y-4">
            <Label>Brochure (PDF)</Label>

            {!brochureUrl ? (
                <div className="space-y-2">
                    <Input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className="cursor-pointer"
                    />
                    {isUploading && <p className="text-sm text-yellow-600 animate-pulse">Uploading brochure...</p>}
                    <p className="text-xs text-muted-foreground">Max file size: 5MB. PDF only.</p>
                </div>
            ) : (
                <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-md border text-sm">
                    <FileText className="w-5 h-5 text-primary" />
                    <a href={brochureUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex-1 truncate">
                        View Uploaded Brochure
                    </a>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={removeBrochure}
                        className="text-destructive hover:bg-destructive/10"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};
