import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Calendar, FileText, Users, Check, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";

export default function NotificationBell() {
  const { notifications, isLoading, unreadCount, markAsRead, markAllAsRead, error } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="w-4 h-4" />;
      case "record":
        return <FileText className="w-4 h-4" />;
      case "patient":
        return <Users className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTimeAgo = (timestamp: any) => {
    if (!timestamp) return 'just now';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'recently';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative" 
          data-testid="button-notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="h-auto p-1 text-xs"
              data-testid="button-mark-all-read"
            >
              <Check className="w-3 h-3 mr-1" />
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {error ? (
          <div className="p-4 text-center text-sm text-destructive">
            {('code' in error && error.code === 'MISSING_INDEX') ? (
              <a 
                href={error.message.split('Click here to create it: ')[1]} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {error.message.split('Click here to create it:')[0]}
              </a>
            ) : (
              'Failed to load notifications'
            )}
          </div>
        ) : isLoading ? (
          <div className="p-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No new notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`flex gap-3 p-3 cursor-pointer ${!notification.isRead ? 'bg-accent/50' : ''}`}
              onClick={() => markAsRead(notification.id)}
              data-testid={`notification-${notification.id}`}
            >
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{getTimeAgo(notification.createdAt)}</p>
              </div>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              )}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
