const { getFirestore, collection, addDoc,getDocs, doc,updateDoc, DocumentReference } = require("firebase/firestore");
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
          await updateDoc(doc(db, "Gloves", gloveId), {
            patientID: patientId,
            status: "active"
          });
    
          res.status(200).json({ message: "Glove assigned to patient", gloveId, patientId });
        } catch (error) {
          console.error("Error assigning glove:", error);
          res.status(500).json({ error: error.message });
        }
        
      }
      async getGloves(req, res) {
        try {
          const querySnapshot = await getDocs(collection(db, "Gloves"));
          const gloves = [];
          querySnapshot.forEach((doc) => {
            gloves.push({ id: doc.id, ...doc.data() });
          });
          res.status(200).json(gloves);
        } catch (error) {
          console.error("Error fetching gloves list:", error);
          res.status(500).json({ error: error.message });
        }
      }
    
      // Endpoint to get a list of all patients
      async getPatients(req, res) {
        try {
          const querySnapshot = await getDocs(collection(db, "patients"));
          const patients = [];
          querySnapshot.forEach((doc) => {
            patients.push({ id: doc.id, ...doc.data() });
          });
          res.status(200).json(patients);
        } catch (error) {
          console.error("Error fetching patients list:", error);
          res.status(500).json({ error: error.message });
        }
      }
}
module.exports = new GloveAssigner();