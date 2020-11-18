import React from 'react';
import './ValidatorSelector.sass';
import useValidators from '../../hooks/useValidators';
import CloseIcon from '../icons/CloseIcon';
import CheckIcon from '../icons/CheckIcon';

interface ValidatorSelectorProps {
  close: () => void;
}

const ValidatorSelector: React.FC<ValidatorSelectorProps> = (props) => {
  const {close} = props;
  const {coinValidators, selectCoinValidators, selectedCoinValidators} = useValidators();

  const handleValidatorClick = (validatorId: string) => {
    const isSelected = selectCoinValidators([validatorId]);
    if (isSelected) {
      close();
    }
  };

  return <div className='validator-selector'>
    <div className='validator-selector__header'>
      <button className='close-btn icon-btn' onClick={close}>{<CloseIcon/>}</button>
      <h3 className='validator-selector__title'>Select validator</h3>
    </div>

    {!!coinValidators && coinValidators.length > 0 ? <div className='validator-selector__body'>
      {coinValidators.length && <>
        <ul className='validator-selector__list'>
          {coinValidators.map((validator) => <li className='validator-selector__item' key={validator.id}>
            <button className={'validator__btn' + (validator.isDefault ? ' validator__btn--accent' : '')}
                    onClick={() => handleValidatorClick(validator.id)}>
              <div className='validator__check-area'>
                {(selectedCoinValidators[0].id === validator.id) && <CheckIcon/>}
              </div>
              <div className='validator__container'>
                <div className='validator__info'>
                  <p className='validator__title'>{validator.name}</p>
                  <p className='validator__desc'>Fee: {validator.fee}%</p>
                </div>
                {validator.isReliable && <p className='validator__reliable-label'>Reliable</p>}
              </div>
            </button>
          </li>)}
        </ul>
      </>}
    </div> : <p className='coin-selector__subtitle'>No validators</p>}
  </div>;
};

export default ValidatorSelector;
