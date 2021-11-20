import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import RemoveIcon from '@material-ui/icons/Remove';
import "./CreateHostingSuggestion.css";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { notifyError, notifySuccess } from '../../tostify/toastifyAletrts';
import { AddNewOffer } from '../../Services/offers.service';
import { useHistory } from "react-router";
import { GetOfferByEmail } from '../../Services/offers.service'
import { useQuery } from "react-query";
import range from 'lodash/range';
import CircularProgress from '@mui/material/CircularProgress';
import { format } from 'date-fns';

const CreateHostingSuggestion = () => {
  const [hospitalityAmount, setHospitalityAmount] = useState(0)
  const [hospitalityNote, setHospitalityNote] = useState("")
  const [loading, setLoading] = useState(false)
  const startLoader = () => {
    setLoading(prev => !prev)
  }
  const [offerHelpAmmount, setOfferHelpAmmount] = useState(1)
  const [offerHelpNote, setOfferHelpNote] = useState("")
  const [doesNeedHelp, setDoesNeedHelp] = useState(false)
  const [myOffer, setMyOffer] = useState(true)
  const userData = useSelector(state => state.userData)
  const history = useHistory()
  const myOfferQuery = useQuery('myOffer', () => GetOfferByEmail(userData.email), {
    onSuccess: (data) => {
      if (data.length === 0) {
        setMyOffer(false)
      }
      else {
        setMyOffer(true)
      }
    }
  })

  const sendOfferDataToServer = async () => {
    if (hospitalityAmount <= 0 && doesNeedHelp === false) {
      startLoader()
      return notifyError('you must have at least 1 hospitality spot available OR offer donation')
    }
    const offerData = {
      FullName: `${userData.firstName} ${userData.lastName}`,
      city: `${userData.city}`,
      street: `${userData.street}`,
      offerNote: hospitalityNote.length === 0 ? "no notes" : hospitalityNote,
      hospitalityAmount: `${hospitalityAmount}`,
      email: userData.email,
      phone: userData.phone,
      doesNeedHelp: doesNeedHelp,
      offerHelpNote: offerHelpNote.length === 0 && doesNeedHelp ? "לא" : offerHelpNote,
      createdAt: format(new Date(), 'MM/dd/yyyy'),
    }
    console.log(offerData)
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

  const addNewField = (state) => {
    if (state) {
      setOfferHelpAmmount(prev => prev + 1)
    }
    else {
      setOfferHelpAmmount(prev => {
        if (prev <= 1) {
          return prev
        } else {
          return --prev
        }
      })
    }
  }
  if (myOfferQuery.isLoading) {
    return (
      <div className="hosting-suggestion-section" >
        <div className="button-group" style={{ alignItems: 'center' }}>
          <CircularProgress />
        </div>
      </div>
    )
  }
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
              <FormControlLabel control={<Checkbox onChange={(event) => setDoesNeedHelp(event.target.checked)} value={doesNeedHelp} />} label="can you offer any help?" />
              {
                doesNeedHelp ? (
                  <>
                    <div className="hospitality-section">
                      <Fab color="primary" aria-label="add" onClick={() => addNewField(true)}>
                        <AddIcon />
                      </Fab>
                      <label>{offerHelpAmmount}</label>
                      <Fab color="primary" aria-label="remove" onClick={() => addNewField(false)}>
                        <RemoveIcon />
                      </Fab>
                    </div>
                    {
                      range(offerHelpAmmount).map((item, index) => {
                        return (
                          <TextField id="filled-basic" label="What Help Can You Offer?" variant="filled"
                            onChange={(event) => {
                              setOfferHelpNote({
                                ...offerHelpNote,
                                [index + 1]: event.target.value,
                              })
                            }}
                            style={{ marginBottom: '2rem' }} />
                        )
                      })
                    }
                  </>
                ) : null
              }
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
