import { Option } from '../models/form.model';

interface SetPaymentPriceProps {
  options: Option[];
  moverPrice?: number;
  price?: number;
  movers?: number;
  nonCashPrice?: number;
  weekendPrice?: number;
  isWeekend?: boolean;
}

interface PriceForHourProps {
  isNonCash: boolean;
  movers: number;
  moverPrice?: number;
  price?: number;
  nonCashPrice?: number;
  weekendPrice?: number;
  isWeekend?: boolean;
}

export function setPaymentPrice({
  movers,
  options,
  ...prices
}: SetPaymentPriceProps) {
  if (!movers) {
    return [];
  }

  return options.map(({ value, label }) => ({
    value,
    label: `${label} $${priceForHour({
      movers,
      isNonCash: value !== 'cash',
      ...prices
    })}/h`
  }));
}

export function priceForHour({
  movers,
  isNonCash,
  moverPrice,
  price,
  nonCashPrice,
  weekendPrice,
  isWeekend
}: PriceForHourProps) {
  let total =
    Number(moverPrice || 0) * Number(movers || 0) + Number(price || 0);

  if (isNonCash) {
    total = total + Number(nonCashPrice || 0);
  }
  if (isWeekend) {
    total = total + Number(weekendPrice || 0);
  }
  return total;
}
