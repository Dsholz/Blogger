export const ADD_POST = 'ADD_POST'

export const addPost = (id, data) => ({
  type: ADD_POST,
  id,
  data
})