import React from 'react';
import './CustomCheckbox.sass';
import {Checkbox, FormControlLabel} from '@material-ui/core';

export interface CustomCheckboxProps {
  name: string;
  label: string;
  className?: string;
  onChange: (event: React.ChangeEvent<{}>, checked: boolean) => void;
  register: React.Ref<HTMLInputElement>;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = (props) => {
  return <FormControlLabel onChange={props.onChange}
                           name={props.name}
                           className={props.className}
                           control={<Checkbox color='primary' inputRef={props.register}/>}
                           color='primary'
                           classes={{label: 'everstake-label'}}
                           label={props.label}/>;
};

export default CustomCheckbox;
