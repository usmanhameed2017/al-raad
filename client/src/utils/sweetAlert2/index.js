import swal from "sweetalert2";
import "./style.css";

export const confirmAlert = (title, text, fn) => {
    swal.fire({
        title: title,
        text: text,
        icon: "question",
        showCloseButton:true,
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        allowOutsideClick:false
    })
    .then((result) => {
        if(result.isConfirmed) fn();
    });
};