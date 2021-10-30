import axios from "axios";
import { firebase } from "../FireBase/initFireBase";

const offersRef = firebase.firestore().collection('Offers');

export const sendOfferToStorage = async (offerData) => {
  await axios.post("http://localhost:3001/offers/new", offerData);
};
export const deleteOffer = async(userEmail) =>{
  console.log("delete object")
  const querySnapshot = await offersRef.where('email', "==", userEmail).get();
  querySnapshot.forEach(doc =>{
    doc.ref.delete();
  })
}
export const GetMyOffer = async(userEmail) =>{
  const myOffer = [];
  const querySnapshot = await offersRef.where('email', "==", userEmail).get();
  querySnapshot.forEach(doc =>{
    myOffer.push(doc.data());
  })
  return myOffer;
}

export const AddNewOffer = async (offerData) => {
  await offersRef.add({
    ...offerData
  }).then(res => console.log(res));
}

export const GetAllOffers = async () => {
  const offers = [];
  (await offersRef.get()).docs.forEach(item => {
    offers.push(item.data())
  })
  return offers;
}