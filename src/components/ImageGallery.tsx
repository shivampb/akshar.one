import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, Image as ImageIcon } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  propertyName: string;
}

export const ImageGallery = ({ images, propertyName }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Main Gallery Container - 1 Top + 3 Bottom Grid */}
      <div className="flex flex-col gap-2 relative">
        {/* Main Image (Top) */}
        {/* Main Image (Top) */}
        <div
          className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-sm cursor-pointer group"
          onClick={() => setIsGridOpen(true)}
        >
          <motion.img
            src={images[0]}
            alt={`${propertyName} - Main`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>


        </div>

        {/* Thumbnails Row (Bottom) */}
        {images.length > 1 && (
          <div className="grid grid-cols-2 gap-2 h-[150px] md:h-[200px]">
            {images.slice(1, 3).map((img, index) => {
              // index 0 here corresponds to images[1]
              // index 1 here corresponds to images[2] (the 3rd image)
              const isLast = index === 1;

              return (
                <div
                  key={index}
                  className="relative w-full h-full overflow-hidden rounded-sm cursor-pointer group"
                  onClick={() => setIsGridOpen(true)}
                >
                  <motion.img
                    src={img}
                    alt={`${propertyName} - Preview ${index + 1}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay for last visible item (3rd image overall) if more images exist */}
                  {isLast && images.length > 3 ? (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-2">
                      <ImageIcon className="w-6 h-6 mb-1 opacity-80" />
                      <span className="font-semibold text-lg">+{images.length - 3} Photos</span>
                      <span className="text-xs font-medium opacity-80 mt-1">
                        (Total {images.length})
                      </span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid View Modal */}
      <AnimatePresence>
        {isGridOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-[90] bg-background flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold truncate">{propertyName} - Gallery</h2>
              <button
                onClick={() => setIsGridOpen(false)}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Grid Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
                {images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="aspect-square relative cursor-pointer overflow-hidden rounded-md group"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsLightboxOpen(true);
                    }}
                  >
                    <img
                      src={img}
                      alt={`Gallery item ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[101]"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Image */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${propertyName} - Image ${currentIndex + 1}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Lightbox Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[101]"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[101]"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium tracking-widest uppercase">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
