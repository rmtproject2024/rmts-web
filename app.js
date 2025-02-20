const express = require('express'); 
const app = express();
const admin = require("firebase-admin");
//const credentials = require("C:\\Users\\GT\\Desktop\\RMT\\firebaseservice.json");
const credentials = require("C:\\Users\\97155\\Desktop\\RMTHAMZACODE\\Draft one\\Firebase-authentication-Express.js-main\\firebaseservice.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

// Fixed the typo here
app.use(express.json()); // Corrected typo from express.jsom()

// Fixed the typo here
app.use(express.urlencoded({ extended: true })); // Corrected typo from exoress.urlencoded()

app.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        // Create user in Firebase Auth
        const userResponse = await admin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
            disabled: false
        });

        // Send the response back
        res.json(userResponse);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`App listening on port ${PORT}`);
});
