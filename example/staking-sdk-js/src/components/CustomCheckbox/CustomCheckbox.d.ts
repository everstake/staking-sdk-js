import React from 'react';
import './CustomCheckbox.sass';
import { Control } from 'react-hook-form';
export interface CustomCheckboxProps {
    name: string;
    label: string;
    className?: string;
    onChange: (checked: boolean) => void;
    control: Control;
}
declare const CustomCheckbox: React.FC<CustomCheckboxProps>;
export default CustomCheckbox;
