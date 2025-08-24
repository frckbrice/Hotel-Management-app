"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import useSWR from "swr";
import { Room } from "@/types/room";
import Search from "@/components/Search/Search";
import RoomCard from "@/components/pages/Room/RoomCard/RoomCard";
import { Loader2, AlertTriangle, Users, Star, MapPin } from "lucide-react";

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await res.json();
  return data.data; // Return the rooms data from the API response
};

const Rooms = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const searchParams = useSearchParams();

  const { data: rooms, error, isLoading } = useSWR("/api/rooms", fetcher);

  // Memoize filtered rooms to prevent unnecessary recalculations
  const filteredRooms = useMemo(() => {
    if (!rooms || !Array.isArray(rooms)) return [];

    let filtered = rooms.filter((room) => {
      const matchesSearch =
        room.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = roomTypeFilter ? room.type === roomTypeFilter : true;

      return matchesSearch && matchesType;
    });

    // Sort rooms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.name || "").localeCompare(b.name || "");
        case "type":
          return (a.type || "").localeCompare(b.type || "");
        case "price":
          return (a.price || 0) - (b.price || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [rooms, searchQuery, roomTypeFilter, sortBy]);

  // Get unique room types for filter dropdown
  const roomTypes = useMemo(() => {
    if (!rooms || !Array.isArray(rooms)) return [];
    return Array.from(new Set(rooms.map((room) => room.type).filter(Boolean)));
  }, [rooms]);

  // Calculate stats
  const stats = useMemo(() => {
    if (!rooms || !Array.isArray(rooms)) {
      return { total: 0, available: 0, averagePrice: 0, types: 0 };
    }

    const total = rooms.length;
    const available = rooms.filter((room) => !room.isBooked).length;
    const averagePrice =
      rooms.reduce((sum, room) => sum + (room.price || 0), 0) / total;
    const types = Array.from(new Set(rooms.map((room) => room.type))).length;

    return { total, available, averagePrice, types };
  }, [rooms]);

  useEffect(() => {
    const searchQueryParam = searchParams.get("searchQuery");
    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    }
  }, [searchParams]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setRoomTypeFilter("");
  };

  // Enhanced loading state with skeleton that matches the actual layout
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Stats Skeleton */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Rooms
          </h1>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center">
                  <div className="bg-gray-300 dark:bg-gray-600 h-8 w-8 rounded-full animate-pulse mr-3"></div>
                  <div className="flex-1">
                    <div className="bg-gray-300 dark:bg-gray-600 h-4 rounded w-3/4 animate-pulse mb-1"></div>
                    <div className="bg-gray-300 dark:bg-gray-600 h-3 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter Skeleton */}
        <div className="mb-8">
          <div className="bg-gray-300 dark:bg-gray-600 h-12 rounded-lg animate-pulse mb-4"></div>
          <div className="flex flex-wrap gap-4">
            <div className="bg-gray-300 dark:bg-gray-600 h-10 rounded-lg w-32 animate-pulse"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-10 rounded-lg w-32 animate-pulse"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-10 rounded-lg w-24 animate-pulse"></div>
          </div>
        </div>

        {/* Rooms Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-gray-300 dark:bg-gray-600 h-48 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="bg-gray-300 dark:bg-gray-600 h-5 rounded w-3/4 animate-pulse"></div>
                <div className="bg-gray-300 dark:bg-gray-600 h-4 rounded w-full animate-pulse"></div>
                <div className="bg-gray-300 dark:bg-gray-600 h-4 rounded w-2/3 animate-pulse"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="bg-gray-300 dark:bg-gray-600 h-6 rounded w-1/3 animate-pulse"></div>
                  <div className="bg-gray-300 dark:bg-gray-600 h-8 rounded w-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Enhanced error state
  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We couldn&apos;t load the rooms right now. Don&apos;t worry,
                we&apos;re on it!
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error.message || "Unknown error occurred"}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle empty or undefined data
  if (!rooms || !Array.isArray(rooms) || rooms.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                No Rooms Available
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                There are no rooms available at the moment. Please check back
                later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 ">
      {/* Header with Stats */}
      <div className="mb-8">
        <div className="flex justify-center items-center pt-16 pb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 lg:mb-10 ">
            Our Rooms
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Rooms
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Available
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.available}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Room Types
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.types}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <span className="text-2xl mr-3">💰</span>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avg Price
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${Math.round(stats.averagePrice)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roomTypeFilter={roomTypeFilter}
          setRoomTypeFilter={setRoomTypeFilter}
        />
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredRooms.length} of {rooms.length} rooms
        </p>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              No rooms found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
