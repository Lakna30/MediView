import NotificationBell from '../NotificationBell';

export default function NotificationBellExample() {
  const sampleNotifications = [
    {
      id: "1",
      type: "appointment" as const,
      title: "Upcoming Appointment",
      message: "Appointment with Dr. Johnson tomorrow at 2:00 PM",
      time: "5 min ago",
      isRead: false,
    },
    {
      id: "2",
      type: "record" as const,
      title: "Lab Results Available",
      message: "Your blood test results are now available",
      time: "1 hour ago",
      isRead: false,
    },
    {
      id: "3",
      type: "patient" as const,
      title: "New Patient Registered",
      message: "John Smith has been registered in the system",
      time: "2 hours ago",
      isRead: true,
    },
  ];

  return (
    <div className="p-6">
      <NotificationBell notifications={sampleNotifications} />
    </div>
  );
}
