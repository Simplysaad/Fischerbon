import { Link } from 'react-router-dom';

export default function EmptyMessage({ message = null, ctaText, ctaUrl }) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-10">
      <p className="text-center text-gray-500 py-10 w-full">{message}</p>
      {ctaText && ctaUrl && (
        <Link
          to={ctaUrl}
          className="py-2 px-4 rounded bg-blue-600 focus:ring-2"
        >
          {ctaText}
        </Link>
      )}
    </div>
  );
}
