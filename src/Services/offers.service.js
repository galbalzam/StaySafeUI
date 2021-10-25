import axios from "axios";

import {firebase} from "../FireBase/initFireBase";

export const sendOfferToStorage = async (offerData) => {
  await axios.post("http://localhost:3001/offers/new", offerData);
};

export const getAllOffers = async () => {
  const allOffers = await axios.get("http://localhost:3001/offers/");
  return allOffers;
};

export const AddNewOffer = async(offerData) =>{
  const offersRef = firebase.firestore().collection('Offers');
  await offersRef.add({
    ...offerData
  }).then(res => console.log(res));
}