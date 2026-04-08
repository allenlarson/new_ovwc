import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="relative pt-40 pb-32 px-6 mesh-bg noise overflow-hidden min-h-[70vh] flex items-center">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="text-sm uppercase tracking-widest text-accent-purple mb-4">
          404
        </p>
        <h1 className="text-5xl md:text-7xl font-medium leading-tight tracking-tight mb-6">
          Page <span className="font-serif italic gradient-text">Not Found</span>
        </h1>
        <p className="text-lg text-muted mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white font-medium text-lg hover:shadow-xl hover:shadow-accent-purple/20 transition-all duration-300 hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
