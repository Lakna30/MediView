import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";

interface AppointmentCardProps {
  patientName: string;
  patientImage?: string;
  doctorName: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  purpose?: string;
  onView?: () => void;
  onReschedule?: () => void;
}

export default function AppointmentCard({
  patientName,
  patientImage,
  doctorName,
  date,
  time,
  status,
  purpose,
  onView,
  onReschedule,
}: AppointmentCardProps) {
  const statusColors = {
    confirmed: "bg-appointment-confirmed text-white",
    pending: "bg-appointment-pending text-white",
    cancelled: "bg-appointment-cancelled text-white",
    completed: "bg-appointment-completed text-white",
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="hover-elevate">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={patientImage} alt={patientName} />
            <AvatarFallback>{getInitials(patientName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base">{patientName}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Dr. {doctorName}
                </p>
              </div>
              <Badge className={statusColors[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
            {purpose && (
              <p className="text-sm text-muted-foreground mb-3">{purpose}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {time}
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={onView} data-testid="button-view-appointment">
                View Details
              </Button>
              {status !== "cancelled" && status !== "completed" && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={onReschedule}
                  data-testid="button-reschedule-appointment"
                >
                  Reschedule
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
