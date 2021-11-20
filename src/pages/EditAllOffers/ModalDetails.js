import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import {UpdateOffer, deleteOffer} from '../../Services/offers.service'
const style = {
    position: 'absolute',
    borderRadius: '1rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ModalDetails = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { offer } = props;
    const onOfferFieldEdit = (field, event, index = false) => {
        if (index) {
            offer[field][index] = event.target.value;
        } else {
            offer[field] = event.target.value;
        }
    }
    const submitChanges = () => { 
        UpdateOffer(offer);

    }
    const deleteOfferFromDb = () => { 
        deleteOffer(offer.email);
    }
    return (
        <>
            <Button onClick={handleOpen}>לחץ לעריכת הצעה</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TableContainer component={Paper} sx={{ direction: 'rtl' }}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">שם שדה</TableCell>
                                    <TableCell align="right">ערך</TableCell>
                                    <TableCell align="right">עריכת שדה</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(offer).map((key, index) => {
                                    if (key === 'doesNeedHelp' || key === 'id') {
                                        return null;
                                    }
                                    if (key === 'offerHelpNote') {
                                        return Object.values(offer[key]).map((value, index) => {
                                            return (
                                                <TableRow
                                                    key={value}
                                                >
                                                    <TableCell align="right" component="th" scope="row">
                                                        {key} - number {index + 1}
                                                    </TableCell>
                                                    <TableCell align="right">{value}</TableCell>
                                                    <TableCell align="right" >
                                                        <TextField onChange={(event) => onOfferFieldEdit(key, event, index + 1)} label={`ערוך שדה ${key}`} variant="standard" />
                                                    </TableCell>
                                                </TableRow>)
                                        })
                                    }
                                    return (
                                        <TableRow
                                            key={key}
                                        >
                                            <TableCell align="right" component="th" scope="row">
                                                {key}
                                            </TableCell>
                                            <TableCell align="right">{typeof (offer[key]) === 'object' ? null : offer[key]}</TableCell>
                                            <TableCell align="right" >
                                                <TextField onChange={(event) => onOfferFieldEdit(key, event)} label={`ערוך שדה ${key}`} variant="standard" />
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <Button variant="contained" color="error" onClick={() => deleteOfferFromDb()}>מחק מודעה </Button>
                        <Button variant="contained" color="info" onClick={() => window.location.reload()} >בטל שינויים</Button>
                        <Button variant="contained" color="success" onClick={() => submitChanges()}>שמור עריכה</Button>
                    </Box>

                </Box>
            </Modal>
        </>
    )
}

export default ModalDetails
