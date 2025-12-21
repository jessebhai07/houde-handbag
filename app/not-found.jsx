import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-white overflow-hidden">
      {/* Background Big Text */}
      <h1 className="select-none text-[12rem] font-black text-gray-100 sm:text-[18rem]">
        404
      </h1>

      {/* Foreground Content */}
      <div className="absolute flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
          Nothing to see here
        </h2>
        <p className="mt-2 max-w-md text-gray-500">
          The page you are looking for has been moved or deleted.
        </p>
        
        <Link 
          href="/" 
          className="mt-8 rounded-full border border-gray-200 bg-white px-8 py-3 text-sm font-medium text-gray-900 transition-all hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}