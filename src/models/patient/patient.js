class Patient {
    constructor({ patientId,uid,createdat ,gloveId, doctorId, emergencyContact,prescrptionId }) {
        this.uid = patientId;
        this.uid = uid; // Foreign Key (User ID)
        this.gloveId = gloveId;
        this.doctorId = doctorId; //Foreign Key(Doctor table)
        this.emergencyContact = emergencyContact;
        this.prescrptionId = prescrptionId;
        this.createdat = createdat; 
    }

    toFirestore() {
        return {
            uid: this.uid, 
            gloveId: this.gloveId,
            doctorId: this.doctorId,
            emergencyContact: this.emergencyContact,
            prescrptionId: this.prescrptionId,
            createdat: new Date()
        };
    }
}

module.exports = Patient;
