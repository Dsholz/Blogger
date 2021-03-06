import { firebaseDatabase } from "../../firebase/firebase";

export const ADD_POST = "ADD_POST";
export const SET_INITIAL_POSTS = "SET_INITIAL_POSTS";

export const addPost = (id, data) => ({
  type: ADD_POST,
  id,
  data,
});

export const initialPosts = (posts) => ({
  type: SET_INITIAL_POSTS,
  posts,
});

export const setInitialPosts = () => {
  return async (dispatch) => {
    await firebaseDatabase
      .collection("posts")
      .orderBy("postSince", "desc")
      .get()
      .then((snapshot) => {
        let posts = [];
        snapshot.forEach((doc) => posts.push({ id: doc.id, ...doc.data() }));

        const newPosts = posts.reduce((acc, post) => {
          acc[post.id] = post;
          delete post.id;
          return acc;
        }, {});

        dispatch(initialPosts(newPosts));
      });
  };
};
