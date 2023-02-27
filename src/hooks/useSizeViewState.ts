import { useReducer } from 'react';

type ComparisonViewOptions = {
  layered: boolean;
  handDummy: boolean;
  device1: boolean;
  device2: boolean;
};

const initialOptions: ComparisonViewOptions = {
  layered: false,
  handDummy: false,
  device1: true,
  device2: true,
};

const reducer = (state: ComparisonViewOptions, action: { type: string }) => {
  switch (action.type) {
    case 'LAYERED':
      return { ...state, layered: !state.layered };
    case 'DUMMY_HAND':
      return { ...state, handDummy: !state.handDummy };
    case 'DEVICE_ONE':
      return { ...state, device1: !state.device1 };
    case 'DEVICE_TWO':
      return { ...state, device2: !state.device2 };
    default:
      return state;
  }
};

const useSizeViewState = () => {
  const [viewState, dispatch] = useReducer(reducer, initialOptions);

  const handleChangeView = (
    type: 'LAYERED' | 'DUMMY_HAND' | 'DEVICE_ONE' | 'DEVICE_TWO'
  ) => dispatch({ type });

  return { viewState, handleChangeView };
};

export default useSizeViewState;
