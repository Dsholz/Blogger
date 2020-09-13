import { ADD_POST, SET_INITIAL_POSTS } from "../actions/posts";

const posts = (state = null, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        [action.id]: action.data,
      };
    case SET_INITIAL_POSTS:
      return {
        ...action.posts,
      };
    default:
      return state;
  }
};

export default posts;
