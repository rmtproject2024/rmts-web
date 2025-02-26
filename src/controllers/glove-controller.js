const { getFirestore, collection, addDoc, doc,updateDoc } = require("firebase/firestore");
const db = getFirestore();

class GloveController {
  async createGlove(req, res) {
    try {
      const { 
        model,
        productionDate,
        status,
        version,

      } = req.body;
      if (
        !model ||
        !productionDate ||
        !status ||
        !version 
        
      ) {
        return res.status(422).json({
          error: "Some required fields are missing for basic user registration."
        });
      }

      // Construct a new glove object or just a plain JS object
      const gloveData = {
        LastClabrated:new Date(), 
        lastSynced:new Date(),
        lastUpdated: new Date(),
        model,
        productionDate,
        status,
        version,
        patientID: null,
        createdAt: new Date() // or a serverTimestamp if using Admin SDK
      };

      // Store it in Firestore with an auto-generated ID
      const docRef = await addDoc(collection(db, "Gloves"), gloveData);
      console.log(gloveId)

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

