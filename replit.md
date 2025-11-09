# MediView - Hospital Management System

## Overview
MediView is a comprehensive modern Hospital Management System built with React, Tailwind CSS, and Firebase. The system supports four user roles (Admin, Doctor, Staff, Patient) with core functionality including patient management, digital health cards with QR codes, appointment scheduling, medical records management, and role-based access control.

## Recent Changes (November 2025)

### Firebase Integration - Data Layer Complete
- **Firebase SDK**: Configured Firebase authentication and Firestore database
- **Custom Hooks**: Created `usePatients`, `useAppointments`, and `useMedicalRecords` hooks for data management with React Query
- **Data Entry Forms**: Built `AddPatientDialog` and `AddAppointmentDialog` components for creating new records
- **Admin Dashboard**: Updated to fetch and display real Firebase data with search and filtering

### Authentication System
- **AuthContext**: Implemented with role-based access control (Admin, Doctor, Staff, Patient)
- **Protected Routes**: Routes automatically redirect based on user role
- **Firebase Auth**: Email/password authentication with user role management

## Project Architecture

### Frontend Structure
```
client/src/
├── components/
│   ├── ui/              # Shadcn components
│   ├── AddPatientDialog.tsx
│   ├── AddAppointmentDialog.tsx
│   ├── AppointmentCard.tsx
│   ├── PatientCard.tsx
│   ├── HealthCard.tsx   # With QR code generation
│   ├── StatCard.tsx
│   └── NotificationBell.tsx
├── contexts/
│   └── AuthContext.tsx  # Authentication and role management
├── hooks/
│   ├── usePatients.ts   # Patient CRUD operations
│   ├── useAppointments.ts
│   └── useMedicalRecords.ts
├── lib/
│   └── firebase.ts      # Firebase configuration and API
├── pages/
│   ├── AdminDashboard.tsx
│   ├── DoctorDashboard.tsx
│   ├── StaffDashboard.tsx
│   └── PatientDashboard.tsx
└── App.tsx
```

### Firebase Collections
- **users**: User authentication and role data
- **patients**: Patient demographics and contact information
- **appointments**: Appointment scheduling with doctor and patient references
- **medicalRecords**: Patient medical history and diagnoses

### Data Model
```typescript
Patient {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  bloodType: string
  address?: string
  emergencyContact?: string
  createdAt: Timestamp
}

Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  purpose: string
  notes?: string
  createdAt: Timestamp
}

MedicalRecord {
  id: string
  patientId: string
  date: string
  diagnosis: string
  treatment: string
  prescriptions?: string[]
  notes?: string
  doctorId: string
  createdAt: Timestamp
}
```

## User Preferences

### Design System
- **Color Scheme**: Medical blue (HSL 203 85% 32%) with professional healthcare aesthetic
- **Typography**: Inter font family for clean, modern readability
- **UI Framework**: Shadcn + Tailwind CSS with Material Design principles
- **Icons**: Lucide React for interface elements

### Technical Choices
- **State Management**: React Query for server state, Context API for auth
- **Forms**: React Hook Form with Zod validation
- **Database**: Firebase Firestore for real-time data synchronization
- **QR Codes**: qrcode.react library for patient health card QR generation

## Current Status

### Completed
- ✅ Full UI/UX design prototype for all role-based dashboards
- ✅ Firebase configuration and authentication system
- ✅ Custom hooks for data management (patients, appointments, medical records)
- ✅ Patient and appointment creation dialogs
- ✅ Admin Dashboard with real Firebase data integration
- ✅ Reusable components (StatCard, AppointmentCard, PatientCard, HealthCard)
- ✅ QR code generation for patient identification

### In Progress
- 🔄 Testing authentication flow and data operations
- 🔄 Update remaining dashboards (Doctor, Staff, Patient) with real data

### Planned
- ⏳ Medical records management interface
- ⏳ Real-time notification system
- ⏳ Appointment calendar with availability tracking
- ⏳ Staff management module
- ⏳ Report generation and analytics

## Environment Variables
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_APP_ID
VITE_FIREBASE_PROJECT_ID
SESSION_SECRET
```

## Key Features

### Patient Management
- Register new patients with comprehensive demographic data
- Search and filter patient records
- View patient profiles and medical history
- Generate digital health cards with QR codes

### Appointment System
- Create appointments with patient and doctor selection
- Real-time availability tracking
- Status management (pending, confirmed, cancelled, completed)
- Search and filter appointments

### Role-Based Access
- **Admin**: Full system access, patient and appointment management
- **Doctor**: View patients, manage appointments, update medical records
- **Staff**: Registration desk operations, appointment scheduling
- **Patient**: View personal health information, book appointments

### Security
- Firebase authentication with email/password
- Role-based route protection
- Secure Firestore rules for data access control

## Development Notes
- All interactive elements include `data-testid` attributes for testing
- Firebase operations use React Query for caching and optimistic updates
- Form validation using Zod schemas derived from data models
- Responsive design works on desktop and mobile devices
