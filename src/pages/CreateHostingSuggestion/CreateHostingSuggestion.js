import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import RemoveIcon from '@material-ui/icons/Remove';
import "./CreateHostingSuggestion.css";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { notifyError, notifySuccess } from '../../tostify/toastifyAletrts';
import { AddNewOffer } from '../../Services/offers.service';
import { useHistory } from "react-router";
import { GetMyOffer } from '../../Services/offers.service'
import { useQuery } from "react-query";
const CreateHostingSuggestion = () => {
  const [hospitalityAmount, setHospitalityAmount] = useState(0)
  const [hospitalityNote, setHospitalityNote] = useState("")
  const [loading, setLoading] = useState(false)
  const startLoader = () => {
    setLoading(true)
  }
const [myOffer, setMyOffer] = useState(false)
  const userData = useSelector(state => state.userData)
  const history = useHistory()
  const myOfferQuery = useQuery('myOffer', () => GetMyOffer(userData.email), {
    onSuccess: (data) => {
      if(data.length === 0){
        setMyOffer(false)
      }
      else{
        setMyOffer(true)
      }
    }
})

  const sendOfferDataToServer = async () => {
    if (hospitalityAmount <= 0) {
      return notifyError('you must have at least 1 hospitality spot available')
    }
    const offerData = {
      FullName: `${userData.firstName} ${userData.lastName}`,
      city: `${userData.city}`,
      street: `${userData.street}`,
      offerNote: hospitalityNote.length === 0 ? "no notes" : hospitalityNote,
      hospitalityAmount: `${hospitalityAmount}`,
      email: userData.email,
      phone: userData.phone
    }
    try {
      await AddNewOffer(offerData);
      notifySuccess('we have added your offer succesfully')
      history.push('/')
    }
    catch (e) {
      notifyError('the offer was not processed by the server, please try again later')
      console.log(e)
    }
  };

  return (
    <div className="hosting-suggestion-section">
      <div className="button-group">
        {myOffer ? 
          (<p>You already offered your house</p>)
          : 
          (
            <>
              <div className="hospitality-section">
                <Typography variant="h5">Hospitality Amount</Typography>
                <Fab color="primary" aria-label="add" onClick={() => setHospitalityAmount(prev => ++prev)}>
                  <AddIcon />
                </Fab>
                <label>{hospitalityAmount}</label>
                <Fab color="primary" aria-label="remove" onClick={() => setHospitalityAmount(prev => {
                  if (prev <= 0) {
                    return prev
                  } else {
                    return --prev
                  }
                })}>
                  <RemoveIcon />
                </Fab>
              </div>
              <TextField id="filled-basic" label="Add Note" variant="filled"
                onChange={(event) => {
                  setHospitalityNote(event.target.value)
                }}
                style={{ marginBottom: '2rem' }} />
              <LoadingButton loading={loading} variant="contained" onClick={() => {
                startLoader()
                sendOfferDataToServer()
              }}>Add Hospitality Offer!</LoadingButton>
            </>)
        }
      </div>
    </div>
  );
};

export default CreateHostingSuggestion;
