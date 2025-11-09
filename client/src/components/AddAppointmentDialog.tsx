import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppointments } from "@/hooks/useAppointments";
import { usePatients } from "@/hooks/usePatients";
import { Plus } from "lucide-react";

export default function AddAppointmentDialog() {
  const [open, setOpen] = useState(false);
  const { createAppointment, isCreating } = useAppointments();
  const { patients, isLoading: loadingPatients } = usePatients();

  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    doctorId: "doctor-1",
    doctorName: "Dr. Sarah Johnson",
    date: "",
    time: "",
    purpose: "",
    notes: "",
    status: "pending" as "pending" | "confirmed" | "cancelled" | "completed",
  });

  useEffect(() => {
    const selectedPatient = patients.find(p => p.id === formData.patientId);
    if (selectedPatient) {
      setFormData(prev => ({ ...prev, patientName: selectedPatient.name }));
    }
  }, [formData.patientId, patients]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAppointment(
      formData,
      {
        onSuccess: () => {
          setOpen(false);
          setFormData({
            patientId: "",
            patientName: "",
            doctorId: "doctor-1",
            doctorName: "Dr. Sarah Johnson",
            date: "",
            time: "",
            purpose: "",
            notes: "",
            status: "pending",
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-new-appointment">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
          <DialogDescription>
            Create a new appointment for a patient
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient">Patient *</Label>
            <Select
              value={formData.patientId}
              onValueChange={(value) => setFormData({ ...formData, patientId: value })}
              disabled={loadingPatients}
            >
              <SelectTrigger data-testid="select-appointment-patient">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} - {patient.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                data-testid="input-appointment-date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
                data-testid="input-appointment-time"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose *</Label>
            <Input
              id="purpose"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              placeholder="e.g., Regular Checkup, Follow-up Consultation"
              required
              data-testid="input-appointment-purpose"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or instructions"
              rows={3}
              data-testid="input-appointment-notes"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating || !formData.patientId} data-testid="button-submit-appointment">
              {isCreating ? "Creating..." : "Create Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
