import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCgsiJejz8K7ImZQfmxpGZ8DftNDW405Ig",
  authDomain: "antcowebsite.firebaseapp.com",
  projectId: "antcowebsite",
  storageBucket: "antcowebsite.firebasestorage.app",
  messagingSenderId: "43688401424",
  appId: "1:43688401424:web:64f5f22cfe2ab8a73e8895",
  measurementId: "G-MZ31BJ5MXD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const saveContent = async (content) => {
  try {
    await setDoc(doc(db, "website", "content"), content);
    return true;
  } catch (error) {
    console.error("Error saving content:", error);
    return false;
  }
};

export const loadContent = async () => {
  try {
    const docSnap = await getDoc(doc(db, "website", "content"));
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error loading content:", error);
    return null;
  }
};
