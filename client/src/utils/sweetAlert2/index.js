import swal from "sweetalert2";
import "./style.css";

export const sweetAlert = (title, text, mode = "success", confirmButtonText = "OK", cancelButtonText = "Cancel", fn) => {
    // Success
    if(mode === "success")
    {
        return (
            swal.fire({
                title: title,
                text: text,
                icon: "success",
                showCloseButton:true,
                showCancelButton: true,
                confirmButtonText: confirmButtonText || "OK",
                cancelButtonText: cancelButtonText || "Cancel",
                allowOutsideClick:false
            })            
        );
    }

    // Confirm
    if(mode === "confirm")
    {
        return(
            swal.fire({
                title: title,
                text: text,
                icon: "question",
                showCloseButton:true,
                showCancelButton: true,
                confirmButtonText: confirmButtonText || "Yes",
                cancelButtonText: cancelButtonText || "Cancel",
                allowOutsideClick:false
            })
            .then(async (result) => {
                if(result.isConfirmed) await fn();
            })
        );
    }

};