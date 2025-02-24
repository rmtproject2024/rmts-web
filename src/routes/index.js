const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware');

const firebaseAuthController = require('../controllers/firebase-auth-controller');
const DoctorController = require('../controllers/doctor-controller.js');
const PostsController = require('../controllers/posts-controller.js');


// Auth routes
router.post('/api/register', firebaseAuthController.registerUser);
router.post('/api/login', firebaseAuthController.loginUser);
router.post('/api/logout', firebaseAuthController.logoutUser);
router.post('/api/reset-password', firebaseAuthController.resetPassword);
router.post('/api/createPatient', DoctorController.CreatePatient)
//posts routes
router.get('/api/posts', verifyToken, PostsController.getPosts);

module.exports = router;
