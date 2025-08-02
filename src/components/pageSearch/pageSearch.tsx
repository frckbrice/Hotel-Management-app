'use client';
import React, { useState } from 'react';
import Search from '../Search/Search';

type Props = {};

const PageSearch = (props: Props) => {
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <Search
        roomTypeFilter={roomTypeFilter}
        searchQuery={searchQuery}
        setRoomTypeFilter={setRoomTypeFilter}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default PageSearch;
