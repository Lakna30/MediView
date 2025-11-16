import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";
import { PageLayout, Section } from "../common/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    clinicName: "MediView Clinic",
    email: "contact@mediview.com",
    phone: "+1 (555) 123-4567",
    address: "123 Healthcare St, Medical City",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    notifications: {
      email: true,
      sms: true,
      push: false,
    },
    theme: "light",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic here
    console.log('Settings saved:', formData);
  };

  return (
    <PageLayout
      title="Settings"
      description="Manage your clinic's settings and preferences"
      actions={
        <Button onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      }
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="danger" className="text-red-600">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Section title="Clinic Information">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinicName">Clinic Name</Label>
                  <Input
                    id="clinicName"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </Section>

          <Section title="Date & Time">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <select
                  id="dateFormat"
                  name="dateFormat"
                  value={formData.dateFormat}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeFormat">Time Format</Label>
                <select
                  id="timeFormat"
                  name="timeFormat"
                  value={formData.timeFormat}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="12h">12-hour (1:30 PM)</option>
                  <option value="24h">24-hour (13:30)</option>
                </select>
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Section title="Notification Preferences">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important updates
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  name="email"
                  checked={formData.notifications.email}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        email: checked
                      }
                    }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive text message notifications
                  </p>
                </div>
                <Switch
                  id="sms-notifications"
                  name="sms"
                  checked={formData.notifications.sms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        sms: checked
                      }
                    }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications on your device
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  name="push"
                  checked={formData.notifications.push}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        push: checked
                      }
                    }))
                  }
                />
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Section title="Theme">
            <div className="grid grid-cols-3 gap-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${
                  formData.theme === 'light' ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setFormData({...formData, theme: 'light'})}
              >
                <div className="bg-white rounded-md overflow-hidden border h-24 mb-2">
                  <div className="h-3 bg-gray-100"></div>
                  <div className="p-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <span className="text-sm font-medium">Light</span>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${
                  formData.theme === 'dark' ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setFormData({...formData, theme: 'dark'})}
              >
                <div className="bg-gray-900 rounded-md overflow-hidden border h-24 mb-2">
                  <div className="h-3 bg-gray-800"></div>
                  <div className="p-2">
                    <div className="h-2 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
                <span className="text-sm font-medium">Dark</span>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${
                  formData.theme === 'system' ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setFormData({...formData, theme: 'system'})}
              >
                <div className="relative rounded-md overflow-hidden border h-24 mb-2">
                  <div className="absolute inset-0 bg-white dark:bg-gray-900">
                    <div className="h-3 bg-gray-100 dark:bg-gray-800"></div>
                    <div className="p-2">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 w-1/2 border-r border-gray-300 dark:border-gray-700">
                    <div className="h-3 bg-gray-100"></div>
                    <div className="p-2">
                      <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium">System</span>
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Section title="Billing Information">
            <div className="space-y-4">
              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-medium mb-4">Current Plan</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Professional Plan</h4>
                      <p className="text-sm text-muted-foreground">Billed monthly</p>
                    </div>
                    <span className="font-bold">$99/month</span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    Change Plan
                  </Button>
                  <Button variant="outline" className="w-full">
                    Update Payment Method
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-medium mb-4">Billing History</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Monthly Subscription</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(2023, 5 - item, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${99}.00</p>
                        <p className="text-sm text-green-600">Paid</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="mt-4 w-full">
                  View All Invoices
                </Button>
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="danger" className="space-y-6">
          <Section title="Danger Zone">
            <div className="space-y-6">
              <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-900/20">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-lg font-medium">Export Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Export all your clinic data in a standard format.
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/50">
                      Export Data
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-900/20">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-lg font-medium">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <div className="mt-2">
                    <Button variant="destructive" className="flex items-center">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
