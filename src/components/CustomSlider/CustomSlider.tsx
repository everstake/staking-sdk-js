import React from 'react';
import './CustomSlider.sass';
import Slider from '@material-ui/core/Slider';

export interface CustomSliderProps {
  value: number | number[];
  onChange: (event: any, newValue: number | number[]) => void;
  step: number;
  min: number;
  max: number;
  valuetext?: (value: number) => string;
}

const CustomSlider: React.FC<CustomSliderProps> = (props) => {
  return <div className='custom-slider'>
    <Slider
      value={props.value}
      getAriaValueText={props.valuetext}
      aria-labelledby='discrete-slider'
      valueLabelDisplay='auto'
      onChange={props.onChange}
      step={props.step}
      marks={true}
      min={props.min}
      max={props.max}
      classes={{
        root: 'everstake-root',
        rail: 'everstake-rail',
        track: 'everstake-track',
        thumb: 'everstake-thumb',
        valueLabel: 'everstake-valueLabel',
        mark: 'everstake-mark',
        markActive: 'everstake-markActive'
      }}
    />

    <div className='custom-slider__bottom'>
      <p className='custom-slider__min'>{props.min}%</p><p className='custom-slider__max'>{props.max}%</p>
    </div>
  </div>;
};

export default CustomSlider;
