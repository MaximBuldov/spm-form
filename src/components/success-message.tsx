import dayjs from 'dayjs';
import { IWork } from '../models/form.model';

interface SuccessMessageProps {
  data: IWork;
}

export const SuccessMessage = (work: SuccessMessageProps) => {
  const data = work.data.acf?.customer_info;
  if (!data) {
    return;
  }
  const smallBox = data.small_boxes;
  const medBox = data.medium_boxes;
  const papper = data.wrapping_paper;
  return (
    <div className="col-md-12 alert alert-success p-3">
      <h4 className="alert-heading">Well done!</h4>
      <p>Your order information:</p>
      <hr />
      <h5 className="alert-heading">Contact information</h5>
      <ul className="mb-0">
        <li>Name: {data.customer_name}</li>
        <li>Phone: {data.customer_phone}</li>
        <li>Email: {data.customer_email}</li>
        <li>Pick-Up Address: {data.pickup_address?.[0].full_address}</li>
        <li>Drop-Off Address: {data.dropoff_address?.[0].full_address}</li>
      </ul>
      <h5 className="alert-heading">Moving information</h5>
      <ul className="mb-0">
        <li>Date: {dayjs(work.data.date).format('MM/DD/YYYY')}</li>
        <li>Time: {data.time}</li>
        <li>Crew size: {data.movers}</li>
        <li>Payment: {data.payment}</li>
        <li>Type of residency: {data.typeofresidency}</li>
        <li>Packing: {data.packing}</li>
        {smallBox && <li>Small boxes: {smallBox}</li>}
        {medBox && <li>Medium boxes: {medBox}</li>}
        {papper && <li>Wrapping paper: {data.wrapping_paper}</li>}
      </ul>
    </div>
  );
};
