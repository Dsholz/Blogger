const logger = (store) => (dispatch) => (action) => {
  console.group(action.type);
  console.log("The action is: ", action);

  dispatch(action);

  console.log("The new store is: ", store.getState());
  console.groupEnd();
};

export default logger;
