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
    title: ''
  },
  submit: false
};

export function formReducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, values: { ...state.values, ...action.payload } };
    case 'CLEAR':
      return { ...state, values: { ...INITIAL_STATE.values } };
    case 'RESET_VALIDITY':
      return { ...state, isValid: INITIAL_STATE.isValid };
    case 'SUBMIT': {
      const titleValidity = action.payload.title?.trim().length;
      const textValidity = action.payload.text?.trim().length;
      const dateValidity = action.payload.date;
      const tagValidity = action.payload.tag?.trim().length;
      return {
        values: action.payload,
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
