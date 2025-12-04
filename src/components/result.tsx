import { IPricesMapped } from '../models/config.module';

interface ResultProps {
  movers: string;
  payment: string;
  heavyItems?: number;
  smallBoxes?: number;
  mediumBoxes?: number;
  wrappingPaper?: number;
  prices?: IPricesMapped;
  result?: number;
}

export const Result = ({
  movers,
  payment,
  heavyItems,
  smallBoxes,
  mediumBoxes,
  wrappingPaper,
  prices,
  result
}: ResultProps) => {
  const smallBoxesPrice = Number(smallBoxes || 0) * Number(prices?.smallBox);
  const mediumBoxesPrice = Number(mediumBoxes || 0) * Number(prices?.mediumBox);
  const wrappingPaperPrice =
    Number(wrappingPaper || 0) * Number(prices?.wrappingPaper);

  const total =
    Number(result) * 3 +
    Number(heavyItems ? prices?.heavyItems : 0) +
    smallBoxesPrice +
    mediumBoxesPrice +
    wrappingPaperPrice;
  return (
    <div className="col-md-12 alert alert-primary p-3">
      <h4>Your minimum cost for 3 hours move: </h4>
      <div>
        For 3 hours minimum with <b>{movers} crew</b>, with {payment} payment:
        <b>
          {' '}
          ${result}/h x 3 hours{' '}
          {!!heavyItems && `+ $${heavyItems} for heavy items `}
          {!!smallBoxes &&
            `+ $${smallBoxesPrice} for ${smallBoxes} small boxes `}
          {!!mediumBoxes &&
            `+ $${mediumBoxesPrice} for ${mediumBoxes} medium boxes `}
          {!!wrappingPaper &&
            `+ $${wrappingPaperPrice} for ${wrappingPaper} wrapping paper `}
          = ${total}
        </b>
      </div>
    </div>
  );
};
