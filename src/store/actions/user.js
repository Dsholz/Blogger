import {
  firebaseAuthentication,
  firebaseDatabase,
} from "../../firebase/firebase";

export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";

export const addUser = (userData) => ({
  type: ADD_USER,
  details: userData,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const handleUserSignUp = (userData) => {
  return (dispatch) => {
    const { email, password } = userData;

    return firebaseAuthentication
      .createUserWithEmailAndPassword(email, password)
      .then(async (data) => {
        await firebaseDatabase
          .collection("users")
          .doc(data.user.uid)
          .set(userData);

        dispatch(addUser(userData));
      });
  };
};
