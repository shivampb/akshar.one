import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { X, GripVertical } from "lucide-react";
import { Reorder } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyFormValues } from "./schema";

export const ImageUploadSection = () => {
    const { register, watch, setValue, getValues, formState: { errors } } = useFormContext<PropertyFormValues>();
    const [isUploading, setIsUploading] = useState(false);
    const images = watch('images');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const propertyName = getValues("name");
        if (!propertyName) {
            toast.error("Please enter a Property Name before uploading images to ensure they are organized correctly.");
            e.target.value = "";
            return;
        }

        setIsUploading(true);

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                };

                try {
                    const compressedFile = await imageCompression(file, options);
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

                    const folderName = propertyName
                        .trim()
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');

                    const filePath = folderName ? `${folderName}/${fileName}` : fileName;

                    const { error: uploadError } = await supabase.storage
                        .from('properties')
                        .upload(filePath, compressedFile);

                    if (uploadError) throw uploadError;

                    const { data } = supabase.storage.from('properties').getPublicUrl(filePath);
                    return data.publicUrl;
                } catch (err) {
                    console.error("Error processing file:", file.name, err);
                    return null;
                }
            });

            const results = await Promise.all(uploadPromises);
            const successfulUploads = results.filter((url): url is string => url !== null);

            const currentImages = getValues('images') || [];
            setValue('images', [...currentImages, ...successfulUploads]);

            if (successfulUploads.length > 0) {
                toast.success(`Successfully uploaded ${successfulUploads.length} images`);
            } else {
                toast.error("Failed to upload images");
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            toast.error("An unexpected error occurred during upload");
        } finally {
            setIsUploading(false);
            e.target.value = "";
        }
    };

    const removeImage = (indexToRemove: number) => {
        const currentImages = getValues('images');
        const newImages = currentImages.filter((_, index) => index !== indexToRemove);
        setValue('images', newImages);
    };

    const handleReorder = (newOrder: string[]) => {
        setValue('images', newOrder);
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="images">Images</Label>
                <div className="flex items-center gap-4">
                    <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="cursor-pointer"
                    />
                </div>
                {isUploading && <p className="text-sm text-yellow-600 animate-pulse">Compressing and uploading...</p>}
            </div>

            {images?.length > 0 && (
                <div className="space-y-2">
                    <Label>Uploaded Images (Drag to reorder)</Label>
                    <Reorder.Group
                        axis="y"
                        values={images}
                        onReorder={handleReorder}
                        className="space-y-2"
                    >
                        {images.map((url) => (
                            <Reorder.Item key={url} value={url} className="bg-card border rounded-lg p-2 flex items-center gap-3 cursor-move shadow-sm hover:shadow-md transition-shadow">
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                                <img src={url} alt="Property" className="h-12 w-12 object-cover rounded bg-secondary" />
                                <div className="flex-1 truncate text-xs text-muted-foreground">{url.split('/').pop()}</div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                    onClick={() => removeImage(images.indexOf(url))}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>
            )}

            {errors.images && (
                <p className="text-red-500 text-sm">{errors.images.message}</p>
            )}
        </div>
    );
};
