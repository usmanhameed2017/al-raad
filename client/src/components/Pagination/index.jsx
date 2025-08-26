import React from "react";
import { Pagination } from "react-bootstrap";
import "./style.css";

function ServerSidePagination({ data, setCurrentPage }) 
{
    const { totalPages, page, prevPage, nextPage } = data || {};

    const renderPageNumbers = () => {
        let items = [];

        if(totalPages <= 4) 
        {
            for (let i = 1; i <= totalPages; i++) 
            {
                items.push( <Pagination.Item key={i} active={i === page} onClick={() => setCurrentPage(i)}> { i } </Pagination.Item> );
            }
            return items;
        }

        // Always show first page
        items.push( <Pagination.Item key={1} active={page === 1} onClick={() => setCurrentPage(1)}> 1 </Pagination.Item> );

        // Start ellipsis
        if(page > 3) items.push( <Pagination.Ellipsis key="start-ellipsis" disabled /> );

        // Middle section
        let middlePages = [];

        if (page <= 3) {
        // Start of list
        middlePages = [2, 3, 4];
        } 
        else if(page >= totalPages - 2) 
        {
            // End of list → show last 3 before totalPages
            middlePages = [totalPages - 3, totalPages - 2, totalPages - 1];
        }
        else 
        {
            // Middle area
            middlePages = [page - 1, page, page + 1];
        }

        middlePages.forEach((p) => {
            if(p > 1 && p < totalPages) items.push(<Pagination.Item key={p} active={p === page} onClick={() => setCurrentPage(p)}> { p } </Pagination.Item>);
        });

        // End ellipsis
        if(page < totalPages - 2) items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
        
        // Always show last page
        items.push(<Pagination.Item key={`${page}-${Date.now()}`} active={page === totalPages} onClick={() => setCurrentPage(totalPages)}> { totalPages } </Pagination.Item>);
        return items;
    };

    return (
        <Pagination>
            <Pagination.First onClick={() => setCurrentPage(prevPage)} disabled={!prevPage} />
                { renderPageNumbers() }
            <Pagination.Last onClick={() => setCurrentPage(nextPage)} disabled={!nextPage} />
        </Pagination>
    );
}

export default React.memo(ServerSidePagination);