const { getFirestore, collection, addDoc, doc,updateDoc } = require("firebase/firestore");
const db = getFirestore();

class GloveController {
  async createGlove(req, res) {
    try {
      const { 
        LastClabrated, 
        lastSynced,
        lastUpdated,
        model,
        productionDate,
        status,
        version,

      } = req.body;

      // Construct a new glove object or just a plain JS object
      const gloveData = {
        LastClabrated, 
        lastSynced,
        lastUpdated,
        model,
        productionDate,
        status,
        version,
        patientID: null,
        createdAt: new Date() // or a serverTimestamp if using Admin SDK
      };

      // Store it in Firestore with an auto-generated ID
      const docRef = await addDoc(collection(db, "Gloves"), gloveData);

      res.status(201).json({
        message: "Glove created successfully",
        gloveId: docRef.id
      });
    } catch (error) {
      console.error("Error creating glove:", error);
      res.status(500).json({ error: error.message });
    }
  }
  
}

module.exports = new GloveController();

