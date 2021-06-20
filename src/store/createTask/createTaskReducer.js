import { CREATE_TASKS_FAILURE, CREATE_TASKS_REQUEST, CREATE_TASKS_SUCCESS } from './createTaskTypes';

const initialState = {
    loading: false,
    data: {},
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_TASKS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case CREATE_TASKS_SUCCESS: 
        return {
          ...state,
          loading:false,
          data: action.payload
        };
      case CREATE_TASKS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error
        };
      default: 
        return state;
    }
}

export default reducer;