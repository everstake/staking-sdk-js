import React from 'react';
import './CustomSlider.sass';
export interface CustomSliderProps {
    value: number | number[];
    onChange: (event: any, newValue: number | number[]) => void;
    step: number;
    min: number;
    max: number;
    valuetext?: (value: number) => string;
}
declare const CustomSlider: React.FC<CustomSliderProps>;
export default CustomSlider;
