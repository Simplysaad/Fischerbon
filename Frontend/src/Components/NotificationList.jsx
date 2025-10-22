import EmptyMessage from './EmptyMessage';

export default function NotificationsList({ notifications }) {
  if (!notifications || notifications.length === 0) {
    return <EmptyMessage message="No notifications right now" />;
  }

  return (
    <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
      {notifications.map(({ id, message }) => (
        <li
          key={id}
          className="px-6 py-4 hover:bg-blue-50 cursor-pointer"
          tabIndex={0}
          role="button"
          aria-label={`Notification: ${message}`}
        >
          {message}
        </li>
      ))}
    </ul>
  );
}
