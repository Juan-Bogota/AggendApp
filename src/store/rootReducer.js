import { combineReducers } from 'redux';
import taskReducer from './tasks/taskReducer';
import userReducer from './user/userReducer';
import createTaskReducer from './createTask/createTaskReducer';
import redirectReducer from './Redirect/redirectReducer';

const rootReducer = combineReducers({
    task: taskReducer,
    user: userReducer,
    createTask: createTaskReducer,
    redirect: redirectReducer,
});

export default rootReducer;
