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
        let type = "N/A"
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