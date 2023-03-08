import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  set,
  doc
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBc9D6TJoF6aCi4_sWbOfUHhTze0RK-Tuo",
    authDomain: "nuhelper-5a2c6.firebaseapp.com",
    projectId: "nuhelper-5a2c6",
    storageBucket: "nuhelper-5a2c6.appspot.com",
    messagingSenderId: "91778432471",
    appId: "1:91778432471:web:69f5da4b2d46d4df1b9f92"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, {  
                id : docRef.id,
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            }, { merge: true });
           
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, {  
            id : docRef.id,
            uid: user.uid,
            name,
            authProvider: "local",
            email, 
        }, { merge: true });

        
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};


export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};