class Doctor {
    constructor({ uid, patientIds, description, licenseNumber, nationalId }) {
      this.uid = uid; // Foreign Key (User ID)
      this.licenseNumber = licenseNumber;
      this.patientIds = patientIds;
      this.description = description;
      this.nationalId = nationalId;
      this.doctorId = uid; // if you really want a separate "doctorId" field
    }
  
    toFirestore() {
      return {
        uid: this.uid,
        licenseNumber: this.licenseNumber,
        patientIds: this.patientIds,   // changed patientID -> patientIds
        nationalId: this.nationalId,   // changed nationalID -> nationalId
        description: this.description,
        doctorId: this.doctorId        // optional if you want to store "doctorId"
      };
    }
  }
  
  module.exports = Doctor;
  