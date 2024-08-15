export const INITIAL_STATE = {
  isValid: {
    text: true,
    tag: true,
    date: true,
    title: true
  },
  values: {
    text: '',
    tag: '',
    date: '',
    title: '',
    userId: ''
  },
  submit: false
};

export function formReducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, values: { ...state.values, ...action.payload } };
    case 'CLEAR':
      return { ...state, values: { ...INITIAL_STATE.values }, submit: false };
    case 'RESET_VALIDITY':
      return { ...state, isValid: INITIAL_STATE.isValid };
    case 'SUBMIT': {
      const titleValidity = state.values.title?.trim().length;
      const textValidity = state.values.text?.trim().length;
      const dateValidity = state.values.date;
      const tagValidity = state.values.tag?.trim().length;
      return {
        ...state,
        isValid: {
          text: textValidity,
          date: dateValidity,
          tag: tagValidity,
          title: titleValidity
        },
        submit: titleValidity && textValidity && dateValidity && tagValidity
      };
    }
  }
}
