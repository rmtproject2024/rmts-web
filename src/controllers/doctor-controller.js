const { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    
    sendEmailVerification,
    sendPasswordResetEmail
   } = require('../config/firebase');
  const auth = getAuth();
  const { getFirestore, doc, setDoc,updateDoc,arrayUnion } = require("firebase/firestore");
  const db = getFirestore();


    const User = require("../models/user/user");
    const Patient = require("../models/patient/patient");
    const Doctor = require('../models/Doctor/doctor');

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
        emergencyContact,
      } = req.body;

      if (
        !email ||
        !password ||
        !gender ||
        !age ||
        !nationality ||
        !fullName ||
        !birthDate ||
        !phonenumber ||
        !emergencyContact 
      
      ) {
        return res.status(422).json({
          error: "Some required fields are missing for basic user registration."
        });
      }
  

       // 1) Create a user with the client SDK
       const userCredential = await createUserWithEmailAndPassword(auth, email, password);

       // 2) Extract the uid
       const uid = userCredential.user.uid;
       
       const idToken = req.cookies.uid;
     

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
      });


      // 4) Buil a Patient object (from your custom model)
      const patient = new Patient({
        uid,
        gloveId:null,
        doctorId: idToken, // example
        emergencyContact,
        prescrptionId:null, // example
      });

      
      // 5) Save to Firestore (using client Firestore in this example)
      await setDoc(doc(db, "users", uid), user.toFirestore());
      await setDoc(doc(db, "patients", uid), patient.toFirestore());
      await updateDoc(doc(db,"doctors", idToken),{
                patientId: arrayUnion(uid)
                });

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