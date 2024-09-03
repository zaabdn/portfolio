interface LoadingProps {
  isVisible: boolean;
}

const Loading = ({ isVisible }: LoadingProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#2C3A47] bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        {/* Spinner with Tailwind CSS */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-3 border-r-4 border-l-2 border-blue-500 border-solid"></div>
        {/* Loading text */}
        <p className="mt-4 text-white text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
