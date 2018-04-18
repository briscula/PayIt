import * as moment from 'moment';

import {Bill, IndexedPendencies} from 'models';

export const computePendencies = (bill: Bill, pendencies: IndexedPendencies, payday: number) => {
  const today = moment();

  const month = today.month();
  const {expirationDay, generationDay} = bill;

  const expirationMoment = moment({date: expirationDay, month});
  let generationMoment = moment({date: generationDay, month});

  if (generationDay > expirationDay) {
    // bill is generated in the end of prev month and expires this month
    generationMoment = generationMoment.subtract(1, 'month');
  }

  const paydayMoment = moment({date: payday, month});

  const expirationString = expirationMoment.format('YYYY-MM-DD');
  const expirationStringWODay = expirationMoment.format('YYYY-MM');
  const pendencyKey = `${bill.id}-${expirationStringWODay}`;

  const currPendency = pendencies[pendencyKey] || buildPendency(bill, expirationString);
  const type = checkPaid(currPendency) || getType(today, generationMoment, expirationMoment);

  const newPendency = {
    ...buildPendency(bill, expirationString),
    type,
    warning: hasWarning(paydayMoment, expirationMoment),
  };

  return {[pendencyKey]: newPendency};
};

const isDelayed = (today, expirationDay) => {
  return today.diff(expirationDay) > 0;
};

const hasWarning = (payday, expirationDay) => {
  return payday.diff(expirationDay) > 0;
};

const isIdeal = (today, generationDay, expirationDay) => {
  const isGenerated = today.diff(generationDay) >= 0;
  const isNotDelayed = !isDelayed(today, expirationDay);
  return isNotDelayed && isGenerated;
};

const getType = (today, generationDay, expirationDay) => {
  switch (true) {
    case isDelayed(today, expirationDay):
      return 'DELAYED';
    case isIdeal(today, generationDay, expirationDay):
      return 'IDEAL';
    default:
      return 'NEXT';
  }
};

const checkPaid = ({type}) => (type === 'PAID' ? type : null);

const buildPendency = (bill: Bill, expiration: string, warning?: boolean) => ({
  description: bill.description,
  billId: bill.id,
  expirationDay: expiration,
  type: null as string,
  warning,
});
