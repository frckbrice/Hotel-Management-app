import { useRouter } from "next/navigation";
import React, { ChangeEvent, FC } from "react";

type Props = {
  roomTypeFilter: string;
  searchQuery: string;
  setRoomTypeFilter: (roomType: string) => void;
  setSearchQuery: (searchQuery: string) => void;
};

const Search: FC<Props> = ({
  roomTypeFilter,
  searchQuery,
  setRoomTypeFilter,
  setSearchQuery,
}: Props) => {
  const router = useRouter();

  const handleRoonTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoomTypeFilter(event.target.value);
  };

  const handleSearchQuerychange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = () => {
    router.push(`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`);
  };

  return (
    <section className="bg-gradient-to-r from-green-100 to-green-200 dark:from-gray-800 dark:to-gray-700 px-4 py-6 rounded-lg shadow-lg">
      <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-white">
            Room Type
          </label>
          <div className="relative">
            <select
              className="w-full px-4 py-2 capitalize rounded leading-tight bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleRoonTypeChange}
              value={roomTypeFilter}
            >
              <option value="all">All</option>
              <option value="Basic">Basic</option>
              <option value="Luxury">Luxury</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>
        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label
            htmlFor="search"
            className="block text-sm font-medium mb-2 text-gray-800 dark:text-white"
          >
            Search
          </label>
          <input
            type="search"
            placeholder="Search ..."
            id="search"
            className="w-full px-4 py-3 rounded leading-tight bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            value={searchQuery}
            onChange={handleSearchQuerychange}
          />
        </div>
        <button
          className="btn-primary"
          type="button"
          onClick={handleFilterClick}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
