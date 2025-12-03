import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { AddressGroup, ErrorMessage, InputGroup, MySelect, Result } from '.';
import { IPricesMapped } from '../models/config.module';
import { FormPayload, FormValues } from '../models/form.model';
import { configService } from '../services/config.service';
import {
  disableMovers,
  disableTrucks,
  mapFormData,
  OPTIONS,
  priceForHour,
  setPaymentPrice
} from '../utils';
import { SuccessMessage } from './success-message';

interface SpmFormProps {
  prices: IPricesMapped;
}

export const SpmForm = ({ prices }: SpmFormProps) => {
  const params = new URLSearchParams(window.location.search);
  const work = params.get('work');
  const worker = params.get('worker');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<FormValues>({
    defaultValues: {
      pickup_address: [{ street: '', zip: '', unit: '' }],
      dropoff_address: [{ street: '', zip: '', unit: '' }]
    }
  });

  const bedroom = watch('bedroom');
  const truck = watch('truck');
  const time = watch('time');
  const supplies = watch('supplies');
  const movers = watch('movers');
  const moversInt = useMemo(
    () => parseInt(movers?.value || '', 10),
    [movers?.value]
  );
  const payment = watch('payment');
  const date = watch('date');
  const showResult =
    bedroom &&
    truck &&
    time &&
    supplies &&
    movers &&
    payment &&
    date &&
    watch('type_of_residency') &&
    watch('packing') &&
    watch('how_from') &&
    watch('heavy_items');

  const isWeekend = useMemo(() => {
    const day = dayjs(date).day();
    return day === 0 || day === 6;
  }, [date]);

  const paymentsOptions = useMemo(() => {
    return setPaymentPrice({
      options: OPTIONS.payment,
      movers: moversInt,
      isWeekend,
      ...prices
    });
  }, [isWeekend, moversInt, prices]);

  const { isPending, mutate, isSuccess } = useMutation({
    mutationFn: (data: FormPayload) =>
      work
        ? configService.updateWork(data, work)
        : configService.createWork(data)
  });

  const result = useMemo(() => {
    return priceForHour({
      isNonCash: payment?.value !== 'cash',
      movers: moversInt,
      ...prices,
      isWeekend
    });
  }, [isWeekend, moversInt, payment?.value, prices]);

  const onSubmit = (data: FormValues) => {
    mutate(mapFormData(data, result, prices.truckFee, worker));
  };

  return (
    <div className="ls section_padding_top_100 section_padding_bottom_75 columns_margin_bottom_30">
      <div className="container">
        <div className="col-sm-12 text-center">
          <div className="framed-heading">
            <h2 className="section_header">BOOK ONLINE</h2>
          </div>
          <p>
            Please fill out the following information for booking your move. We
            look forward to being the best part of your move!
          </p>
        </div>
        {isSuccess ? (
          <SuccessMessage
            data={mapFormData(getValues(), result, prices.truckFee)}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className="section-header col-md-12">
              <h3>Moving Information</h3>
            </div>
            <div className="col-md-4">
              <MySelect
                options={OPTIONS.bedroom}
                placeholder="Moving size"
                name="bedroom"
                isError={!!errors.bedroom}
                control={control}
              />
            </div>
            <div className="col-md-4">
              <MySelect
                options={disableTrucks(OPTIONS.truck, bedroom?.value)}
                placeholder="Truck size"
                name="truck"
                isError={!!errors.truck}
                control={control}
                isDisabled={!bedroom}
              />
            </div>
            <div className="col-md-4">
              <MySelect
                options={disableMovers(OPTIONS.movers, bedroom?.value)}
                placeholder="Crew size"
                name="movers"
                isError={!!errors.movers}
                control={control}
                isDisabled={!truck}
              />
            </div>
            <div className="col-md-4">
              <input
                disabled={!truck}
                required
                type="date"
                className="form-control"
                placeholder="Date"
                min={dayjs().format('YYYY-MM-DD')}
                {...register('date', { required: true })}
              />
              {errors.date && <ErrorMessage />}
            </div>
            <div className="col-md-4">
              <MySelect
                options={OPTIONS.time}
                placeholder="Start time"
                name="time"
                isError={!!errors.time}
                control={control}
                isDisabled={!truck}
              />
            </div>
            <div className="col-md-4">
              <MySelect
                options={paymentsOptions}
                placeholder="Payment"
                name="payment"
                isError={!!errors.payment}
                control={control}
                isDisabled={!time}
              />
            </div>
            <div className="col-md-4">
              <MySelect
                options={OPTIONS.residency}
                placeholder="Type of residency"
                name="type_of_residency"
                isError={!!errors.type_of_residency}
                control={control}
                isDisabled={!time}
              />
            </div>
            <div className="col-md-4">
              <MySelect
                options={OPTIONS.packing}
                placeholder="No Packing"
                name="packing"
                isError={!!errors.packing}
                control={control}
                isDisabled={!time}
              />
            </div>
            <div className="col-md-4">
              <MySelect
                options={OPTIONS.supplies}
                placeholder="Do you need supplies?"
                name="supplies"
                isError={!!errors.supplies}
                control={control}
                isDisabled={!time}
              />
            </div>
            {supplies?.value === 'yes' && (
              <div className="row">
                <div className="col-md-4">
                  <InputGroup
                    register={register}
                    name="small_boxes"
                    prepend="Small Box"
                    append={`$${prices.smallBox}`}
                    error={!!errors.small_boxes}
                  />
                </div>
                <div className="col-md-4">
                  <InputGroup
                    register={register}
                    name="medium_boxes"
                    prepend="Medium boxes"
                    append={`$${prices.mediumBox}`}
                    error={!!errors.medium_boxes}
                  />
                </div>
                <div className="col-md-4">
                  <InputGroup
                    register={register}
                    name="wrapping_paper"
                    prepend="Wrapping paper"
                    append={`$${prices.wrappingPaper}`}
                    error={!!errors.wrapping_paper}
                  />
                </div>
              </div>
            )}
            <div className="col-md-4">
              <MySelect
                options={OPTIONS.findUs}
                placeholder="How did you find us?"
                name="how_from"
                isError={!!errors.how_from}
                control={control}
                isDisabled={!time}
              />
            </div>
            <div className="col-md-4">
              <MySelect
                options={OPTIONS.heavyItems}
                placeholder="Do you have Items more than 250lb?"
                name="heavy_items"
                isError={!!errors.heavy_items}
                control={control}
                isDisabled={!time}
              />
            </div>
            <hr />
            <div className="row">
              <h3>Customer information</h3>
            </div>
            <AddressGroup
              name="pickup_address"
              title="Pick-Up Address"
              errors={errors}
              register={register}
              control={control}
              isDisabled={!time}
              setValue={setValue}
            />
            <AddressGroup
              name="dropoff_address"
              title="Drop-off Address"
              errors={errors}
              register={register}
              control={control}
              isDisabled={!time}
              setValue={setValue}
            />
            <div className="col-md-12">
              <h4>Customer information</h4>
            </div>
            <div className="col-md-4">
              <input
                disabled={!time}
                type="text"
                className="form-control"
                placeholder="Full name"
                {...register('customer.name', {
                  required: true
                })}
              />
              {errors.customer?.name && <ErrorMessage />}
            </div>
            <div className="col-md-4">
              <input
                disabled={!time}
                type="text"
                {...register('customer.phone', {
                  required: true
                })}
                className="form-control"
                placeholder="Phone"
              />
              {errors.customer?.phone && <ErrorMessage />}
            </div>
            <div className="col-md-4">
              <input
                disabled={!time}
                type="email"
                className="form-control"
                placeholder="Email"
                {...register('customer.email', {
                  required: true
                })}
              />
              {errors.customer?.email && <ErrorMessage />}
            </div>
            <div className="col-md-12">
              <h4>Contact person information (optional)</h4>
            </div>
            <div className="col-md-4">
              <input
                disabled={!time}
                type="text"
                className="form-control"
                placeholder="Full name"
                {...register('contact_name')}
              />
              {errors.contact_name && <ErrorMessage />}
            </div>
            <div className="col-md-4">
              <input
                disabled={!time}
                type="tel"
                className="form-control"
                placeholder="Phone"
                {...register('contact_phone')}
              />
              {errors.contact_phone && <ErrorMessage />}
            </div>
            <div className="col-md-4">
              <input
                disabled={!time}
                type="email"
                className="form-control"
                placeholder="Email"
                {...register('contact_email')}
              />
            </div>
            <div className="col-md-12">
              <textarea
                disabled={!time}
                rows={4}
                className="form-control"
                {...register('note')}
                placeholder="Additional notes from customer (boxes/wrapping paper/bubble wrap/floor protection/items more than 250lb)"
              ></textarea>
            </div>
            {showResult && (
              <Result
                movers={movers.value}
                payment={payment.value}
                smallBoxes={watch('small_boxes')}
                mediumBoxes={watch('medium_boxes')}
                wrappingPaper={watch('wrapping_paper')}
                prices={prices}
                result={result}
              />
            )}
            <hr />
            <div className="col-md-12">
              <button
                disabled={isPending}
                className="btn btn-primary btn-lg"
                type="submit"
              >
                {isPending && (
                  <span
                    className="spinner-border spinner-border-sm me-3"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
