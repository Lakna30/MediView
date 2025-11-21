import { Switch, Route, useLocation, Redirect } from "wouter";
import { Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { auth, getUserProfile, UserProfile, signIn, signUp, logOut, onAuthChange, signInWithGoogle } from "@/lib/firebase";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  Activity,
  LogOut
} from "lucide-react";
import NotificationBell from "@/components/NotificationBell";
import ThemeToggle from "@/components/ThemeToggle";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/components/LoginPage";
import AdminDashboard from "@/pages/AdminDashboard";
import DoctorDashboard from "@/pages/DoctorDashboard";
import StaffDashboard from "@/pages/StaffDashboard";
import PatientDashboard from "@/pages/PatientDashboard";
import AppointmentsPage from "@/pages/AppointmentsPage";
import PatientsPage from "@/pages/PatientsPage";
import StaffPage from "@/pages/StaffPage";
import ReportsPage from "@/pages/ReportsPage";
import SettingsPage from "@/pages/SettingsPage";
import SchedulePage from "@/pages/SchedulePage";
import RecordsPage from "@/pages/RecordsPage";
import HealthCardPage from "@/pages/HealthCardPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import doctorImage from '@assets/generated_images/Female_doctor_professional_headshot_cbc51cc9.png';
import { useEffect } from "react";

type UserRole = "admin" | "doctor" | "staff" | "patient" | null;

function AppSidebar({ role, onLogout }: { role: UserRole; onLogout: () => void }) {
  const adminMenuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/" },
    { title: "Appointments", icon: Calendar, url: "/appointments" },
    { title: "Patients", icon: Users, url: "/patients" },
    { title: "Staff", icon: Users, url: "/staff" },
    { title: "Reports", icon: FileText, url: "/reports" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];

  const doctorMenuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/" },
    { title: "My Schedule", icon: Calendar, url: "/schedule" },
    { title: "Patients", icon: Users, url: "/patients" },
    { title: "Medical Records", icon: FileText, url: "/records" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];

  const staffMenuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/" },
    { title: "Appointments", icon: Calendar, url: "/appointments" },
    { title: "Patients", icon: Users, url: "/patients" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];

  const patientMenuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/" },
    { title: "Appointments", icon: Calendar, url: "/appointments" },
    { title: "Medical Records", icon: FileText, url: "/records" },
    { title: "Health Card", icon: CreditCard, url: "/health-card" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];

  const menuItems = 
    role === "admin" ? adminMenuItems :
    role === "doctor" ? doctorMenuItems :
    role === "staff" ? staffMenuItems :
    patientMenuItems;

  const { user, userProfile } = useAuth();

  const getDisplayName = () => {
    // Use the user's display name from Firebase Auth if available
    if (user?.displayName) return user.displayName;
    
    // Fall back to user profile name if available
    if (userProfile?.name) return userProfile.name;
    
    // Default role-based names
    if (role === "admin") return "Administrator";
    if (role === "doctor") return "Dr. Smith";
    if (role === "staff") return "Staff Member";
    return "Patient";
  };

  const mockNotifications = [
    {
      id: "1",
      type: "appointment" as const,
      title: "Upcoming Appointment",
      message: "Appointment tomorrow at 2:00 PM",
      time: "5 min ago",
      isRead: false,
    },
    {
      id: "2",
      type: "record" as const,
      title: "Lab Results Available",
      message: "Your blood test results are ready",
      time: "1 hour ago",
      isRead: false,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg">MediView</h2>
            <p className="text-xs text-muted-foreground capitalize">{role} Portal</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url} className="w-full">
                    <SidebarMenuButton className="w-full justify-start" data-testid={`nav-${item.title.toLowerCase().replace(' ', '-')}`}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user?.photoURL || doctorImage} alt={getDisplayName()} />
                  <AvatarFallback>
                    {getDisplayName().split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" data-testid="user-display-name">{getDisplayName()}</p>
                  <p className="text-xs text-muted-foreground capitalize">{role}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={onLogout}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function Router({ role }: { role: UserRole }) {
  // Common routes available inside the dashboard area. Role-specific
  // pages are still respected by conditional rendering inside those pages.
  return (
    <Switch>
      <Route path="/dashboard" component={role === "admin" ? AdminDashboard : role === "doctor" ? DoctorDashboard : role === "staff" ? StaffDashboard : PatientDashboard} />

      <Route path="/appointments" component={AppointmentsPage} />
      <Route path="/patients" component={PatientsPage} />
      <Route path="/staff" component={StaffPage} />
      <Route path="/reports" component={ReportsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/schedule" component={SchedulePage} />
      <Route path="/records" component={RecordsPage} />
      <Route path="/health-card" component={HealthCardPage} />

      {/* Fallback to role dashboard for any other path */}
      <Route path="/:rest*" component={role === "admin" ? AdminDashboard : role === "doctor" ? DoctorDashboard : role === "staff" ? StaffDashboard : PatientDashboard} />
    </Switch>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, userProfile, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return <Redirect to="/auth" />;
  }

  return <>{children}</>;
}

function AppContent() {
  const { user, userProfile, loading, logout } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && user && userProfile) {
      const currentPath = window.location.pathname;
      if (currentPath === "/" || currentPath === "/auth") {
        setLocation("/dashboard");
      }
    }
  }, [user, userProfile, loading, setLocation]);

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/">
        {() => user && userProfile ? <Redirect to="/dashboard" /> : <LandingPage />}
      </Route>
      <Route path="/auth">
        {() => user && userProfile ? <Redirect to="/dashboard" /> : <LoginPage onLogin={async () => {}} />}
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute>
          <DashboardLayout role={userProfile?.role || null} onLogout={handleLogout} />
        </ProtectedRoute>
      </Route>
      <Route path="/:rest*">
        <ProtectedRoute>
          <DashboardLayout role={userProfile?.role || null} onLogout={handleLogout} />
        </ProtectedRoute>
      </Route>
    </Switch>
  );
}

function DashboardLayout({ role, onLogout }: { role: UserRole; onLogout: () => void }) {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role={role} onLogout={onLogout} />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center justify-between gap-4 p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-2">
              <NotificationBell />
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              <Router role={role} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
