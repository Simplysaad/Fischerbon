import EmptyMessage from './EmptyMessage';

export default function CoursesTable({ courses }) {
  if (!courses || courses.length === 0) {
    return <EmptyMessage message="No courses yet" />;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 rounded">
      <thead className="bg-blue-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Description
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Price (₦)
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Enrollments
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Date Created
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {courses.map(
          ({ id, title, enrollments, description, createdAt, price }) => (
            <tr key={id} className="hover:bg-blue-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                <a href={`/admin/courses/${title.split(' ').join('-')}-${id}`}>
                  {title}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">
                {description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ₦{price.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {enrollments}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(createdAt).toLocaleDateString()}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
