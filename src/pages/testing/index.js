// React/Next.js component using Tailwind CSS

const LayoutComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Top-level pink blocks */}
      <div className="flex space-x-2 mb-4">
        <div className="w-16 h-16 bg-pink-300"></div>
        <div className="w-16 h-16 bg-pink-300"></div>
      </div>

      {/* Middle structure with pink and blue blocks */}
      <div className="flex justify-between w-full">
        {/* Left branch */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-pink-300 mb-2"></div>
          <div className="flex space-x-1">
            <div className="w-6 h-6 bg-blue-300"></div>
            <div className="w-6 h-6 bg-blue-300"></div>
            <div className="w-6 h-6 bg-blue-300"></div>
          </div>
        </div>

        {/* Middle branch */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-pink-300 mb-2"></div>
          <div className="flex space-x-1">
            <div className="w-6 h-6 bg-blue-300"></div>
            <div className="w-6 h-6 bg-blue-300"></div>
          </div>
        </div>

        {/* Right branch */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-pink-300 mb-2"></div>
          <div className="flex space-x-1">
            <div className="w-6 h-6 bg-blue-300"></div>
            <div className="w-6 h-6 bg-blue-300"></div>
            <div className="w-6 h-6 bg-blue-300"></div>
          </div>
        </div>
      </div>

      {/* Bottom structure with pink and blue blocks */}
      <div className="flex justify-center w-full mt-4">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-pink-300 mb-2"></div>
          <div className="flex space-x-1">
            <div className="w-6 h-6 bg-blue-300"></div>
            <div className="w-6 h-6 bg-blue-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;
