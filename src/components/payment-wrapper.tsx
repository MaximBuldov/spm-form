import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { IWork } from '../models/form.model';
import { PaymentForm } from './payment-form';

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PK as string);

interface PaymentWrapperProps {
  clientSecret: string;
  updateWork: () => Promise<IWork>;
}

export const PaymentWrapper = ({
  clientSecret,
  updateWork
}: PaymentWrapperProps) => {
  return (
    <Elements stripe={stripe} options={{ clientSecret }}>
      <PaymentForm updateWork={updateWork} />
    </Elements>
  );
};
