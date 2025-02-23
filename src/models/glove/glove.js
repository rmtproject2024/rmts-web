class Glove {
    constructor({ gloveId,LastClabrated, lastSynced,lastUpdated,model,productionDate,status,version,patientID }) {
        this.gloveId = gloveId;
        this.LastClabrated = LastClabrated;
        this.lastSynced = lastSynced;
        this.lastUpdated = lastUpdated;
        this.patientID = patientID;
        this.model= model;
        this.productionDate = productionDate;
        this.status = status;
        this.version = version;

    }

    toFirestore() {
        return {
            lastCalibrated: this.LastClabrated,
            lastSynced: this.lastSynced,
            lastUpdated: this.lastUpdated,
            model: this.model,
            patientId: this.patientID,
            productionDate: this.productionDate,
            status:this.status,
            version: this.version, 
            gloveId: this.gloveId
            
        };
    }
}

module.exports = Glove;
