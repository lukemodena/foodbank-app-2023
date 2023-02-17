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

// Donor Type

export const handleDonorType = (inputValue) => {
    let donorType = inputValue;

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
    } else if (time === "2") {
        let type = "08:00-09:00";
        return type
    } else if (time === "3") {
        let type = "09:00-10:00";
        return type
    } else if (time === "4") {
        let type = "10:00-11:00";
        return type
    } else if (time === "5") {
        let type = "11:00-12:00";
        return type
    } else if (time === "6") {
        let type = "12:00-13:00";
        return type
    } else if (time === "7") {
        let type = "13:00-14:00";
        return type
    } else if (time === "8") {
        let type = "14:00-15:00";
        return type
    } else if (time === "9") {
        let type = "15:00-16:00";
        return type
    } else if (time === "10") {
        let type = "16:00-17:00";
        return type
    } else if (time === "0") {
        let type = "Other";
        return type
    } else if (time === "11" | time === "N/A") {
        let type = "N/A";
        return type
    }
};