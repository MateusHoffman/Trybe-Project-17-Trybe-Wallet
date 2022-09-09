import currenciesAPI from '../../services/requestAPI';

export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
export const submitEmail = (email) => ({
  type: SUBMIT_EMAIL,
  payload: {
    email,
  },
});

export const SUBMIT_CURRENCIES_API = 'SUBMIT_CURRENCIES_API';
export const submitCurrenciesApi = (currencies) => ({
  type: SUBMIT_CURRENCIES_API,
  payload: {
    currencies,
  },
});

export const fetchCurrency = () => async (dispatch) => {
  const response = await currenciesAPI();
  delete response.USDT;
  dispatch(submitCurrenciesApi(response));
};

export const SUBMIT_EXPENSES = 'SUBMIT_EXPENSES';
export const submitExpenses = (expenses) => ({
  type: SUBMIT_EXPENSES,
  payload: {
    expenses,
  },
});

export const SUBMIT_ARR_EXPENSES = 'SUBMIT_ARR_EXPENSES';
export const submitArrExpenses = (expenses) => ({
  type: SUBMIT_ARR_EXPENSES,
  payload: {
    expenses,
  },
});

export const SUBMIT_SUM_VALUE = 'SUBMIT_SUM_VALUE';
export const submitAllValue = (allValueBRL) => ({
  type: SUBMIT_SUM_VALUE,
  payload: {
    allValueBRL,
  },
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const editExpense = (idToEdit) => ({
  type: EDIT_EXPENSE,
  payload: {
    idToEdit,
  },
});
