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

// Collection Type Dropdown Placeholder

export const collectionTypeSelection = (inputValue) => {
    let size = parseInt(inputValue)

    if (size > 760) {
        let collectionDate = "Select Collection";
        return collectionDate
    } else {
        let collectionDate = "Select Type";
        return collectionDate
    }
};


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

// Participant Types (for dropdown filter)

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

// Participation Date Dropdown Placeholder

export const collectionDateSelection = (inputValue) => {
    let size = parseInt(inputValue)

    if (size > 760) {
        let collectionDate = "Select Collection";
        return collectionDate
    } else {
        let collectionDate = "Select Date";
        return collectionDate
    }
};

// Participant Payment

export const handleParticipantPayment = (inputValue) => {
    let participantPayment = inputValue;

    if (participantPayment === "true" | participantPayment === true) {
        let recieved = "Yes";
        return recieved
    } else if (participantPayment === "false" | participantPayment === false) {
        let recieved = "No";
        return recieved
    } else {
        let recieved = "N/A";
        return recieved
    }
};

// Contact Address Handlers

export const addressHandler = (add2, add3) => {
    if (add2 === null | add2 === "") {
        if (add3 === null | add3 === "") {
            let address = "";
            return address
        } else {
            let address = add3;
            return address
        }
    } else {
        if (add3 === null | add3 === "") {
            let address = add2;
            return address
        } else {
            let address = `${add2},\n${add3}`;
            return address
        }
    }
};

export const fullAddressHandler = (add1, add2, add3, postcode) => {
    if (add1 === null | add1 === "") {
        let address1 = addressHandler(add2, add3);
        if (postcode === null | postcode === "") {
            return address1
        } else {
            if (address1 === null | address1 === "") {
                let address = postcode;
                return address
            } else {
                let fulladdress = `${address1},\n${postcode}`;
                return fulladdress
            }
        }
    } else {
        let address1 = add1
        let address2 = addressHandler(add2, add3)

        if (address2 === null | address2 === "") {
            let address = address1;
            if (postcode === null | postcode === "") {
                return address
            } else {
                let fulladdress = `${address},\n${postcode}`;
                return fulladdress
            }
        } else {
            let address = `${address1},\n${address2}`;
            if (postcode === null | postcode === "") {
                return address
            } else {
                let fulladdress = `${address},\n${postcode}`;
                return fulladdress
            }
        }
    }
};