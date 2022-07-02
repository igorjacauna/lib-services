import * as functions from "firebase-functions";
import {firestore} from "firebase-admin";

const createUser = functions.auth.user().onCreate((user) => {
  const db = firestore();
  const {uid} = user;

  const userCollection = db.collection("users");

  return userCollection.doc(uid).set({});
});

export default {
  createUser,
};
