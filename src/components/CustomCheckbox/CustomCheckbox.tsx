import React from 'react';
import './CustomCheckbox.sass';
import {Checkbox, FormControlLabel} from '@material-ui/core';
import {Control, Controller} from 'react-hook-form';

export interface CustomCheckboxProps {
  name: string;
  label: string;
  className?: string;
  onChange: (checked: boolean) => void;
  control: Control;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = (props) => {
  return <Controller name={props.name} control={props.control} render={renderProps => <FormControlLabel name={props.name}
                             checked={renderProps.value}
                             className={props.className}
                             control={<Checkbox color='primary' onChange={e => props.onChange(e.target.checked)}/>}
                             color='primary'
                             classes={{label: 'everstake-label'}}
                             label={props.label}/>
  }/>;
};

export default CustomCheckbox;
