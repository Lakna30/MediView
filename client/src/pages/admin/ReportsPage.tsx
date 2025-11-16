import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Calendar as CalendarIcon } from "lucide-react";
import { PageLayout, Section } from "../common/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(1)), // First day of current month
    to: new Date(), // Today
  });

  const [activeTab, setActiveTab] = useState("appointments");

  const handleDownload = (type: string) => {
    // Implement download logic here
    console.log(`Downloading ${type} report`);
  };

  return (
    <PageLayout
      title="Reports"
      description="Generate and view system reports"
      actions={
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                ) : (
                  format(dateRange.from, "MMM d, yyyy")
                )
              ) : (
                <span>Select date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      }
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Section title="Appointment Reports">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <ReportCard 
                title="Total Appointments"
                value="1,234"
                description="+20.1% from last month"
                trend="up"
              />
              <ReportCard 
                title="Completed"
                value="876"
                description="+12.3% from last month"
                trend="up"
              />
              <ReportCard 
                title="Cancelled"
                value="124"
                description="-5.2% from last month"
                trend="down"
              />
              <ReportCard 
                title="No Show"
                value="34"
                description="+2.1% from last month"
                trend="up"
              />
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Section title="Patient Reports">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ReportCard 
                title="Total Patients"
                value="5,678"
                description="+8.2% from last month"
                trend="up"
              />
              <ReportCard 
                title="New Patients"
                value="234"
                description="+15.7% from last month"
                trend="up"
              />
              <ReportCard 
                title="Active Patients"
                value="3,456"
                description="+4.3% from last month"
                trend="up"
              />
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Section title="Revenue Reports">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ReportCard 
                title="Total Revenue"
                value="$125,678.90"
                description="+12.5% from last month"
                trend="up"
              />
              <ReportCard 
                title="Outstanding"
                value="$23,456.78"
                description="-2.3% from last month"
                trend="down"
              />
              <ReportCard 
                title="Average Revenue per Patient"
                value="$145.67"
                description="+3.2% from last month"
                trend="up"
              />
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Section title="Inventory Reports">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ReportCard 
                title="Low Stock Items"
                value="24"
                description="Needs attention"
                trend="warning"
              />
              <ReportCard 
                title="Out of Stock"
                value="8"
                description="Urgent restock needed"
                trend="down"
              />
              <ReportCard 
                title="Expiring Soon"
                value="15"
                description="Next 30 days"
                trend="warning"
              />
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}

type ReportCardProps = {
  title: string;
  value: string;
  description: string;
  trend?: "up" | "down" | "warning";
};

function ReportCard({ title, value, description, trend = "up" }: ReportCardProps) {
  const trendColors = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    warning: "text-yellow-600 dark:text-yellow-400",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {trend === "up" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-green-600 dark:text-green-400"
          >
            <path d="M12 5v14M19 12l-7-7-7 7" />
          </svg>
        )}
        {trend === "down" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-red-600 dark:text-red-400"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        )}
        {trend === "warning" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-yellow-600 dark:text-yellow-400"
          >
            <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trendColors[trend]}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
