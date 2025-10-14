import { Star } from 'lucide-react';

export default function Hero({
  hero: {
    heading,
    body,
    ctaText,
    ctaUrl,
    image,
    trustBadge,
    testimonial,
    highlight,
    supportInfo,
    guarantee,
  },
}) {
  return (
    <section
      className="bg-gradient-to-r from-blue-600 to-cyan-500 md:py-24 flex items-center justify-center text-white"
      aria-label="Hero section for LMS platform"
      style={{ minWidth: '100vw', minHeight: '600px' }}
    >
      <div className="max-w-7xl w-11/12 h-full mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 max-w-xl h-full flex flex-col justify-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
            {heading}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed drop-shadow-md">
            {body}
          </p>

          {/* Optional supplementary info */}
          {trustBadge && (
            <p className="text-sm md:text-base flex gap-2 border-white bg-opacity-20 p-2 rounded inline-block drop-shadow-sm max-w-max">
              <span>
                <Star />{' '}
              </span>
              <span>{trustBadge}</span>
            </p>
          )}
          {testimonial && (
            <blockquote className="border-l-4 border-cyan-300 pl-4 italic text-sm md:text-base drop-shadow-sm max-w-max">
              “{testimonial.quote}” <br />
              <span className="font-semibold">- {testimonial.author}</span>
            </blockquote>
          )}
          {highlight && (
            <p className="text-sm md:text-base font-semibold bg-cyan-300 bg-opacity-20 px-3 py-1 rounded inline-block text-cyan-100 drop-shadow-sm max-w-max">
              {highlight}
            </p>
          )}
          {supportInfo && (
            <p className="text-sm md:text-base bg-cyan-300 bg-opacity-20 px-3 py-1 rounded inline-block text-cyan-100 drop-shadow-sm max-w-max">
              {supportInfo}
            </p>
          )}
          {guarantee && (
            <p className="text-sm md:text-base bg-cyan-300 bg-opacity-20 px-3 py-1 rounded inline-block text-cyan-100 drop-shadow-sm max-w-max">
              {guarantee}
            </p>
          )}

          <a
            // href= {ctaUrl}
            href="#waitlist"
            className="inline-block mt-4 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-400 transition-colors focus:outline-none focus:ring-4 focus:ring-cyan-300 max-w-max"
            aria-label={ctaText}
          >
            {ctaText}
          </a>
        </div>

        {/* Image */}
        <div className="flex-1 max-w-md md:max-w-lg h-full flex items-center justify-center">
          <img
            src={image}
            alt={heading}
            className="rounded-xl shadow-2xl max-h-[85vh] w-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
