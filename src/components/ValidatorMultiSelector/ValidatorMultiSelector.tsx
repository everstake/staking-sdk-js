import React, {useCallback, useState} from 'react';
import './ValidatorMultiSelector.sass';
import useValidators from '../../hooks/useValidators';
import CloseIcon from '../icons/CloseIcon';
import {Checkbox} from '@material-ui/core';

interface ValidatorMultiSelectorProps {
  close: () => void;
}

const ValidatorMultiSelector: React.FC<ValidatorMultiSelectorProps> = (props) => {
  const {close} = props;
  const {coinValidators, selectCoinValidators, selectedCoinValidators} = useValidators();
  const initialValidators = (): string[] => {
    return selectedCoinValidators.map(validator => validator.id);
  };
  const [validatorIds, setValidatorIds] = useState<string[]>(initialValidators);

  const changeValidator = (checked: boolean, id: string) => {
    setValidatorIds(prevList => {
      if (checked) {
        return [...prevList, id];
      } else {
        return prevList.filter(validatorId => validatorId !== id);
      }
    });
  };

  const isSelectValidator = (id: string): boolean => {
    return !!validatorIds.find(validatorId => validatorId === id);
  };

  const confirm = () => {
    const isSelected = selectCoinValidators(validatorIds);
    if (isSelected) {
      close();
    }
  };

  return <div className='validator-multi-selector'>
    <div className='validator-multi-selector__header'>
      <button className='close-btn icon-btn' onClick={close}>{<CloseIcon/>}</button>
      <h3 className='validator-multi-selector__title'>Select validator</h3>
    </div>

    {!!coinValidators && coinValidators.length > 0 ? <div className='validator-multi-selector__body'>
      {coinValidators.length && <>
        <ul className='validator-multi-selector__list'>
          {coinValidators.map((validator) => <li className='validator-multi-selector__item' key={validator.id}>
            <label className={'validator__label' + (validator.isDefault ? ' validator__label--accent' : '')}>
              <div className='validator__check-area'>
                <Checkbox color='primary'
                          checked={isSelectValidator(validator.id)}
                          onChange={e => changeValidator(e.target.checked, validator.id)}/>
              </div>
              <div className='validator__container'>
                <div className='validator__info'>
                  <p className='validator__title'>{validator.name}</p>
                </div>
                {validator.isReliable && <p className='validator__reliable-label'>Reliable</p>}
              </div>
            </label>
          </li>)}
        </ul>
        <button onClick={confirm} className='validator-multi-selector__btn accent-btn'>Confirm</button>
      </>}
    </div> : <p className='coin-selector__subtitle'>No validators</p>}
  </div>;
};

export default ValidatorMultiSelector;
