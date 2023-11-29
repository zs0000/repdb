import React from 'react';

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row p-4">
      <SearchPanel />
      <ProfilePanel />
      <MatesList />
    </div>
  );
};

const SearchPanel = () => {
  return (
    <div className="flex flex-col p-4 border-r">
      <input
        className="mb-2 p-2 border"
        type="text"
        placeholder="Name gender"
      />
      <button className="mb-2 p-2 bg-blue-500 text-white">SEARCH</button>
      <input
        className="p-2 border"
        type="text"
        placeholder="Traits"
      />
    </div>
  );
};

const ProfilePanel = () => {
  return (
    <div className="flex flex-col items-center p-4 border-r">
      <div className="rounded-full bg-gray-200 w-24 h-24 mb-4"></div>
      <input
        className="mb-2 p-2 border"
        type="text"
        placeholder="Name"
      />
      <input
        className="p-2 border"
        type="text"
        placeholder="Traits"
      />
      <button className="mt-4 p-2 bg-blue-500 text-white">Mates +</button>
    </div>
  );
};

const MatesList = () => {
  return (
    <div className="flex-1 p-4 overflow-auto">
      {/* List of mates would be mapped here */}
      <div className="p-2 border-b">Mate 1</div>
      {/* ... more mates */}
    </div>
  );
};

export default Layout;
