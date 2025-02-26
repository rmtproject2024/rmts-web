class Doctor {
    constructor({ uid, patientId,createdAt,description, licenseNumber, nationalId }) {
      this.uid = uid; // Foreign Key (User ID)
      this.licenseNumber = licenseNumber;
      this.patientId = patientId;
      this.description = description;
      this.nationalId = nationalId;
      this.doctorId = uid; // if you really want a separate "doctorId" field
      this.createdAt = createdAt;
    }
  
    toFirestore() {
      return {
        uid: this.uid,
        licenseNumber: this.licenseNumber,
        patientId: this.patientId,       // changed patientID -> patientIds
        nationalId: this.nationalId,   // changed nationalID -> nationalId
        description: this.description,
        doctorId: this.doctorId,        // optional if you want to store "doctorId"
        createdAt: new Date(),
      };
    }
  }
  
  module.exports = Doctor;
  