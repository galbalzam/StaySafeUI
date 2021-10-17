import React, { useEffect, useReducer, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { sendOfferToStorage } from "../../Services/offers.service";
import "./HostingSuggestion.css";

const HostingSuggestion = () => {
  const initialState = {
    fullName: "",
    address: "",
    phoneNumber: "",
    notes: "",
  };

  const [fullName, setFullName] = useState(initialState.fullName);
  const [address, setAddress] = useState(initialState.address);
  const [phoneNumber, setPhoneNumber] = useState(initialState.phoneNumber);
  const [notes, setNotes] = useState(initialState.notes);

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_FULL_NAME":
        return {
          ...state,
          fullName: action.payload,
        };

      case "ADD_ADDRESS":
        return {
          ...state,
          address: action.payload,
        };

      case "ADD_PHONE_NUMBER":
        return {
          ...state,
          phoneNumber: action.payload,
        };

      case "ADD_NOTES":
        return {
          ...state,
          notes: action.payload,
        };

      default:
        return {
          ...state,
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const sendOfferDataToServer = async () => {
    await sendOfferToStorage(state);
  };

  return (
    <div className="hosting-suggestion-section">
      <div className="button-group">
        <h1>הצעת אירוח</h1>
        <div className="button-input-section">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch({ type: "ADD_FULL_NAME", payload: fullName });
            }}
          >
            שם מארח
          </Button>
          <TextField
            onChange={(event) => setFullName(event.target.value)}
            required
            variant="outlined"
            className="input-field"
            label="הכנס שם"
            value={fullName}
          />
        </div>

        <div className="button-input-section">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch({ type: "ADD_ADDRESS", payload: address });
            }}
          >
            הכנס כתובת
          </Button>
          <TextField
            onChange={(event) => setAddress(event.target.value)}
            required
            variant="outlined"
            className="input-field"
            label="הכנס כתובת"
            value={address}
          />
        </div>

        <div className="button-input-section">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch({ type: "ADD_PHONE_NUMBER", payload: phoneNumber });
            }}
          >
            הכנס טלפון
          </Button>
          <TextField
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
            variant="outlined"
            className="input-field"
            label="הכנס טלפון"
            value={phoneNumber}
          />
        </div>

        <div className="button-input-section">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch({ type: "ADD_NOTES", payload: notes });
            }}
          >
            הכנס הערות
          </Button>
          <TextField
            onChange={(event) => setNotes(event.target.value)}
            required
            variant="outlined"
            className="input-field"
            label="הכנס הערות"
            value={notes}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={sendOfferDataToServer}
        >
          פרסום הצעה
        </Button>
      </div>
    </div>
  );
};

export default HostingSuggestion;
