import { useReducer, ChangeEvent } from 'react';

type InputState = {
  username: string;
  password: string;
  rating: number;
  contents: string;
};

const initialState: InputState = {
  username: '',
  password: '',
  rating: 0,
  contents: '',
};

const reducer = (
  state: InputState,
  action: { type: string; payload: string | number }
) => {
  switch (action.type) {
    case 'USERNAME':
      return { ...state, username: action.payload as string };
    case 'PASSWORD':
      return { ...state, password: action.payload as string };
    case 'RATING':
      return { ...state, rating: action.payload as number };
    case 'CONTENTS':
      return { ...state, contents: action.payload as string };
    case 'CLEAN_ALL':
      return initialState;
    default:
      return state;
  }
};

const useCommentInputState = () => {
  const [inputState, dispatch] = useReducer(reducer, initialState);

  const handleChangeField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>,
    field: 'USERNAME' | 'PASSWORD' | 'RATING' | 'CONTENTS'
  ) => {
    const { value } = e.target;

    if (field === 'USERNAME' && value.length > 10) return;
    if (field === 'PASSWORD' && value.length > 20) return;
    if (field === 'CONTENTS' && value.length > 100) return;

    dispatch({ type: field, payload: e.target.value });
  };

  const setRating = (rating: number) =>
    dispatch({ type: 'RATING', payload: rating });

  const cleanAllFields = () => dispatch({ type: 'CLEAN_ALL', payload: '' });

  return {
    inputState,
    handleChangeField,
    setRating,
    cleanAllFields,
  };
};

export default useCommentInputState;
