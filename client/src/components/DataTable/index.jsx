import DataTable, { createTheme } from "react-data-table-component";
import { useAuth } from "../../context/auth";

function ReactDataTable({ title, columns, data, setCurrentPage, search, setSearch, limit, setLimit }) 
{
    // Data table theme
    createTheme("alRaad", {
        text: { primary: "#e5e7eb", secondary: "#cbd5e1" },
        background: { default: "#0e0f16" },
        context: { background: "#0dcdbc", text: "#0e0f16" },
        divider: { default: "rgba(13,205,188,0.20)" },
        action: { button: "rgba(13,205,188,0.9)", hover: "rgba(13,205,188,0.08)", disabled: "rgba(255,255,255,0.3)" },
    }, "dark"); 

    const { isLoading } = useAuth();

    return (
        <>
            {/* Search Field */}
            <div className="row">
                <div className="col-md-2 offset-10">
                    <input type="search" placeholder="Search" className="form-control"
                    value={search} onChange={ (e) => setSearch(e.target.value) } />
                </div>
            </div>

            {/* Data Table */}
            <div className="row mt-2">
                <div className="col-md-12">
                    <div style={{ background: "#0e0f16", padding: 12, borderRadius: 12, overflowX: "auto", maxWidth: "100%" }}>
                        <DataTable
                        title={title}
                        theme="alRaad"
                        columns={columns}
                        data={data?.docs}
                        pagination
                        paginationServer
                        paginationPerPage={limit}
                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                        paginationTotalRows={data?.totalDocs || 0}
                        paginationDefaultPage={data?.page || 1}
                        onChangePage={ (page) => setCurrentPage(page) }
                        onChangeRowsPerPage={ (rows) => setLimit(rows) }
                        // progressPending={isLoading}          
                        highlightOnHover
                        striped 
                        persistTableHead
                        />
                    </div>                    
                </div>
            </div>            
        </>
    );
}

export default ReactDataTable;