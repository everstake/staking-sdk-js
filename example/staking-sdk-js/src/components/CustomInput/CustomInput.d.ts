import React, { ChangeEvent } from 'react';
import './CustomInput.sass';
export interface IProps {
    label?: string;
    labelRight?: string;
    labelRightHtml?: {
        __html: string;
    };
    suffix?: string;
    name: string;
    placeholder?: string;
    type: 'password' | 'text' | 'email' | 'number' | 'search' | 'tel' | 'url';
    register: any;
    errors: any;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
declare const CustomInput: React.FC<IProps>;
export default CustomInput;
