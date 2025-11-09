import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, Users, FileText, Shield, Bell, CreditCard, ChevronRight, CheckCircle2, Stethoscope, Mail, Phone, MapPin } from "lucide-react";
import { useLocation } from "wouter";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
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

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      experience: "15 years",
      description: "Specialized in heart disease prevention and treatment"
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Pediatrics",
      experience: "12 years",
      description: "Expert in child healthcare and development"
    },
    {
      name: "Dr. Emily Williams",
      specialty: "Orthopedics",
      experience: "18 years",
      description: "Focused on bone and joint disorders treatment"
    },
    {
      name: "Dr. James Rodriguez",
      specialty: "Neurology",
      experience: "20 years",
      description: "Specialist in brain and nervous system conditions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">MediView</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-about"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('doctors')} 
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-doctors"
            >
              Doctors
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-contact"
            >
              Contact Us
            </button>
          </div>

          <Button onClick={() => setLocation("/auth")} data-testid="button-nav-signin">
            Sign In
          </Button>
        </div>
      </nav>

      <section id="home" className="container mx-auto px-4 py-20">
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

      <section id="about" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About MediView</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            MediView is a cutting-edge hospital management system designed to streamline healthcare operations. 
            Our comprehensive platform brings together patient management, scheduling, medical records, and more 
            into one secure, easy-to-use solution.
          </p>
        </div>
        
        <div className="text-center mb-12 mt-16">
          <h3 className="text-2xl font-bold mb-4">Comprehensive Features</h3>
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

      <section id="doctors" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Doctors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet our team of experienced healthcare professionals dedicated to your wellbeing
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {doctors.map((doctor, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-lg">{doctor.name}</CardTitle>
                <CardDescription className="text-primary font-medium">
                  {doctor.specialty}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{doctor.experience} of experience</p>
                <p className="text-sm">{doctor.description}</p>
              </CardContent>
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

      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              Get in touch with us for any inquiries or support
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  We're here to help with any questions about MediView
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@mediview.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      123 Healthcare Ave, Medical District<br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
                <CardDescription>
                  Our support team is available during these hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Saturday</span>
                  <span className="text-muted-foreground">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
                <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-center">
                    For urgent medical matters, please call our 24/7 emergency line at <strong>+1 (555) 911-HELP</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 MediView. Secure healthcare management powered by modern technology.</p>
        </div>
      </footer>
    </div>
  );
}
