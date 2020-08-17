import { ADD_POST } from '../actions/posts'

const posts = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        [action.id]: action.data
      }
    default:
      return state
  }
}

export default posts