// Icon map utility
import { Users, ClipboardCheck, BookOpen, Bell } from 'lucide-react';
const iconMap = {
  Users,
  ClipboardCheck,
  BookOpen,
  Bell,
};

export default function StatCard({ icon, label, value }) {
  const IconComponent = iconMap[icon];
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
      <IconComponent className="h-10 w-10 text-blue-600 flex-shrink-0" />
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-gray-600 font-medium">{label}</p>
      </div>
    </div>
  );
}
