import dayjs from 'dayjs';
import { FormPayload } from '../models/form.model';

interface SuccessMessageProps {
  data: FormPayload;
}

export const SuccessMessage = ({ data }: SuccessMessageProps) => {
  const smallBox = data.customer_info.small_boxes;
  const medBox = data.customer_info.medium_boxes;
  const papper = data.customer_info.wrapping_paper;
  return (
    <div className="col-md-12 alert alert-success p-3">
      <h4 className="alert-heading">Well done!</h4>
      <p>Your order information:</p>
      <hr />
      <h5 className="alert-heading">Contact information</h5>
      <ul className="mb-0">
        <li>Name: {data.customer.name}</li>
        <li>Phone: {data.customer.phone}</li>
        <li>Email: {data.customer.email}</li>
        <li>
          Pick-Up Address: {data.customer_info.pickup_address?.[0].street}
        </li>
        <li>
          Drop-Off Address: {data.customer_info.dropoff_address?.[0].street}
        </li>
      </ul>
      <h5 className="alert-heading">Moving information</h5>
      <ul className="mb-0">
        <li>Date: {dayjs(data.date).format('MM/DD/YYYY')}</li>
        <li>Time: {data.customer_info.time}</li>
        <li>Crew size: {data.customer_info.movers}</li>
        <li>Payment: {data.customer_info.payment}</li>
        <li>Type of residency: {data.customer_info.type_of_residency}</li>
        <li>Packing: {data.customer_info.packing}</li>
        {smallBox && <li>Small boxes: {smallBox}</li>}
        {medBox && <li>Medium boxes: {medBox}</li>}
        {papper && <li>Wrapping paper: {data.customer_info.wrapping_paper}</li>}
      </ul>
    </div>
  );
};
