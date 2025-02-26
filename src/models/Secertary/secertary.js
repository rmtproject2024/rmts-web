class Secertary {
    constructor({ uid, secertary,createdAt,doctorId, role  }) {
        this.uid = secertary;
        this.uid = uid; // Foreign Key (User ID)
        this.doctorId = doctorId; //Foreign Key(Doctor table)
        this.createdAt = createdAt;
        this.role = role;
    }
  
    toFirestore() {
      return {
        uid: this.uid,   // changed nationalID -> nationalId
        doctorId: this.doctorId,        // optional if you want to store "doctorId"
        createdAt: new Date(),
        Role: this.role,
      };
    }
  }
  
  module.exports = Secertary;
  