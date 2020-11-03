import React from 'react';
import './CalculateInfoCard.sass';

interface CalculateInfoCardProps {
  dailyIncome: string;
  monthlyIncome: string;
  yearlyIncome: string;
}

const CalculateInfoCard: React.FC<CalculateInfoCardProps> = (props) => {
  const {dailyIncome, monthlyIncome, yearlyIncome} = props;
  return <div className='calculate-info-card'>
    <div className='calculate-info-card__item'>
      <p className='calculate-info-card__period'>Daily income</p>
      <p className='calculate-info-card__amount'>{dailyIncome}</p>
    </div>
    <div className='calculate-info-card__item'>
      <p className='calculate-info-card__period'>Monthly</p>
      <p className='calculate-info-card__amount'>{monthlyIncome}</p>
    </div>
    <div className='calculate-info-card__item'>
      <p className='calculate-info-card__period'>Yearly</p>
      <p className='calculate-info-card__amount'>{yearlyIncome}</p>
    </div>
  </div>;
};

export default CalculateInfoCard;
