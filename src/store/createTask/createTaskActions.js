import { TASKS } from '../../constants/HttpEndpoints';
import { HTTP_VERBS, requestHttp } from '../../utils/HttpRequest';
import { AlertForm, ICON } from '../../utils/SweetAlert';
import { CREATE_TASKS_FAILURE, CREATE_TASKS_REQUEST, CREATE_TASKS_SUCCESS } from './createTaskTypes';

export const apiCreateTask = (form = {}, history = null) => {

    return async (dispatch) => {
        dispatch(apiCreateTaskRequest());
        const callHttp = async (form) => {
            try {
                const response = await requestHttp(
                    {
                        method: HTTP_VERBS.POST,
                        endpoint: TASKS.createTask,
                        data: form
                    }
                );
                dispatch(apiCreateTaskSuccess(response.data));
                AlertForm('Success Create New Task', '', ICON.SUCCESS);
                if (history) history.push("/");
            } catch (error) {
                dispatch(apiCreateTaskFailure(error.response.statusText || 'Error'));
                AlertForm('Error', error.response.statusText || 'Error', ICON.ERROR);
            }
        };
        await callHttp(form);
    }
}

export const apiCreateTaskRequest = () => {
    return {
        type: CREATE_TASKS_REQUEST,
    }
}

export const apiCreateTaskSuccess = (create) => {
    return {
        type: CREATE_TASKS_SUCCESS,
        payload: create
    }
}

export const apiCreateTaskFailure = (error) => {
    return {
        type: CREATE_TASKS_FAILURE,
        payload: error
    }
}