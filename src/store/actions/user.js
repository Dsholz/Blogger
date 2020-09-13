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

export const handleUserSignUp = (userData, password) => {
  return (dispatch) => {
    return firebaseAuthentication
      .createUserWithEmailAndPassword(userData.email, password)
      .then(async (response) => {
        await firebaseDatabase
          .collection("users")
          .doc(response.user.uid)
          .set({ ...userData, id: response.user.uid });

        dispatch(addUser({ ...userData, id: response.user.uid }));
      });
  };
};

export const handleUserLogin = (email, password) => {
  return (dispatch) => {
    return firebaseAuthentication
      .signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        const userData = await firebaseDatabase
          .collection("users")
          .doc(response.user.uid)
          .get();

        dispatch(addUser(userData.data()));
      });
  };
};

export const handleProviderAuth = (provider) => {
  return (dispatch) => {
    return firebaseAuthentication
      .signInWithPopup(provider)
      .then(async (response) => {
        if (response.additionalUserInfo.isNewUser) {
          const newUserData = {
            id: response.user.uid,
            name: response.user.displayName,
            email: response.user.email,
            photoUrl: response.user.photoURL,
            posts: [],
          };

          await firebaseDatabase
            .collection("users")
            .doc(response.user.uid)
            .set(newUserData);

          dispatch(addUser(newUserData));
        } else {
          const userData = await firebaseDatabase
            .collection("users")
            .doc(response.user.uid)
            .get();

          dispatch(addUser(userData));
        }
      });
  };
};
