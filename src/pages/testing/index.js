import React from 'react';

export default function TreeDiagram() {
  return (
    <div className="flex flex-col items-center mt-10 space-y-8">
      {/* Top row */}
      <div className="flex space-x-4">
        <div className="bg-pink-400 w-24 h-24 rounded-full"></div>
        <div className="bg-pink-400 w-24 h-24 rounded-full"></div>
      </div>
      
      {/* Connector line */}
      <div className="border-l-2 border-black h-16 ml-32"></div>
      
      {/* Second row */}
      <div className="flex space-x-10">
        <SubTree />
        <div className="flex space-x-4">
          <SubTree />
          <SubTree />
        </div>
        <Branch />
      </div>
    </div>
  );
}

const SubTree = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-pink-400 w-20 h-20 rounded-full mb-4"></div>
      <div className="border-l-2 border-black h-12"></div>
      <div className="flex space-x-4">
        <Leaf color="pink" />
        <Leaf color="blue" />
        <Leaf color="pink" />
      </div>
    </div>
  );
};

const Branch = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400 w-20 h-20 rounded-full mb-4"></div>
      <div className="border-l-2 border-black h-12"></div>
      <div className="flex space-x-4">
        <Leaf color="pink" />
        <Leaf color="pink" />
      </div>
    </div>
  );
};

const Leaf = ({ color }) => {
  const bgColor = color === 'blue' ? 'bg-blue-400' : 'bg-pink-400';
  return (
    <div className={`${bgColor} w-12 h-12 rounded-full`}></div>
  );
};
