import { toast } from 'react-toastify';

export const notifySuccess = (message) => toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
});

export const notifyError = (message) => toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
});
