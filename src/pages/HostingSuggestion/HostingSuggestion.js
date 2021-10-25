import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import RemoveIcon from '@material-ui/icons/Remove';
import "./HostingSuggestion.css";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { notifyError, notifySuccess } from '../../tostify/toastifyAletrts';
import {AddNewOffer} from '../../Services/offers.service';
import { useHistory } from "react-router";


const AddHostingOffer = () => {
const [hospitalityAmount, setHospitalityAmount] = useState(0)
const [hospitalityNote, setHospitalityNote] = useState("")
const [loading, setLoading] = useState(false)
const startLoader = () =>{
  setLoading(true)
}
const userData = useSelector(state => state.userData)
const history = useHistory()

  const sendOfferDataToServer = async () => {
    if(hospitalityAmount <= 0){
      return notifyError('you must have at least 1 hospitality spot available')
    }
    const offerData = {
      NamedNodeMap : `${userData.firstName} ${userData.lastName}`,
      city : `${userData.city}`,
      street : `${userData.street}`,
      offerNote : hospitalityNote.length === 0 ? "no notes" : hospitalityNote,
      hospitalityAmount : `${hospitalityAmount}`,
      email : userData.email,
      phone: userData.phone
    }
    try{
      await AddNewOffer(offerData);
      notifySuccess('we have added your offer succesfully')
      history.push('/')
    }
    catch(e){
     console.log(e) 
    }   
  };

  return (
    <div className="hosting-suggestion-section">
      <div className="button-group">
      <div className="hospitality-section">
        <Typography variant="h5">Hospitality Amount</Typography>
      <Fab color="primary" aria-label="add" onClick={() => setHospitalityAmount(prev => ++prev)}>
  <AddIcon />
</Fab>
<label>{hospitalityAmount}</label>
<Fab color="primary" aria-label="remove" onClick={() => setHospitalityAmount(prev =>{
  if(prev <=0 ){
    return prev
  }else{
    return --prev
  }})}>
  <RemoveIcon />
</Fab>
      </div>
      <TextField id="filled-basic" label="Add Note" variant="filled"
       onChange={(event) => {
         setHospitalityNote(event.target.value)
       }} 
       style={{marginBottom: '2rem'}}/>
      <LoadingButton loading={loading} variant="contained" onClick={() => {
        startLoader()
        sendOfferDataToServer()
      }}>Add Hospitality Offer!</LoadingButton>
      </div>
    </div>
  );
};

export default AddHostingOffer;
