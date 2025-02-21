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

class FirebaseAuthController {
  registerUser(req, res) {
    const { email, password, role, licenseNumber, gender, patientid } = req.body; // Extract all fields
  
    if (!email || !password || !role || !licenseNumber || !gender || !patientid) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
        licenseNumber: "License Number is required",
        gender: "Gender is required",
        patientid: "Patient ID is required",
        role: "Role is required"
      });
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        try {
          // Save user info in Firestore
          const userRef = doc(db, "doctors", userCredential.user.uid);
          await setDoc(userRef, {
            email: email,
            createdAt: new Date(),
            role: role,
            licenseNumber: licenseNumber,
            gender: gender,
            patientid: patientid,
          });
  
          // Send verification email
          await sendEmailVerification(auth.currentUser);
          res.status(201).json({ message: "Verification email sent! User created successfully!" });
  
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error saving user data in Firestore" });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: error.message || "Registration failed" });
      });
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
          const idToken = userCredential._tokenResponse.idToken
            if (idToken) {
                res.cookie('access_token', idToken, {
                    httpOnly: true
                });
                res.status(200).json({ message: "User logged in successfully", userCredential });
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
