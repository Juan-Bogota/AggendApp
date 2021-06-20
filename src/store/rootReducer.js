import { combineReducers } from 'redux';
import taskReducer from './tasks/taskReducer';
import userReducer from './user/userReducer';
import createTaskReducer from './createTask/createTaskReducer';

const rootReducer = combineReducers({
    task: taskReducer,
    user: userReducer,
    createTask: createTaskReducer
});

export default rootReducer;
