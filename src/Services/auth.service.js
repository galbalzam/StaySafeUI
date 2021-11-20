import axios from "axios";
import { firebase } from "../FireBase/initFireBase";

export const login = async (username, password) => {
  await axios.post("http://localhost:3001/auth/login", { username, password });
};

export const register = async (
  username,
  password,
  firstName,
  lastName,
  phoneNumber
) => {
  await axios.post("http://localhost:3001/auth/register", {
    username,
    password,
    firstName,
    lastName,
    phoneNumber,
  });
};


export const FireStoreLogin = async (email, password) => {
  try {
    const userDocRef = firebase.firestore().collection('users')
    const res = await firebase.auth().signInWithEmailAndPassword(email, password.toString())
    let userData;
    if (res) {
      const querySnapshot = await userDocRef.where("email", "==", email).get()
      querySnapshot.forEach(doc => {
        const tempUserData = doc.data();
        userData = tempUserData
        if (userData.isAdmin === undefined) {
          userData.isAdmin = true;
          userDocRef.doc(doc.id).update({ isAdmin: true })
        }
      })
      
      return userData
    }
    else {
      throw new Error('User is not registered');  //
    }
  } catch (err) {
    console.log(err)
  }
}
export const ResetPassword = async (email) => {
  try {
    const res = await firebase.auth().sendPasswordResetEmail(email)
    return [true, res]
  } catch (e) {
    return [false, e.message]
  }
}