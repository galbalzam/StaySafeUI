import axios from "axios";

export const sendOfferToStorage = async (offerData) => {
  await axios.post("http://localhost:3001/offers/new", offerData);
};

export const getAllOffers = async () => {
  const allOffers = await axios.get("http://localhost:3001/offers/");
  return allOffers;
};
