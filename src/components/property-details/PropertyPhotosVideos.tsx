import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PropertyPhotosVideosProps {
    images: string[];
    propertyName: string;
}

export const PropertyPhotosVideos = ({ images, propertyName }: PropertyPhotosVideosProps) => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const visibleImages = 4; // Show first 4 images
    const remainingCount = images.length - visibleImages;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h2 className="font-serif text-2xl font-medium mb-6">
                {propertyName} Photos & Videos
            </h2>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-muted-foreground">
                    Project Tour & Photos
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.slice(0, visibleImages).map((image, index) => (
                        <div
                            key={index}
                            className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() => setSelectedImage(index)}
                        >
                            <img
                                src={image}
                                alt={`${propertyName} - Photo ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />

                            {/* Overlay for last image if there are more */}
                            {index === visibleImages - 1 && remainingCount > 0 && (
                                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                    <span className="text-white text-4xl font-bold">
                                        +{remainingCount}
                                    </span>
                                </div>
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Lightbox */}
            <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-5xl p-0 bg-black/95">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {selectedImage !== null && (
                        <div className="relative">
                            <img
                                src={images[selectedImage]}
                                alt={`${propertyName} - Photo ${selectedImage + 1}`}
                                className="w-full h-auto max-h-[85vh] object-contain"
                            />

                            {/* Navigation */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {selectedImage > 0 && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage(selectedImage - 1);
                                        }}
                                        className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-md hover:bg-white/20 transition-colors"
                                    >
                                        Previous
                                    </button>
                                )}
                                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-md">
                                    {selectedImage + 1} / {images.length}
                                </span>
                                {selectedImage < images.length - 1 && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage(selectedImage + 1);
                                        }}
                                        className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-md hover:bg-white/20 transition-colors"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </motion.div>
    );
};
