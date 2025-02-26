const { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  sendPasswordResetEmail
 } = require('../config/firebase');
const auth = getAuth();
const { getFirestore, doc, setDoc, collection } = require("firebase/firestore");
const db = getFirestore();
const User = require("../models/user/user");
const Doctor = require("../models/Doctor/doctor");
const Secertary = require("../models/Secertary/secertary"); 


class FirebaseAuthController {
  async registerUser(req, res) {
    try {
      // 1. Extract the common fields from request body
      const {
        email,
        password,
        role,
        gender,
        age,
        nationality,
        fullName,
        birthDate,
        phonenumber,
        // Doctor-only fields (may be missing if user is not a doctor)
        licenseNumber,
        description,
        nationalId
      } = req.body;
  
      // 2. Validate the universal fields (for all roles)
      if (
        !email ||
        !password ||
        !role ||
        !gender ||
        !age ||
        !nationality ||
        !fullName ||
        !birthDate ||
        !phonenumber 
      ) {
        return res.status(422).json({
          error: "Some required fields are missing for basic user registration."
        });
      }
  
      // 3. If role is "doctor", validate doctor-specific fields
      if (role.toLowerCase() === "doctor") {
        if (!licenseNumber || !description || !nationalId) {
          return res.status(422).json({
            error: "Missing doctor-specific fields: licenseNumber, description, nationalId."
          });
        }
      }
  
      // 4. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const idToken = req.cookies.uid;
      // 5. Create the user doc in Firestore
      const userData = new User({
        uid,
        fullName,
        email,
        age,
        nationality,
        birthDate,
        gender,
        role,
        phonenumber,
        createdAt: new Date(),
        
    
      });
      await setDoc(doc(db, "users", uid), userData.toFirestore());
  
      // 6. If role is doctor, also create doc in "doctors" collection
      if (role.toLowerCase() === "doctor") {
        const doctorData = new Doctor({
          uid,
          licenseNumber,
          description,
          nationalId,
          patientId: [],
          createdAt: new Date(),
        });
        await setDoc(doc(db, "doctors", uid), doctorData.toFirestore());
      }
      if (role.toLowerCase() === "secertary") {
        const secertaryData = new Secertary({
          uid,   
          doctorId: idToken, // optional if you want to store "doctorId"
          createdAt: new Date(),
          role: "Secertary",
        });
        await setDoc(doc(db, "Secertary", uid), secertaryData.toFirestore());
      }
  
      // 7. Optionally send email verification
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      }
  
      // 8. Respond
      res.status(201).json({ message: "User created successfully", uid });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: error.message });
    }
  }

  loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({
            email: "Email is required",
            password: "Password is required",
        });
    }
  
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
          console.log(userCredential);
          const idToken = userCredential._tokenResponse.idToken
            if (idToken) {
                res.cookie('access_token', idToken, {
                    httpOnly: true
                });
                res.cookie('uid', userCredential.user.uid, {
                    httpOnly: true
                });
                const uu = req.cookies.uid;
                res.status(200).json({ message: "User logged in successfully", uu });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        })
        .catch((error) => {
            console.error(error);
            const errorMessage = error.message || "An error occurred while logging in";
            res.status(500).json({ error: errorMessage });
        });
  }

  logoutUser(req, res) {
    const uu = req.cookies.uid;
    console.log(uu);
    signOut(auth)
      .then(() => {
        res.clearCookie('access_token');
        res.status(200).json({ message: "User logged out successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
}


  resetPassword(req, res){
    const { email } = req.body;
    if (!email ) {
      return res.status(422).json({
        email: "Email is required"
      });
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        res.status(200).json({ message: "Password reset email sent successfully!" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
}

module.exports = new FirebaseAuthController();
