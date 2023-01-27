import dayjs from 'dayjs';

// Collection Date (Participants + Collection Page)

export const handleCollectionDate = (inputValue) => {
    let dateFormat = dayjs(`${inputValue} T00:00:00`);
    let collectionDate = Intl.DateTimeFormat('en-GB', {  month: "short", day: "numeric", year: "numeric" }).format(dateFormat);

    return collectionDate
};

// Collection Date (Email Modal)

export const handleCollectionDateEmail = (inputValue) => {
    let dateFormat = dayjs(`${inputValue} T00:00:00`);
    let numDate = Intl.DateTimeFormat('en-GB', { day: "numeric" }).format(dateFormat); 

    if (numDate === "1" | numDate === "21" | numDate === "31") { 
        let collectionDay = Intl.DateTimeFormat('en-GB', { weekday: 'long', day: "numeric" }).format(dateFormat);
        let collectionMonth = Intl.DateTimeFormat('en-GB', { month: "long" }).format(dateFormat);

        let collectionDate = `${collectionDay}st ${collectionMonth}`

        return collectionDate
    } else if (numDate === "2" | numDate === "22") {
        let collectionDay = Intl.DateTimeFormat('en-GB', { weekday: 'long', day: "numeric" }).format(dateFormat);
        let collectionMonth = Intl.DateTimeFormat('en-GB', { month: "long" }).format(dateFormat);

        let collectionDate = `${collectionDay}nd ${collectionMonth}`

        return collectionDate
    } else if (numDate === "3" | numDate === "23") {
        let collectionDay = Intl.DateTimeFormat('en-GB', { weekday: 'long', day: "numeric" }).format(dateFormat);
        let collectionMonth = Intl.DateTimeFormat('en-GB', { month: "long" }).format(dateFormat);

        let collectionDate = `${collectionDay}rd ${collectionMonth}`

        return collectionDate
    } else {
        let collectionDay = Intl.DateTimeFormat('en-GB', { weekday: 'long', day: "numeric" }).format(dateFormat);
        let collectionMonth = Intl.DateTimeFormat('en-GB', { month: "long" }).format(dateFormat);

        let collectionDate = `${collectionDay}th ${collectionMonth}`

        return collectionDate
    }
};