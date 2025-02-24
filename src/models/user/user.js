class User {
    constructor({ uid, fullName, age, nationality, birthDate, gender, email, phonenumber, role, verfied }) {
        this.uid = uid;
        this.fullName = fullName;
        this.age = age;
        this.nationality = nationality;
        this.birthDate = birthDate;
        this.gender = gender;
        this.role = role; // Could be "patient", "doctor", etc.
        this.email = email,
        this.phonenumber = phonenumber,
        this.verfied = verfied
    }

    toFirestore() {
        return {
            fullName: this.fullName,
            age: this.age,
            nationality: this.nationality,
            birthDate: this.birthDate,
            gender: this.gender,
            role: this.role,
            phonenumber: this.phonenumber,
            verifed: this.verfied,
            email: this.email,
            createdAt: new Date().getUTCDate()
        };
    }
}

module.exports = User;
