'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getRooms } from '@/libs/apis';
import { Room } from '@/components/models/room';
import Search from '@/components/Search/Search';
import RoomCard from '@/components/RoomCard/RoomCard';
import { Loader2, AlertTriangle } from 'lucide-react';

const Rooms = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQueryParam = searchParams.get('searchQuery');
    const roomTypeParam = searchParams.get('roomType');

    if (roomTypeParam) setRoomTypeFilter(roomTypeParam);
    if (searchQueryParam) setSearchQuery(searchQueryParam);
  }, [searchParams]);

  const { data, error, isLoading } = useSWR('get/hotelRooms', getRooms);

  const filterRooms = (rooms: Room[]) => {
    return rooms.filter(room => {
      const matchesType =
        !roomTypeFilter ||
        roomTypeFilter.toLowerCase() === 'all' ||
        room.type.toLowerCase() === roomTypeFilter.toLowerCase();

      const matchesQuery = room.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesType && matchesQuery;
    });
  };

  const filteredRooms = filterRooms(data || []);

  return (
    <main className='min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-10'>
      <div className='container mx-auto px-4'>
        <Search
          roomTypeFilter={roomTypeFilter}
          searchQuery={searchQuery}
          setRoomTypeFilter={setRoomTypeFilter}
          setSearchQuery={setSearchQuery}
        />

        <section className='mt-12'>
          {isLoading ? (
            <div className='flex justify-center items-center py-20'>
              <Loader2 className='animate-spin w-8 h-8 text-green-600' />
              <span className='ml-3 text-green-700 text-lg'>
                Loading rooms...
              </span>
            </div>
          ) : error ? (
            <div className='flex justify-center items-center py-20 text-red-600'>
              <AlertTriangle className='w-6 h-6 mr-2' />
              <p className='text-lg'>
                Failed to load rooms. Please try again later.
              </p>
            </div>
          ) : filteredRooms.length === 0 ? (
            <p className='text-center text-gray-600 dark:text-gray-300 text-lg py-20'>
              No rooms match your filters.
            </p>
          ) : (
            <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {filteredRooms.map(room => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Rooms;
