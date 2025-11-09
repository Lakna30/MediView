import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface TimeSlot {
  time: string;
  available: boolean;
  doctorName?: string;
}

interface AppointmentCalendarProps {
  onSelectSlot?: (date: string, time: string) => void;
}

export default function AppointmentCalendar({ onSelectSlot }: AppointmentCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const timeSlots: TimeSlot[] = [
    { time: "9:00 AM", available: true, doctorName: "Dr. Johnson" },
    { time: "10:00 AM", available: false },
    { time: "11:00 AM", available: true, doctorName: "Dr. Smith" },
    { time: "2:00 PM", available: true, doctorName: "Dr. Johnson" },
    { time: "3:00 PM", available: true, doctorName: "Dr. Chen" },
    { time: "4:00 PM", available: false },
  ];

  const handleSlotSelect = (time: string) => {
    setSelectedTime(time);
    if (onSelectSlot) {
      onSelectSlot(`Nov ${selectedDate}, 2025`, time);
    }
    console.log(`Selected: Nov ${selectedDate}, 2025 at ${time}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Book Appointment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">November 2025</h3>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" data-testid="button-prev-month">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-next-month">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-xs text-muted-foreground font-medium p-2">
                {day}
              </div>
            ))}
            {[...Array(30)].map((_, i) => (
              <Button
                key={i}
                variant={selectedDate === i + 1 ? "default" : "ghost"}
                size="sm"
                className="h-10 w-full"
                onClick={() => setSelectedDate(i + 1)}
                disabled={i < 14}
                data-testid={`date-${i + 1}`}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Available Time Slots</h3>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot.time}
                variant={selectedTime === slot.time ? "default" : "outline"}
                disabled={!slot.available}
                onClick={() => handleSlotSelect(slot.time)}
                className="flex flex-col items-start h-auto p-3"
                data-testid={`slot-${slot.time}`}
              >
                <span className="font-medium">{slot.time}</span>
                {slot.doctorName && (
                  <span className="text-xs opacity-80">{slot.doctorName}</span>
                )}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-muted rounded"></div>
              <span className="text-muted-foreground">Unavailable</span>
            </div>
          </div>
        </div>

        {selectedTime && (
          <div className="bg-accent/50 p-4 rounded-lg">
            <p className="text-sm font-medium">Selected Appointment</p>
            <p className="text-sm text-muted-foreground">
              November {selectedDate}, 2025 at {selectedTime}
            </p>
            <Button className="w-full mt-3" data-testid="button-confirm-appointment">
              Confirm Appointment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
