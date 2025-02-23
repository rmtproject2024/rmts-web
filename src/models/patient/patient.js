class Patient {
    constructor({ patientId,uid, gloveId, doctorId, emergencyContact,prescrptionId }) {
        this.patientId = patientId;
        this.uid = uid; // Foreign Key (User ID)
        this.gloveId = gloveId;
        this.doctorId = doctorId, //Foreign Key(Doctor table)
        this.emergencyContact = emergencyContact,
        this.prescrptionId = prescrptionId 
    }

    toFirestore() {
        return {
            uid: this.uid, 
            gloveId: this.gloveId,
            doctorId: this.doctorId,
            emergencyContact: this.emergencyContact,
            prescrptionId: this.prescrptionId,
        };
    }
}

module.exports = Patient;
