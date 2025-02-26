const { documentId } = require("firebase/firestore");

class Appointment {
    constructor({appointmentID,uid,doctorId,patientIds,dateTime, status, Notes }) {
      this.appointmentID = appointmentID; // Foreign Key (User ID)
      this.patientI= patientId;
      this.doctorId = doctorId;
      this.Notes = Notes;
      this.dateTime = dateTime;
      this.status = status;
    }
  
    toFirestore() {
      return {
        uid: this.appointmentID,
        patientid: this.patientIds,
        doctorId: this.doctorId,   // changed patientID -> patientIds
        Notes: this.Notes,   // changed nationalID -> nationalId
        status: this.status,
        dateTime: this.dateTime,
        createdAt: new Date().getUTCDate(),
        updatedAt: new Date().getUTCDate() ,       // optional if you want to store "doctorId"
      };
    }
  }
  
  module.exports = Doctor;
  