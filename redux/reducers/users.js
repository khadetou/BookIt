import {
  REGISTER_USER_SUCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  SET_LOADING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAIL,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAIL,
} from "../types/type";

const initialState = {
  user: null,
  success: null,
  loading: null,
  error: null,
  isAuthenticated: false,
  isUpdated: false,
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
        loading: false,
        isAuthenticated: true,
      };
    }

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isUpdated: payload,
        loading: false,
      };

    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUpdated: false,
        loading: false,
      };

    case FORGOT_PASS_SUCCESS:
      return {
        ...state,
        message: payload,
        loading: false,
      };

    case RESET_PASS_SUCCESS:
      return {
        ...state,
        success: payload,
        loading: false,
      };

    case RESET_PASS_FAIL:
    case FORGOT_PASS_FAIL:
    case UPDATE_PROFILE_FAIL:
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
