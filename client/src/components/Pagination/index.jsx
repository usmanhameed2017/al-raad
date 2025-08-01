import React from 'react';
import { Pagination } from 'react-bootstrap';

function ServerSidePagination({ data, setCurrentPage }) 
{
    return (
        <Pagination>

            {/* Previous Button */}
            <Pagination.First 
            onClick={ () => setCurrentPage(data?.prevPage) } 
            disabled={ data?.prevPage === null } />

            {/* Button Numbers */}
            {
                Array.from({ length:data?.totalPages }, (_, index) => (
                    <Pagination.Item 
                    key={ index } 
                    onClick={ () => setCurrentPage(index + 1) } 
                    active={ index + 1 == data?.page } > 
                        { index + 1 } 
                    </Pagination.Item>
                ))
            }
            
            {/* <Pagination.Ellipsis /> */}

            {/* Next Button */}
            <Pagination.Last
            onClick={ () => setCurrentPage(data?.nextPage) }
            disabled={ data?.nextPage === null } />
            
        </Pagination>
    );
}

export default React.memo(ServerSidePagination);