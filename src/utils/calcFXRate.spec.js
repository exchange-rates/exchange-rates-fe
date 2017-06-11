import tape from 'tape';
import calcFXRate from './calcFXRate';

const rates = {
  HKD: 8,
  AUD: 1.3
};

tape('calcFXRate should calculate the proper rates', (t) => {
  const rate = calcFXRate('AUD', 'HKD', rates);

  t.equal(rate, rates.HKD/rates.AUD);
  t.end();
});

tape('calcFXRate should return null if either first and second currency is missing', (t) => {
  t.equal(calcFXRate('', 'HKD', rates), null);
  t.equal(calcFXRate('AUD', '', rates), null);

  t.end();
});