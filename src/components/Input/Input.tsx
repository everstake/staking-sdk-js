import React from 'react';
import './Input.sass';

export interface IProps {
  label?: string;
  labelRight?: string;
  labelRightHtml?: {__html: string};
  suffix?: string;
  name: string;
  placeholder?: string;
  type: 'password' | 'text' | 'email' | 'number' | 'search' | 'tel' | 'url';
  register: any;
  errors: any;
}

const Input: React.FC<IProps> = (props: IProps) => {
  let inputClassName = 'input';
  if (props.errors[props.name]) {
    inputClassName += ' input__error';
  }
  return <label className='input__element'>
    {(props.label || props.labelRight) && <span className='input__header'>
      {props.label && <span className='input__label'>{props.label}</span>}
      {props.labelRight && !props.labelRightHtml && <span className='input__label-right'>{props.labelRight}</span>}
      {props.labelRightHtml && !props.labelRight && <span className='input__label-right' dangerouslySetInnerHTML={props.labelRightHtml}/>}
    </span>}
    <span className='input__wrap'>
      <input className={inputClassName}
             type={props.type}
             name={props.name}
             placeholder={props.placeholder}
             ref={props.register}/>
      {props.suffix && <span className='input__suffix'>{props.suffix}</span>}
     </span>
    {props.errors[props.name] && <p className='input__error-message'>{props.errors[props.name].message}</p>}

  </label>;
};

export default Input;
