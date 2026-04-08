'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="relative pt-40 pb-32 px-6 mesh-bg noise overflow-hidden min-h-[70vh] flex items-center">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="text-sm uppercase tracking-widest text-accent-purple mb-4">
          Error
        </p>
        <h1 className="text-5xl md:text-7xl font-medium leading-tight tracking-tight mb-6">
          Something Went{' '}
          <span className="font-serif italic gradient-text">Wrong</span>
        </h1>
        <p className="text-lg text-muted mb-10 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white font-medium text-lg hover:shadow-xl hover:shadow-accent-purple/20 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
