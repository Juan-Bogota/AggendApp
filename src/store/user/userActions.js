import { requestHttp, HTTP_VERBS } from '../../utils/HttpRequest';
import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  AUTOLOGIN_FAILURE,
  AUTOLOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP
} from "./userTypes";
import { AlertDataLogin, AlertForm, ICON } from '../../utils/SweetAlert';
import { USERS } from '../../constants/HttpEndpoints';
import { getToken, removeToken, setToken } from '../../utils/LocalStorageToken';

export const fetchLogin = (credentials = {}) => {
  return (dispacth) => {
    dispacth(fetchLoginRequest());
    const callHttp = async (credentials) => {
      try {
        const response = await requestHttp({
          method: HTTP_VERBS.POST,
          endpoint: USERS.login,
          data: credentials
        });
        setToken(response.data.token);
        dispacth(fetchLoginSuccess());
        AlertDataLogin();
      } catch (error) {
        const messageError = error.response.statusText || 'error';
        dispacth(fetchLoginFailure(messageError));
        AlertForm('Error', error.response.statusText || '', ICON.ERROR);
      }
    };
    callHttp(credentials);
  };
};

export const fetchSignUp = (credentials = {}) => {
  return (dispacth) => {
    dispacth(fetchSignUpRequest());
    const callHttp = async (credentials) => {
      try {
        const response = await requestHttp({
          method: HTTP_VERBS.POST,
          endpoint: USERS.signup,
          data: credentials
        });

        dispacth(fetchSignUpSuccess());
        AlertForm(`Welcome ${response.data.name}`, 'User successfully created, Please log in', ICON.SUCCESS);
      } catch (error) {
        const messageError = error.response.statusText || 'error';
        dispacth(fetchSignUpFailure(messageError));
        AlertForm('Error', error.response.statusText || '', ICON.ERROR);
      }
    };
    callHttp(credentials);
  };
};

export const autologin = () => {
  return (dispacth) => {
    const callHttp = async () => {
      try {
        await requestHttp({
          method: HTTP_VERBS.POST,
          endpoint: USERS.check,
        });

        dispacth(autologinSuccess());
      } catch (error) {

        dispacth(autologinFailure());
      }
    };
    callHttp();
  }
}

export const logout = () => {
  return (dispacth) => {
    removeToken();
    const token = getToken();
    if (!token) dispacth(logoutSuccess());
    if (token) dispacth(logoutFailure());
  }
}

export const fetchLoginRequest = () => {
  return {
    type: FETCH_LOGIN_REQUEST,
  };
};

export const fetchLoginSuccess = () => {
  return {
    type: FETCH_LOGIN_SUCCESS
  };
};

export const fetchLoginFailure = (error) => {
  return {
    type: FETCH_LOGIN_FAILURE,
    payload: error,
  };
};

export const fetchSignUpRequest = () => {
  return {
    type: SIGNUP.REQUEST,
  };
};

export const fetchSignUpSuccess = () => {
  return {
    type: SIGNUP.SUCCESS,
  };
};

export const fetchSignUpFailure = (error) => {
  return {
    type: SIGNUP.FAILURE,
    payload: error,
  };
};


export const autologinFailure = () => {
  return {
    type: AUTOLOGIN_FAILURE
  }
}

export const autologinSuccess = () => {
  return {
    type: AUTOLOGIN_SUCCESS
  }
}

export const logoutFailure = () => {
  return {
    type: LOGOUT_FAILURE
  }
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}



