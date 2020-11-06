import React from 'react';
import './ErrorMessage.sass';

interface ErrorMessageI {
  text: string;
  className?: string;
}
const ErrorMessage: React.FC<ErrorMessageI> = (props) => {
  const {text, className} = props;
  const classes = ['error-message'];
  if (className) {
    classes.push(className);
  }
  return <p className={classes.join(' ')}>{text}</p>;
};

export default ErrorMessage;
