"use client";
import { FC, useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Image as ImageType } from "@/types/room";
import {
  FaArrowLeft,
  FaArrowRight,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { MdCancel, MdZoomIn, MdPanTool } from "react-icons/md";
import LazyImage from "@/components/optimization/LazyImage";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const HotelPhotoGallery: FC<{ photos: ImageType[] }> = ({ photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Memoize handlers for better performance
  const openModal = useCallback((index: number) => {
    setCurrentPhotoIndex(index);
    setShowModal(true);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    setIsZoomed(false);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    setIsZoomed(false);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1,
    );
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    setIsZoomed(false);
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1,
    );
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    setIsZoomed(false);
  }, [photos.length]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev * 1.5, 5));
    setIsZoomed(true);
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev / 1.5, 1));
    if (zoomLevel <= 1.5) {
      setIsZoomed(false);
      setImagePosition({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    setIsZoomed(false);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoomLevel > 1) {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - imagePosition.x,
          y: e.clientY - imagePosition.y,
        });
      }
    },
    [zoomLevel, imagePosition],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && zoomLevel > 1) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setImagePosition({ x: newX, y: newY });
      }
    },
    [isDragging, dragStart, zoomLevel],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    },
    [handleZoomIn, handleZoomOut],
  );

  // Keyboard navigation for modal
  useEffect(() => {
    if (!showModal) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") handleResetZoom();
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [
    showModal,
    closeModal,
    handlePrevious,
    handleNext,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
  ]);

  // Memoize photo calculations
  const photoConfig = useMemo(() => {
    const maximumVisiblePhotos = 5;
    const totalPhotos = photos.length;
    const mainPhoto = photos[0];
    const gridPhotos = photos.slice(1, maximumVisiblePhotos);
    const remainingCount = Math.max(0, totalPhotos - maximumVisiblePhotos);

    return {
      mainPhoto,
      gridPhotos,
      remainingCount,
      hasRemaining: remainingCount > 0,
    };
  }, [photos]);

  return (
    <TooltipProvider>
      {/* Full-width hero gallery with proper padding */}
      <div className="relative w-full">
        <div className="max-w-7xl container mx-auto">
          {/* Desktop Gallery Layout */}
          <div className="hidden md:grid md:grid-cols-4 h-[500px] gap-3 rounded-xl overflow-hidden shadow-lg mt-4">
            {/* Main Hero Image - Takes 2 columns */}
            <div
              className="col-span-2 relative group cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-l-xl"
              onClick={() => openModal(0)}
            >
              <LazyImage
                src={photoConfig.mainPhoto.url}
                alt="Main room view"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                width={800}
                height={600}
                placeholderText="Main Room View"
                showPlaceholderText={true}
                quality={90}
                priority={true}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Gallery Info Overlay Button - positioned at bottom of main image */}
              <div className="absolute bottom-4 left-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(0);
                      }}
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 text-gray-800 dark:text-white font-medium hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg flex items-center"
                    >
                      <MdZoomIn className="mr-2" />
                      View all {photos.length} photos
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to view all photos in fullscreen</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Grid Photos - Takes remaining 2 columns */}
            <div className="col-span-2 grid grid-cols-2 gap-1 h-full">
              {photoConfig.gridPhotos.map((photo, index) => (
                <div
                  key={`grid-${index}`}
                  className={`relative group cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800 ${
                    index === 0
                      ? "rounded-tr-xl"
                      : index === 1
                        ? "rounded-br-xl"
                        : index === photoConfig.gridPhotos.length - 1 &&
                            photoConfig.gridPhotos.length % 2 === 1
                          ? "rounded-br-xl"
                          : "rounded-lg"
                  }`}
                  onClick={() => openModal(index + 1)}
                >
                  <LazyImage
                    src={photo.url}
                    alt={`Room photo ${index + 2}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    width={300}
                    height={250}
                    placeholderText={`Photo ${index + 2}`}
                    showPlaceholderText={true}
                    quality={75}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Show remaining count on last visible photo */}
                  {index === photoConfig.gridPhotos.length - 1 &&
                    photoConfig.hasRemaining && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
                        <div className="text-white text-center">
                          <div className="text-lg font-bold">
                            +{photoConfig.remainingCount}
                          </div>
                          <div className="text-xs">more photos</div>
                        </div>
                      </div>
                    )}

                  {/* Zoom overlay for regular photos */}
                  {!(
                    index === photoConfig.gridPhotos.length - 1 &&
                    photoConfig.hasRemaining
                  ) && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-1">
                        <MdZoomIn className="text-gray-800 text-xs" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Gallery Layout */}
          <div className="md:hidden relative h-[300px] rounded-xl overflow-hidden shadow-lg">
            <div className="relative w-full h-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <LazyImage
                src={photos[currentPhotoIndex].url}
                alt={`Room photo ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover"
                width={400}
                height={300}
                placeholderText={`Photo ${currentPhotoIndex + 1}`}
                showPlaceholderText={true}
                quality={80}
                priority={true}
                sizes="100vw"
              />

              {/* Mobile Navigation Overlay */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-6">
                <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                  <button
                    onClick={handlePrevious}
                    className="text-white hover:text-green-400 transition-colors p-2"
                    aria-label="Previous photo"
                  >
                    <FaArrowLeft className="text-lg" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="text-white hover:text-green-400 transition-colors p-2"
                    aria-label="Next photo"
                  >
                    <FaArrowRight className="text-lg" />
                  </button>
                </div>

                <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">
                    {currentPhotoIndex + 1} / {photos.length}
                  </span>
                </div>
              </div>

              {/* View All Photos Button */}
              <button
                onClick={() => openModal(currentPhotoIndex)}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2 text-white text-sm font-medium hover:bg-black/70 transition-all"
              >
                <MdZoomIn className="inline mr-1" />
                View All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal with Zoom and Pan */}
      {showModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50">
          {/* Click outside to close */}
          <div className="absolute inset-0" onClick={closeModal} />

          <div className="relative w-full h-full max-w-7xl mx-auto p-4 flex items-center justify-center">
            {/* Main Modal Image Container with Zoom and Pan */}
            <div className="relative flex items-center justify-center w-full h-full">
              <div
                ref={imageRef}
                className="relative max-w-[90vw] max-h-[90vh] bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                style={{
                  cursor: isDragging
                    ? "grabbing"
                    : zoomLevel > 1
                      ? "grab"
                      : "default",
                }}
              >
                <div
                  className="w-full h-full transition-transform duration-200"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                  }}
                >
                  <LazyImage
                    src={photos[currentPhotoIndex].url}
                    alt={`Room photo ${currentPhotoIndex + 1}`}
                    className="w-full h-full object-contain"
                    width={1200}
                    height={800}
                    placeholderText={`Photo ${currentPhotoIndex + 1}`}
                    showPlaceholderText={true}
                    quality={95}
                    sizes="90vw"
                  />
                </div>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="text-white hover:text-green-400 transition-colors p-2 disabled:opacity-50"
                disabled={zoomLevel <= 1}
                aria-label="Zoom out"
              >
                <FaSearchMinus className="text-lg" />
              </button>

              <span className="text-white text-sm font-medium px-2">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="text-white hover:text-green-400 transition-colors p-2 disabled:opacity-50"
                disabled={zoomLevel >= 5}
                aria-label="Zoom in"
              >
                <FaSearchPlus className="text-lg" />
              </button>

              {isZoomed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResetZoom();
                  }}
                  className="text-white hover:text-green-400 transition-colors p-2 ml-2"
                  aria-label="Reset zoom"
                >
                  <FaCompress className="text-lg" />
                </button>
              )}
            </div>

            {/* Modal Navigation - positioned outside the image */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 text-white transition-all z-10 shadow-lg"
                  aria-label="Previous photo"
                >
                  <FaArrowLeft className="text-2xl" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 text-white transition-all z-10 shadow-lg"
                  aria-label="Next photo"
                >
                  <FaArrowRight className="text-2xl" />
                </button>
              </>
            )}

            {/* Modal Header */}
            <div className="absolute top-6 right-6 flex justify-between items-center z-10">
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 mr-4">
                <span className="text-white font-medium">
                  {currentPhotoIndex + 1} of {photos.length}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all shadow-lg"
                aria-label="Close gallery"
              >
                <MdCancel className="text-2xl" />
              </button>
            </div>

            {/* Pan Indicator */}
            {zoomLevel > 1 && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm z-10">
                <MdPanTool className="inline mr-2" />
                Drag to pan
              </div>
            )}

            {/* Thumbnail Strip */}
            {photos.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full p-3 max-w-[90vw] overflow-x-auto z-10">
                {photos.map((photo, index) => (
                  <button
                    key={`thumb-${index}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPhotoIndex(index);
                      setZoomLevel(1);
                      setImagePosition({ x: 0, y: 0 });
                      setIsZoomed(false);
                    }}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      index === currentPhotoIndex
                        ? "border-green-400 scale-110"
                        : "border-white/30 hover:border-white/60"
                    }`}
                  >
                    <LazyImage
                      src={photo.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      width={56}
                      height={56}
                      quality={60}
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </TooltipProvider>
  );
};

export default HotelPhotoGallery;
