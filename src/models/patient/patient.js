class Patient {
    constructor({ uid, gloveId, doctorId, emergencyContact,prescrptionId }) {
        this.uid = uid; // Foreign Key (User ID)
        this.gloveId = gloveId;
        this.doctorId = doctorId,
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
