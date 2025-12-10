import {
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';

interface PaymentFormProps {
  updateWork: () => Promise<void>;
}

export const PaymentForm = ({ updateWork }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });

    if (error) {
      setErrorMsg(error.message || 'Payment failed');
      setLoading(false);
      return;
    } else {
      await updateWork();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: 'tabs'
        }}
      />

      {errorMsg && (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary mt-3"
      >
        {loading && (
          <span
            className="spinner-border spinner-border-sm me-3"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        Pay deposit
      </button>
    </form>
  );
};
