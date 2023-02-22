import React from 'react';
import { Pagination } from 'react-bootstrap';


export function PaginationFooter(props) {
    const {
        data,
        monthValue,
        searchValue,
        typeValue,
        collectionID,
        startDate,
        endDate,
        pageStatus,
        currentPage,
        setPage,
        page,
        setLoading,
        searchDonors,
        searchCollections,
        getParticipantList,
        has_previous,
        has_next,
        total_number
    } = props

    // Handle Page

    const handlePage = (inputVal) => {

        let prevPage = currentPage;
        let newpage = `${parseInt(prevPage)+parseInt(inputVal)}`;
        setLoading(true);

        setPage(newpage);
        if (data === "don") {
            searchDonors(newpage, monthValue, searchValue).then(() => setLoading(false));
        } else if (data === "coll") {
            searchCollections(newpage, monthValue, startDate, endDate, pageStatus).then(() => setLoading(false));
        } else if (data === "par") {
            getParticipantList(newpage, collectionID, searchValue, typeValue).then(() => setLoading(false));
        }
        
    }

    // Handle Last Page

    const handleLastPage = (inputValue) => {
        let newpage = inputValue;
        setLoading(true);

        setPage(newpage);
        if (data === "don") {
            searchDonors(newpage, monthValue, searchValue).then(() => setLoading(false));
        } else if (data === "coll") {
            searchCollections(newpage, monthValue, startDate, endDate, pageStatus).then(() => setLoading(false));
        } else if (data === "par") {
            getParticipantList(newpage, collectionID, searchValue, typeValue).then(() => setLoading(false));
        }
    }

    // Handle First Page

    const handleFirstPage = (inputValue) => {
    
            let newpage = inputValue;
            setLoading(true);

            setPage(newpage);
            if (data === "don") {
                searchDonors(newpage, monthValue, searchValue).then(() => setLoading(false));
            } else if (data === "coll") {
                searchCollections(newpage, monthValue, startDate, endDate, pageStatus).then(() => setLoading(false));
            } else if (data === "par") {
                getParticipantList(newpage, collectionID, searchValue, typeValue).then(() => setLoading(false));
            }
    }

    return (
        <div>
            <Pagination style={{justifyContent:"center"}}>
                {(page != "1") &&<Pagination.First onClick={e => handleFirstPage("1")}/>}
                {(has_previous) &&<Pagination.Prev onClick={e => handlePage("-1")}/>}
                <Pagination.Item active>
                    {page}
                </Pagination.Item>
                {(has_next) &&<Pagination.Next onClick={e => handlePage("1")}/>}
                {(page != total_number) &&<Pagination.Last onClick={e => handleLastPage(total_number)}/>}
            </Pagination>
            <div style={{justifyContent:"center", textAlign:"center"}}><strong>{page} of {total_number}</strong></div>
        </div>
    )
}