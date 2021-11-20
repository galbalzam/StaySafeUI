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
        if (userData.isOwner === undefined) {
          userData.isOwner = true;
          userDocRef.doc(doc.id).update({ isOwner: true })
        }
      });
      return userData;
    } else {
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
export const GetAllUsers = async () => {
  try {
    const users = await firebase.firestore().collection('users').get()
    const usersData = users.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    return usersData
  } catch (e) {
    return e.message
  }
}
export const UpdateUser = async (userData) => {
  try {
    const { id } = userData
    delete userData.id;
    const userDocRef = firebase.firestore().collection('users')
    const res = await userDocRef.doc(id).update(userData)
    return [true, res]
  } catch (e) {
    return [false, e.message]
  }
}