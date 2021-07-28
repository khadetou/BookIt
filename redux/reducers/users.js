import {
  REGISTER_USER_SUCESS,
  REGISTER_USER_FAIL,
  SET_LOADING,
} from "../types/type";

const initialState = {
  user: null,
  success: null,
  loading: null,
  error: null,
};

export const auth = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case REGISTER_USER_SUCESS:
      return {
        ...state,
        success: true,
        user: payload,
        loading: false,
      };
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
