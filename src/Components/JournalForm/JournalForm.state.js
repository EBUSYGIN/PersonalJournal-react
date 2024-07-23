export const INITIAL_STATE = {
  isValid: {
    text: true,
    tag: true,
    date: true,
    title: true
  },
  values: {
    text: undefined,
    tag: undefined,
    date: undefined,
    title: undefined
  },
  submit: false
};

export function formReducer(state, action) {
  switch (action.type) {
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
