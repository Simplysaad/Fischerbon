import EmptyMessage from "./EmptyMessage";

export default function EnrollmentTable({ enrollments }) {
  if (!enrollments?.length)
    return <EmptyMessage message="No enrollments yet" />;

  return (
    <table className="min-w-full divide-y divide-gray-200 rounded">
      <thead className="bg-blue-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Learner Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Progress
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {enrollments.map(({ id, name, status, progress }) => (
          <tr key={id} className="hover:bg-blue-50">
            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
              {name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{status}</td>
            <td className="px-6 py-4 whitespace-nowrap">{progress}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
