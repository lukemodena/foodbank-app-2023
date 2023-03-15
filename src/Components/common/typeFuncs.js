// Collection Type

export const handleCollectionType = (inputValue) => {
    let collectionType = inputValue;

    if (collectionType === "1") {
        let type = "Monthly"
        return type
    } else if (collectionType === "3") {
        let type = "3 Months"
        return type
    }
};

// Participant Type

export const handleParticipantType = (inputValue) => {
    let participantType = inputValue;

    if (participantType === "0") {
        let type = "Query"
        return type
    } else if (participantType === "1") {
        let type = "Drop-Off"
        return type
    } else if (participantType === "2") {
        let type = "Collection"
        return type
    } else if (participantType === "3") {
        let type = "Cash Donation"
        return type
    } else if (participantType === "4") {
        let type = "Online Order"
        return type
    } else {
        let type = "N/A"
        return type
    }
};

// Donor Volunteer Handler

export const handleDonorVolunteer = (inputValue) => {
    let volunteerVal = inputValue;

    if (volunteerVal === "v") {
        let volunteer = true;
        return volunteer
    } else if (volunteerVal === "") {
        let volunteer = false;
        return volunteer
    } else if (volunteerVal === true) {
        let volunteer = "v";
        return volunteer
    } else if (volunteerVal === false) {
        let volunteer = "";
        return volunteer
    }
};


// Donor Type

export const handleDonorType = (inputValue, volunteerValue) => {
    let donorType = `${inputValue}${handleDonorVolunteer(volunteerValue)}`;

    if (donorType === "1") {
        let type = "Monthly (Both)";
        return type
    } else if (donorType === "3") {
        let type = "3 Months";
        return type
    } else if (donorType === "0") {
        let type = "Other";
        return type
    } else if (donorType === "1v") {
        let type = "Monthly/Both (+ Volunteer)";
        return type
    } else if (donorType === "3v") {
        let type = "3 Months (+ Volunteer)";
        return type
    }
};

// Drop-Off Time Type

export const handleDropOffTime = (inputValue) => {
    let time = inputValue;

    if (time === "1") {
        let type = "07:00-08:00";
        return type
    } else if (time === "1.5") {
        let type = "07:30-08:30";
        return type
    } else if (time === "2") {
        let type = "08:00-09:00";
        return type
    } else if (time === "2.5") {
        let type = "08:30-09:30";
        return type
    } else if (time === "3") {
        let type = "09:00-10:00";
        return type
    } else if (time === "3.5") {
        let type = "09:30-10:30";
        return type
    } else if (time === "4") {
        let type = "10:00-11:00";
        return type
    } else if (time === "4.5") {
        let type = "10:30-11:30";
        return type
    } else if (time === "5") {
        let type = "11:00-12:00";
        return type
    } else if (time === "5.5") {
        let type = "11:30-12:30";
        return type
    } else if (time === "6") {
        let type = "12:00-13:00";
        return type
    } else if (time === "6.5") {
        let type = "12:30-13:30";
        return type
    } else if (time === "7") {
        let type = "13:00-14:00";
        return type
    } else if (time === "7.5") {
        let type = "13:30-14:30";
        return type
    } else if (time === "10") {
        let type = "TBC";
        return type
    } else if (time === "0") {
        let type = "Other";
        return type
    } else if (time === "11" | time === "N/A") {
        let type = "N/A";
        return type
    }
};