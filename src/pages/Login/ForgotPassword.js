import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ResetPassword } from '../../Services/auth.service'
import { notifyError, notifySuccess } from '../../tostify/toastifyAletrts';


export default function ForgotPassword() {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async (didAccept) => {
        if (didAccept) {
            const [success, message] = await ResetPassword(email)
            if (!success) {
                notifyError(message)
            } else {
                notifySuccess("we have sent confirmation mail, please check your email")
            }
        }
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleClickOpen}>
                forgot your password?
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reset password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your email if you want to reset your password, then press confirm to reset it.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)}>Cancel</Button>
                    <Button onClick={() => handleClose(true)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
