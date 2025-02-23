const { getFirestore, collection, addDoc, doc,updateDoc, DocumentReference } = require("firebase/firestore");
const db = getFirestore();

class GloveAssigner {
    async assignGloveToPatient(req, res) {
        try {
          const { gloveId, patientId } = req.body;
          if (!gloveId || !patientId) {
            return res.status(400).json({ error: "gloveId and patientId required" });
          }
    
          // Update the glove doc to add a reference to the patient
          await updateDoc(doc(db, "Gloves", gloveId), {
            patientID: patientId
          });
          await updateDoc(doc(db,"patients",patientId),{
            gloveId: gloveId
          });
    
          res.status(200).json({ message: "Glove assigned to patient", gloveId, patientId });
        } catch (error) {
          console.error("Error assigning glove:", error);
          res.status(500).json({ error: error.message });
        }
      }

}
module.exports = new GloveAssigner();