import { useEffect, useState } from 'react';
import { getRequest } from '../../../api/request';
import ReactDataTable from '../../../components/DataTable';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/auth';
import Animation from '../../../components/Animation';

function Books() 
{
    // States
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10); // Records per page
    const [data, setData] = useState({ docs: [], totalDocs: 0, pagingCounter: 1 });
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Global state loader
    const { setLoading } = useAuth();
    
    // Debounce technique
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]); 
    
    // Fetch data on page load and on search
    useEffect(() => {
        setLoading(true);
        getRequest(`/book?page=${currentPage}&limit=${limit}&search=${debouncedSearch}`)
        .then((response) => setData(response.data))
        .catch(error => console.log("Error:", error.message))
        .finally(() => setLoading(false));
    }, [currentPage, limit, debouncedSearch]);

    // Columns
    const columns = [
        { name: "SR.NO", cell: (row, index) => (data?.pagingCounter || 0) + index, sortable: true, width: "120px" },
        { name: "Title", selector: row => row.title, sortable: true },
        { name: "Description", selector: row => row.description?.substring(0,50) || "", wrap:true },
        { 
            name: "PDFs",
            margin:10,
            cell: row => row.pdf ? ( 
                <a href={row.pdf} download className="py-2"> 
                    <Button> Download </Button>
                </a> 
            )
            : 
            "No PDF",
            ignoreRowClick: true,
            button: true,
            width: "150px"
        }
    ];  

    return (
        <>
            <Animation type="table">
                <ReactDataTable 
                title={`Books`} 
                columns={columns} 
                data={data} 
                setCurrentPage={setCurrentPage}
                search={search}
                setSearch={setSearch}
                limit={limit}
                setLimit={setLimit}
                />
            </Animation>
        </>
    );
}

export default Books;