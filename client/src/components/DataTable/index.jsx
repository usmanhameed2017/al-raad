import DataTable, { createTheme } from "react-data-table-component";

function ReactDataTable({ title, columns, data, setCurrentPage }) 
{
    // Data table theme
    createTheme("alRaad", {
        text: { primary: "#e5e7eb", secondary: "#cbd5e1" },
        background: { default: "#0e0f16" },
        context: { background: "#0dcdbc", text: "#0e0f16" },
        divider: { default: "rgba(13,205,188,0.20)" },
        action: { button: "rgba(13,205,188,0.9)", hover: "rgba(13,205,188,0.08)", disabled: "rgba(255,255,255,0.3)" },
    }, "dark"); 

    return (
        <div style={{ background: "#0e0f16", padding: 12, borderRadius: 12, overflowX: "auto", maxWidth: "100%" }}>
            <DataTable
            title={title}
            theme="alRaad"
            columns={columns}
            data={data?.docs}
            pagination
            paginationServer
            paginationPerPage={1}
            paginationRowsPerPageOptions={[1, 2, 3]}
            paginationTotalRows={data?.totalDocs || 0}
            paginationDefaultPage={data?.page || 1}
            onChangePage={ (page) => setCurrentPage(page) }
            highlightOnHover
            striped 
            />
        </div>
    );
}

export default ReactDataTable;