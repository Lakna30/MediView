import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, Users, FileText, Shield, Bell, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient profiles with complete medical history and demographics"
    },
    {
      icon: CreditCard,
      title: "Digital Health Cards",
      description: "Issue and manage digital health cards with secure QR code verification"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Real-time appointment booking with availability tracking and reminders"
    },
    {
      icon: FileText,
      title: "Medical Records",
      description: "Secure electronic health records with easy access and management"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Secure authentication for Admin, Doctor, Staff, and Patient portals"
    },
    {
      icon: Bell,
      title: "Real-Time Notifications",
      description: "Instant updates for appointments, medical records, and system alerts"
    }
  ];

  const roles = [
    {
      title: "Admin",
      description: "Full system access and management capabilities",
      features: ["User management", "System analytics", "Report generation"]
    },
    {
      title: "Doctor",
      description: "Patient care and medical record management",
      features: ["Patient records", "Appointment management", "Prescription handling"]
    },
    {
      title: "Staff",
      description: "Patient registration and appointment scheduling",
      features: ["Patient registration", "Appointment booking", "Health card issuance"]
    },
    {
      title: "Patient",
      description: "Personal health information and appointment access",
      features: ["View health records", "Book appointments", "Digital health card"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">MediView</span>
          </div>
          <Button onClick={() => setLocation("/auth")} data-testid="button-nav-signin">
            Sign In
          </Button>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Trusted by Healthcare Professionals</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Modern Hospital Management
            <span className="block text-primary mt-2">Made Simple</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline your healthcare operations with our comprehensive hospital management system. 
            Secure, efficient, and designed for the modern healthcare environment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              onClick={() => setLocation("/auth")}
              className="text-lg px-8"
              data-testid="button-get-started"
            >
              Get Started
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your healthcare facility efficiently and securely
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Role-Based Access</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Secure portals designed for every user in your healthcare ecosystem
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {roles.map((role, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto bg-primary text-primary-foreground">
          <CardHeader className="text-center space-y-4 pb-8">
            <CardTitle className="text-3xl">Ready to Transform Your Healthcare Management?</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg">
              Join thousands of healthcare professionals already using MediView
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setLocation("/auth")}
              className="text-lg px-8"
              data-testid="button-cta-get-started"
            >
              Get Started Today
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t py-8 bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 MediView. Secure healthcare management powered by modern technology.</p>
        </div>
      </footer>
    </div>
  );
}
