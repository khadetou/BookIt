import {
  REGISTER_USER_SUCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  SET_LOADING,
} from "../types/type";

const initialState = {
  user: null,
  success: null,
  loading: null,
  error: null,
  isAuthenticated: false,
};

export const auth = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case REGISTER_USER_SUCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };

    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };
    }

    case LOAD_USER_FAIL:
    case REGISTER_USER_FAIL: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }

    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
