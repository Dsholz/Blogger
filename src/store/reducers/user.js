import { ADD_USER, REMOVE_USER } from "../actions/user";

const user = (state = null, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.details;
    case REMOVE_USER:
      return null;
    default:
      return state;
  }
};

export default user;
