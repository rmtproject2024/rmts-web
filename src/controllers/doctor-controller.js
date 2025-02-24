const { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification,
    sendPasswordResetEmail
   } = require('../config/firebase');
  const auth = getAuth();
  const { getFirestore, doc, setDoc } = require("firebase/firestore");
  const db = getFirestore();


    const User = require("../models/user/user");
    const Patient = require("../models/patient/patient");

class DoctorController {
  async CreatePatient(req, res) {
    try {
      const { 
        email,
        password, 
        fullName, 
        age, 
        nationality, 
        birthDate, 
        gender, 
        phonenumber, 
        verfied, 
        gloveId,  
        emergencyContact
      } = req.body;

      // 1) Create a user with the client SDK
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 2) Extract the uid
      const uid = userCredential.user.uid;

      // 3) Build a User object (from your custom model)
      const user = new User({
        uid,
        fullName,
        email,
        age,
        nationality,
        birthDate,
        gender,
        role: "patient",
        phonenumber,
        verfied,
      });

      // 4) Build a Patient object (from your custom model)
      const patient = new Patient({
        uid,
        gloveId,
        doctorId: 2213, // example
        emergencyContact,
        prescrptionId: 153 // example
      });

      // 5) Save to Firestore (using client Firestore in this example)
      await setDoc(doc(db, "users", uid), user.toFirestore());
      await setDoc(doc(db, "patients", uid), patient.toFirestore());

      // 6) Optionally, send a verification email
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      }

      // 7) Respond
      res.status(201).json({ message: "Patient created successfully", uid });
    } catch (error) {
      console.error("Error creating patient:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DoctorController();