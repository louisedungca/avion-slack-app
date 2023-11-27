import { toast } from "react-toastify";

export const toastDefault = (text) => {
  toast(text, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    className: "toast-default",
  });
};

// Usage: used to call *ERROR* toastify toast with param as message
export const toastError = (text) => {
  toast(text, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    className: "toast-error",
  });
}