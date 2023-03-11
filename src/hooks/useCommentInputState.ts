import { useReducer, ChangeEvent } from 'react';

type InputState = {
  username: string;
  password: string;
  contents: string;
};

const initialState: InputState = {
  username: '',
  password: '',
  contents: '',
};

const reducer = (
  state: InputState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case 'USERNAME':
      return { ...state, username: action.payload };
    case 'PASSWORD':
      return { ...state, password: action.payload };
    case 'CONTENTS':
      return { ...state, contents: action.payload };
    case 'CLEAN_ALL':
      return initialState;
    default:
      return state;
  }
};

const useCommentInputState = () => {
  const [inputState, dispatch] = useReducer(reducer, initialState);

  const handleChangeField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: 'USERNAME' | 'PASSWORD' | 'CONTENTS'
  ) => {
    const { value } = e.target;

    if (field === 'USERNAME' && value.length > 10) return;
    if (field === 'PASSWORD' && value.length > 20) return;
    if (field === 'CONTENTS' && value.length > 100) return;

    dispatch({ type: field, payload: e.target.value });
  };
  const cleanAllFields = () => dispatch({ type: 'CLEAN_ALL', payload: '' });

  return {
    inputState,
    handleChangeField,
    cleanAllFields,
  };
};

export default useCommentInputState;
