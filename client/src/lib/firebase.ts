// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  onAuthStateChanged, 
  User, 
  signOut, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc,
  collection, 
  addDoc, 
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  limit,
  where
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5qVGbyJnQjyQCtxt5YHPr55pph2EJ5xc",
  authDomain: "mediview-50a05.firebaseapp.com",
  projectId: "mediview-50a05",
  storageBucket: "mediview-50a05.firebasestorage.app",
  messagingSenderId: "106923732067",
  appId: "1:106923732067:web:2d5e8c9f982c7b2dc01c56",
  measurementId: "G-RVPLTZ6JQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// User profile type
export interface UserProfile {
  role: "admin" | "doctor" | "staff" | "patient";
  name: string;
  email: string;
  createdAt?: any;
}

// User profile functions
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    await setDoc(doc(db, 'users', userId), data, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Alias for backward compatibility
export const onAuthChange = onAuthStateChange;

// Authentication functions
export const signIn = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    return null;
  }
};

export const signUp = async (email: string, password: string, displayName: string, role: "admin" | "doctor" | "staff" | "patient"): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    
    const userProfile: UserProfile = {
      role,
      name: displayName,
      email,
      createdAt: serverTimestamp()
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
    
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
};

// Google Sign-In functions
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (role?: "admin" | "doctor" | "staff" | "patient") => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    const existingProfile = await getUserProfile(user.uid);
    
    if (!existingProfile) {
      if (!role) {
        throw new Error('Role is required for new Google sign-in users. Please select a role before signing in.');
      }
      
      const userProfile: UserProfile = {
        role,
        name: user.displayName || 'User',
        email: user.email || '',
        createdAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'users', user.uid), userProfile);
    }
    
    return user;
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const handleGoogleRedirectResult = async (role?: "admin" | "doctor" | "staff" | "patient") => {
  try {
    const result = await getRedirectResult(auth);
    
    if (result && result.user) {
      const user = result.user;
      const existingProfile = await getUserProfile(user.uid);
      
      if (!existingProfile) {
        if (!role) {
          throw new Error('Role is required for new Google sign-in users. Please select a role before signing in.');
        }
        
        const userProfile: UserProfile = {
          role,
          name: user.displayName || 'User',
          email: user.email || '',
          createdAt: serverTimestamp()
        };
        
        await setDoc(doc(db, 'users', user.uid), userProfile);
      }
      
      return user;
    }
    
    return null;
  } catch (error: any) {
    console.error('Error handling Google redirect:', error);
    throw error;
  }
};

// Patient functions
export const createPatient = async (patientData: any) => {
  try {
    // Add server-side timestamp
    const patientWithTimestamp = {
      ...patientData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, 'patients'), patientWithTimestamp);
    return { id: docRef.id, ...patientWithTimestamp };
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};

export const getAllPatients = async (options: { 
  limit?: number, 
  orderByField?: string, 
  orderDirection?: 'asc' | 'desc',
  whereClause?: { field: string, operator: '==' | '!=' | '<' | '<=' | '>' | '>=', value: any }
} = {}) => {
  try {
    const {
      limit: queryLimit = 1000, // Default limit to prevent loading too much data
      orderByField = 'createdAt',
      orderDirection = 'desc',
      whereClause
    } = options;

    let q = query(
      collection(db, 'patients'),
      orderBy(orderByField, orderDirection),
      limit(queryLimit)
    );

    if (whereClause) {
      q = query(q, where(whereClause.field, whereClause.operator, whereClause.value));
    }

    const querySnapshot = await getDocs(q);
    const patients: any[] = [];
    
    querySnapshot.forEach((doc) => {
      patients.push({ id: doc.id, ...doc.data() });
    });

    return patients;
  } catch (error) {
    console.error('Error getting patients:', error);
    throw error;
  }
};

export const updatePatient = async (patientId: string, updates: any) => {
  try {
    const patientRef = doc(db, 'patients', patientId);
    
    // Add updatedAt timestamp
    const updatesWithTimestamp = {
      ...updates,
      updatedAt: serverTimestamp()
    };
    
    await setDoc(patientRef, updatesWithTimestamp, { merge: true });
    
    // Get the updated patient data
    const updatedDoc = await getDoc(patientRef);
    if (updatedDoc.exists()) {
      return { id: updatedDoc.id, ...updatedDoc.data() };
    }
    
    return null;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

export const getPatient = async (patientId: string) => {
  try {
    const docRef = doc(db, 'patients', patientId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such patient!');
      return null;
    }
  } catch (error) {
    console.error('Error getting patient:', error);
    throw error;
  }
};

// Appointment functions
export const createAppointment = async (appointmentData: any) => {
  try {
    // Add timestamps
    const appointmentWithTimestamps = {
      ...appointmentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: appointmentData.status || 'scheduled' // default status
    };
    
    const docRef = await addDoc(collection(db, 'appointments'), appointmentWithTimestamps);
    return { id: docRef.id, ...appointmentWithTimestamps };
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const updateAppointment = async (appointmentId: string, updates: any) => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId);
    
    // Add updatedAt timestamp
    const updatesWithTimestamp = {
      ...updates,
      updatedAt: serverTimestamp()
    };
    
    await setDoc(appointmentRef, updatesWithTimestamp, { merge: true });
    
    // Get the updated appointment data
    const updatedDoc = await getDoc(appointmentRef);
    if (updatedDoc.exists()) {
      return { id: updatedDoc.id, ...updatedDoc.data() };
    }
    
    return null;
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

export const deleteAppointment = async (appointmentId: string): Promise<boolean> => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId);
    await deleteDoc(appointmentRef);
    return true;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

export const getAppointments = async (options: {
  patientId?: string;
  doctorId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  limit?: number;
} = {}) => {
  try {
    let q = query(
      collection(db, 'appointments'),
      orderBy('appointmentDate', 'asc')
    );

    const { 
      patientId, 
      doctorId, 
      startDate, 
      endDate, 
      status, 
      limit: queryLimit = 100 
    } = options;

    if (patientId) q = query(q, where('patientId', '==', patientId));
    if (doctorId) q = query(q, where('doctorId', '==', doctorId));
    if (status) q = query(q, where('status', '==', status));
    if (startDate) q = query(q, where('appointmentDate', '>=', startDate));
    if (endDate) q = query(q, where('appointmentDate', '<=', endDate));
    
    q = query(q, limit(queryLimit));
    
    const querySnapshot = await getDocs(q);
    const appointments: any[] = [];
    
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });

    return appointments;
  } catch (error) {
    console.error('Error getting appointments:', error);
    throw error;
  }
};

// Notification functions
export const createNotification = async (notificationData: {
  userId: string;
  type: "appointment" | "record" | "patient" | "system";
  title: string;
  message: string;
  isRead?: boolean;
}) => {
  try {
    const notification = {
      ...notificationData,
      isRead: notificationData.isRead || false,
      createdAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, 'notifications'), notification);
    return { id: docRef.id, ...notification };
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

export const getUserNotifications = async (userId: string, limitCount: number = 50) => {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const notifications: any[] = [];
    
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });
    
    return notifications;
  } catch (error) {
    console.error('Error getting notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await setDoc(notificationRef, { isRead: true }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

export const markAllNotificationsAsRead = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('isRead', '==', false)
    );
    
    const querySnapshot = await getDocs(q);
    const updatePromises = querySnapshot.docs.map(doc => 
      setDoc(doc.ref, { isRead: true }, { merge: true })
    );
    
    await Promise.all(updatePromises);
    return true;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

export { auth, db };