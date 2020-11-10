import React from 'react';
import './ErrorMessage.sass';
interface ErrorMessageI {
    text: string;
    className?: string;
}
declare const ErrorMessage: React.FC<ErrorMessageI>;
export default ErrorMessage;
