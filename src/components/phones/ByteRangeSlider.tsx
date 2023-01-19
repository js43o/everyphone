import { Slider } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { convertToDataFormat } from './../../lib/methods';

export default function ByteRangeSlider(props: {
  min: number;
  max: number;
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
}) {
  const { min, max, value, setValue } = props;

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleValueLabelFormat = (value: number) => {
    const formatted = convertToDataFormat(2 ** value);
    if (value >= max) {
      return `${formatted}+`;
    }
    if (value <= min) {
      return `~${formatted}`;
    }
    return `${convertToDataFormat(2 ** value)}`;
  };

  return (
    <Slider
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
      valueLabelFormat={handleValueLabelFormat}
      valueLabelDisplay="off"
    />
  );
}
