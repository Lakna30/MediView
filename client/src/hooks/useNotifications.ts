import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  createNotification
} from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export interface Notification {
  id: string;
  userId: string;
  type: "appointment" | "record" | "patient" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: any;
}

export function useNotifications() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading, error } = useQuery<Notification[]>({
    queryKey: ['notifications', user?.uid],
    queryFn: () => getUserNotifications(user?.uid || ''),
    enabled: !!user?.uid,
    refetchInterval: 30000,
  });

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.uid] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => markAllNotificationsAsRead(user?.uid || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.uid] });
    },
  });

  const createNotificationMutation = useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAsRead = (notificationId: string) => {
    markAsReadMutation.mutate(notificationId);
  };

  const markAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const addNotification = (notificationData: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    if (user?.uid) {
      createNotificationMutation.mutate({
        ...notificationData,
        userId: user.uid,
      });
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return {
    notifications,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    addNotification,
    unreadCount,
  };
}
