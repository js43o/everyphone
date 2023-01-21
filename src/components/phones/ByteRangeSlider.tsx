import { Slider } from '@mui/material';
import { convertToDataFormat } from 'lib/methods';

export default function ByteRangeSlider(props: {
  min: number;
  max: number;
  value: number[];
  setter: (newValue: number[]) => void;
}) {
  const { min, max, value, setter } = props;

  const handleChange = (e: Event, newValue: number | number[]) => {
    setter(newValue as number[]);
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
