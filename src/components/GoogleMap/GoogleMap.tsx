"use client";

import React, { useEffect, useRef, useState } from 'react';

interface GoogleMapProps {
    center: { lat: number; lng: number };
    zoom?: number;
    className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
    center,
    zoom = 15,
    className = "w-full h-96 rounded-2xl"
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [useFallback, setUseFallback] = useState(false);

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            setError('Google Maps API key not found. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file');
            setUseFallback(true);
            setIsLoading(false);
            return;
        }

        // Load Google Maps script if not already loaded
        const loadGoogleMapsScript = () => {
            return new Promise<void>((resolve, reject) => {
                if (window.google && window.google.maps) {
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
                script.async = true;
                script.defer = true;

                script.onload = () => {
                    console.log('Google Maps script loaded successfully');
                    resolve();
                };

                script.onerror = () => {
                    console.error('Failed to load Google Maps script');
                    reject(new Error('Failed to load Google Maps script'));
                };

                document.head.appendChild(script);
            });
        };

        const initializeMap = async () => {
            try {
                setIsLoading(true);
                setError(null);

                await loadGoogleMapsScript();

                // Wait a bit to ensure the container is rendered
                await new Promise(resolve => setTimeout(resolve, 100));

                if (!mapRef.current) {
                    throw new Error('Map container not found');
                }

                // Create map instance
                const map = new window.google.maps.Map(mapRef.current, {
                    center,
                    zoom,
                    styles: [
                        {
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [{ visibility: "off" }]
                        }
                    ],
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: true,
                    zoomControl: true,
                });

                // Add marker
                const marker = new window.google.maps.Marker({
                    position: center,
                    map,
                    title: "Luxury Hotel",
                    icon: {
                        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#16a34a"/>
                                <path d="M20 8L28 16V28H12V16L20 8Z" fill="white"/>
                                <circle cx="20" cy="20" r="4" fill="#16a34a"/>
                            </svg>
                        `),
                        scaledSize: new window.google.maps.Size(40, 40),
                        anchor: new window.google.maps.Point(20, 20),
                    },
                });

                // Add info window
                const infoWindow = new window.google.maps.InfoWindow({
                    content: `
                        <div style="padding: 10px; max-width: 200px;">
                            <h3 style="margin: 0 0 5px 0; color: #16a34a; font-weight: bold;">Luxury Hotel</h3>
                            <p style="margin: 0; color: #666; font-size: 14px;">
                                123 Luxury Avenue<br>
                                Yaoundé, Cameroon
                            </p>
                        </div>
                    `,
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });

                setIsLoading(false);

            } catch (error) {
                console.error('Error initializing Google Maps:', error);
                setError(error instanceof Error ? error.message : 'Failed to load map');
                setUseFallback(true);
                setIsLoading(false);
            }
        };

        initializeMap();
    }, [center, zoom]);

    if (useFallback) {
        return (
            <div className={`${className} bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
                <div className="text-center text-gray-700 dark:text-gray-300 relative z-10">
                    <div className="text-6xl mb-4">🏨</div>
                    <h3 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">Luxury Hotel</h3>
                    <p className="text-lg mb-4">123 Luxury Avenue</p>
                    <p className="text-base mb-6">Yaoundé, Cameroon</p>
                    <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-justify">
                            {error ? error : 'Interactive map temporarily unavailable'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 text-justify">
                            Please check your Google Maps API configuration
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${className} bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center`}>
                <div className="text-center text-gray-600 dark:text-gray-400">
                    <div className="text-4xl mb-4">🗺️</div>
                    <p className="text-lg font-semibold mb-2">Map Unavailable</p>
                    <p className="text-sm mb-2">{error}</p>
                    <div className="text-xs space-y-1">
                        <p>• Check your API key in .env file</p>
                        <p>• Ensure Maps JavaScript API is enabled</p>
                        <p>• Verify domain restrictions allow localhost</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {isLoading && (
                <div className={`${className} bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center absolute inset-0 z-10`}>
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">Loading Map...</p>
                    </div>
                </div>
            )}
            <div
                ref={mapRef}
                className={className}
                style={{ minHeight: '400px' }}
            />
        </div>
    );
};

export default GoogleMap; 