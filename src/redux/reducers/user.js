import { SUBMIT_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const nomeDaPastaDosEstados = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_EMAIL: {
    return {
      ...state,
      email: action.payload.email,
    };
  }
  default:
    return state;
  }
};

export default nomeDaPastaDosEstados;
