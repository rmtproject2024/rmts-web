const { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  sendPasswordResetEmail
 } = require('../config/firebase');
const auth = getAuth();
const { getFirestore, doc, setDoc, and } = require("firebase/firestore");
const db = getFirestore();
const User = require("../models/user/user");
const Doctor = require("../models/Doctor/doctor");

class FirebaseAuthController {
  async registerUser(req, res) {
    console.log(req.body);
    const { email, password, role, licenseNumber, gender,age,nationality,fullName,birthDate,phonenumber,verfied,description,nationalId,patientIds} = req.body; // Extract all fields
  
    if (!email || !password || !role  || !gender || !age || !nationality || !fullName || !birthDate || !phonenumber || !verfied ) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
        fullName: "name and surname",
        nationality: "nationality",
        gender: "Gender is required",
        age: "Age",
        birthDate: "birthdate: daymonthyear",
        phonenumber: "phone number",
        role: "Role is required"
      });
    }
    if(role.toLowerCase() === "doctor" && !licenseNumber) {
      return res.status(422).json({
        licenseNumber: "License Number is required",
        description: "Description is required",
        nationalId: "nationalID is required",
        patientIds: "ssdsd"
      });
      
    }

    const user = new User({
      uid,
        fullName,
        email,
        age,
        nationality,
        birthDate,
        gender,
        role,
        phonenumber,
        verfied,
    });
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const uid = userCredential.user.uid;
      
    
    const doctor = new Doctor({
      uid,
      licenseNumber,
      description,
      nationalId,
      patientIds:null,

    });
    await setDoc(doc(db,"users",uid),user.toFirestore());
    await setDoc(doc(db,"doctors",uid),doctor.toFirestore());
    
  
      if (auth.currentUser) {
              await sendEmailVerification(auth.currentUser);
            }
      
            // 7) Respond
            res.status(201).json({ message: "user/doctor created successfully", uid });
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
