// Collection Month Types (for dropdown filter)

export const monthOptions = [
    {
        key: 0,
        type: "All",
        value: "0",
        filter: "All"
    },
    {
        key: 1,
        type: "Monthly",
        value: "1",
        filter: "Monthly Collections"
    },
    {
        key: 2,
        type: "3 Months",
        value: "3",
        filter: "3 Months Collections"
    }
];

// Contact/Donor Types (for dropdown filter)

export const typeOptions = [
    {
        key: 0,
        type: "All",
        value: "",
        filter: "All Contacts"
    },
    {
        key: 1,
        type: "Monthly (Both)",
        value: "1",
        filter: "Monthly Contacts"
    },
    {
        key: 2,
        type: "3 Months",
        value: "3",
        filter: "3 Months Contacts"
    },
    {
        key: 3,
        type: "Other",
        value: "0",
        filter: "Other Contacts"
    }
];

export const participantOptions = [
    {
        key: 0,
        type: "All",
        value: "",
        filter: "All"
    },
    {
        key: 1,
        type: "Drop-Off",
        value: "1",
        filter: "Drop-Off"
    },
    {
        key: 2,
        type: "Collection",
        value: "2",
        filter: "Collection"
    },
    {
        key: 3,
        type: "Cash Donation",
        value: "3",
        filter: "Cash Donation"
    },
    {
        key: 4,
        type: "Online Order",
        value: "4",
        filter: "Online Order"
    }
];

// Participant Payment

export const handleParticipantPayment = (inputValue) => {
    let participantPayment = inputValue;

    if (participantPayment === "true") {
        let recieved = "Yes"
        return recieved
    } else if (participantPayment === "false") {
        let recieved = "No"
        return recieved
    } else {
        let recieved = "N/A"
        return recieved
    }
};