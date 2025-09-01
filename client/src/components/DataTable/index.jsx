import DataTable, { createTheme } from "react-data-table-component";
import styles from "./style.module.css";
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

    // Custom datatable style
    const customStyles = {
        cells: {
            style: { paddingTop: "12px", paddingBottom: "12px" }
        }
    };

    // Extract global state loader
    // const { isLoading } = useAuth();

    return (
        <>
            {/* Search Field */}
            <div className="row">
                <div className="col-xl-2 offset-xl-10 col-lg-4 offset-lg-8 col-md-6 offset-md-6 col-sm-8 offset-sm-4 col-xs-12">
                    <input type="search" placeholder="Search" className={`form-control ${styles.input}`}
                    value={search} onChange={ (e) => setSearch(e.target.value) } />
                </div>
            </div>

            {/* Data Table */}
            <div className="row mt-3">
                <div className="col-md-12">
                    <div style={{ background: "#0e0f16", padding: 12, borderRadius: 12, overflowX: "auto", maxWidth: "100%" }}>
                        <DataTable
                        title={title}
                        theme="alRaad"
                        customStyles={customStyles}
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