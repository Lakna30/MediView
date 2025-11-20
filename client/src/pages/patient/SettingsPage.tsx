import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageLayout, Section } from "../common/PageLayout";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    email: "you@example.com",
    phone: "+1 (555) 123-4567",
    notifications: { email: true, sms: false, push: false },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={formData.email} onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={formData.phone} onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))} />
          </div>
          <div className="space-y-2">
            <Label>Notifications</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive appointment updates</p>
                </div>
                <Switch checked={formData.notifications.email} onCheckedChange={(v) => setFormData(prev => ({...prev, notifications: {...prev.notifications, email: v}}))} />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">SMS Notifications</p>
                </div>
                <Switch checked={formData.notifications.sms} onCheckedChange={(v) => setFormData(prev => ({...prev, notifications: {...prev.notifications, sms: v}}))} />
              </div>
            </div>
          </div>
          <Button onClick={() => console.log('Save settings')}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
