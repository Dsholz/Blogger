import { ADD_USER } from "../actions/user";

const user = (state = null, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.details;
    default:
      return state;
  }
};

export default user;
