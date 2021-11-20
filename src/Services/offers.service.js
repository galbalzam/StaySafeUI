import axios from "axios";
import { firebase } from "../FireBase/initFireBase";

const offersRef = firebase.firestore().collection('Offers');

export const sendOfferToStorage = async (offerData) => {
  await axios.post("http://localhost:3001/offers/new", offerData);
};
export const deleteOffer = async (userEmail) => {
  const querySnapshot = await offersRef.where('email', "==", userEmail).get();
  querySnapshot.forEach(doc => {
    doc.ref.delete();
  })
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
export const GetOfferByEmail = async (userEmail) => {
  const myOffer = [];
  const querySnapshot = await offersRef.where('email', "==", userEmail).get();
  querySnapshot.forEach(doc => {
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
    offers.push({ id: item.id, ...item.data() })
  })
  const newOffersArray = offers.map(offer => {
    const timeDiffrance = new Date().getTime() - new Date(offer.createdAt).getTime();
    const days = Math.floor(timeDiffrance / (1000 * 60 * 60 * 24));
    if (days > 31) {
      deleteOffer(offer.email);
      return;
    }
    return offer
  })
  return newOffersArray;
}
export const UpdateOffer = async (offerData) => {
  await offersRef.doc(offerData.id).update({
    ...offerData
  }).then(res => console.log(res));
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
