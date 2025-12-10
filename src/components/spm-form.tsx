import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { AddressGroup, ErrorMessage, InputGroup, MySelect, Result } from '.';
import { IPricesMapped } from '../models/config.module';
import { IWork } from '../models/form.model';
import { Actions, configService } from '../services/config.service';
import {
  disableMovers,
  disableTrucks,
  mapFormData,
  OPTIONS,
  priceForHour,
  setPaymentPrice
} from '../utils';
import { PaymentWrapper } from './payment-wrapper';
import { SuccessMessage } from './success-message';

interface SpmFormProps {
  prices: IPricesMapped;
  work?: IWork | null | undefined;
}

export const SpmForm = ({ prices, work }: SpmFormProps) => {
  const params = new URLSearchParams(window.location.search);
  const worker = params.get('worker');
  const workId = params.get('work');
  const deposit = Number(work?.acf?.deposit || 0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<IWork>({
    defaultValues: work || {
      acf: {
        customer_info: {
          pickup_address: [{ full_address: '', zip: '', unit: '' }],
          dropoff_address: [{ full_address: '', zip: '', unit: '' }]
        }
      }
    }
  });

  const bedroom = watch('acf.customer_info.bedroom');
  const truck = watch('acf.customer_info.truck');
  const time = watch('acf.customer_info.time');
  const supplies = watch('acf.customer_info.supplies');
  const movers = watch('acf.customer_info.movers');
  const heavyItems = watch('acf.customer_info.heavyItems');
  const moversInt = useMemo(() => parseInt(movers || '', 10), [movers]);

  const payment = watch('acf.customer_info.payment');
  const date = watch('acf.date');
  const showResult =
    bedroom &&
    truck &&
    time &&
    supplies &&
    movers &&
    payment &&
    date &&
    watch('acf.customer_info.typeofresidency') &&
    watch('acf.customer_info.packing') &&
    watch('acf.customer_info.howfrom') &&
    heavyItems;

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

  const { isPending, mutate, isSuccess, mutateAsync } = useMutation({
    mutationFn: (data: IWork) =>
      configService.createWork(data, workId ? Actions.UPDATE : Actions.CREATE)
  });

  const createIntent = useMutation({
    mutationFn: () =>
      configService.createIntent(
        work?.id,
        work?.acf?.customer_info.customer_phone
      )
  });

  const isNeedDeposit = useMemo(
    () => !work?.acf?.paid && deposit > 0,
    [deposit, work?.acf?.paid]
  );

  const result = useMemo(() => {
    return priceForHour({
      isNonCash: payment !== 'cash',
      movers: moversInt,
      ...prices,
      isWeekend
    });
  }, [isWeekend, moversInt, payment, prices]);

  const onSubmit = (data: IWork) => {
    mutate(mapFormData(data, result, prices.truckFee, worker));
  };

  const updateWork = async () => {
    const data = getValues();
    await mutateAsync(
      mapFormData(
        data,
        result,
        Number(work?.acf?.customer_info.truck_fee || prices.truckFee),
        worker
      )
    );
  };

  useEffect(() => {
    if (supplies === 'no') {
      setValue('acf.customer_info.small_boxes', 0);
      setValue('acf.customer_info.medium_boxes', 0);
      setValue('acf.customer_info.wrapping_paper', 0);
    }
  }, [setValue, supplies]);

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
          <>
            <form onSubmit={handleSubmit(onSubmit)} className="row" noValidate>
              <div className="section-header col-md-12">
                <h3>Moving Information</h3>
              </div>
              <div className="col-md-4">
                <MySelect
                  options={OPTIONS.bedroom}
                  placeholder="Moving size"
                  name="acf.customer_info.bedroom"
                  isError={!!errors.acf?.customer_info?.bedroom}
                  control={control}
                />
              </div>
              <div className="col-md-4">
                <MySelect
                  options={disableTrucks(OPTIONS.truck, bedroom)}
                  placeholder="Truck size"
                  name="acf.customer_info.truck"
                  isError={!!errors.acf?.customer_info?.truck}
                  control={control}
                  isDisabled={!bedroom}
                />
              </div>
              <div className="col-md-4">
                <MySelect
                  options={disableMovers(OPTIONS.movers, bedroom)}
                  placeholder="Crew size"
                  name="acf.customer_info.movers"
                  isError={!!errors.acf?.customer_info?.movers}
                  control={control}
                  isDisabled={!truck}
                />
              </div>
              <div className="col-md-4">
                <input
                  disabled={!truck}
                  type="date"
                  className="form-control"
                  placeholder="Date"
                  min={dayjs().format('YYYY-MM-DD')}
                  {...register('acf.date', { required: true })}
                />
                {errors.date && <ErrorMessage />}
              </div>
              <div className="col-md-4">
                <MySelect
                  options={OPTIONS.time}
                  placeholder="Start time"
                  name="acf.customer_info.time"
                  isError={!!errors.acf?.customer_info?.time}
                  control={control}
                  isDisabled={!truck}
                />
              </div>
              <div className="col-md-4">
                <MySelect
                  options={paymentsOptions}
                  placeholder="Payment"
                  name="acf.customer_info.payment"
                  isError={!!errors.acf?.customer_info?.payment}
                  control={control}
                  isDisabled={!time}
                />
              </div>
              <div className="col-md-4">
                <MySelect
                  options={OPTIONS.residency}
                  placeholder="Type of residency"
                  name="acf.customer_info.typeofresidency"
                  isError={!!errors.acf?.customer_info?.typeofresidency}
                  control={control}
                  isDisabled={!time}
                />
              </div>
              <div className="col-md-4">
                <MySelect
                  options={OPTIONS.packing}
                  placeholder="No Packing"
                  name="acf.customer_info.packing"
                  isError={!!errors.acf?.customer_info?.packing}
                  control={control}
                  isDisabled={!time}
                />
              </div>
              <div className="col-md-4">
                <MySelect
                  options={OPTIONS.supplies}
                  placeholder="Do you need supplies?"
                  name="acf.customer_info.supplies"
                  isError={!!errors.acf?.customer_info?.supplies}
                  control={control}
                  isDisabled={!time}
                />
              </div>
              {supplies === 'yes' && (
                <div className="row">
                  <div className="col-md-4">
                    <InputGroup
                      register={register}
                      name="acf.customer_info.small_boxes"
                      prepend="Small Box"
                      append={`$${prices.smallBox}`}
                      error={!!errors.acf?.customer_info?.small_boxes}
                    />
                  </div>
                  <div className="col-md-4">
                    <InputGroup
                      register={register}
                      name="acf.customer_info.medium_boxes"
                      prepend="Medium boxes"
                      append={`$${prices.mediumBox}`}
                      error={!!errors.acf?.customer_info?.medium_boxes}
                    />
                  </div>
                  <div className="col-md-4">
                    <InputGroup
                      register={register}
                      name="acf.customer_info.wrapping_paper"
                      prepend="Wrapping paper"
                      append={`$${prices.wrappingPaper}`}
                      error={!!errors.acf?.customer_info?.wrapping_paper}
                    />
                  </div>
                </div>
              )}
              <div className="col-md-4">
                <MySelect
                  options={OPTIONS.findUs}
                  placeholder="How did you find us?"
                  name="acf.customer_info.howfrom"
                  isError={!!errors.acf?.customer_info?.howfrom}
                  control={control}
                  isDisabled={!time}
                />
              </div>
              <div className="col-md-4">
                <MySelect
                  options={OPTIONS.heavyItems}
                  placeholder="Do you have Items more than 250lb?"
                  name="acf.customer_info.heavyItems"
                  isError={!!errors.acf?.customer_info?.heavyItems}
                  control={control}
                  isDisabled={!time}
                />
              </div>
              <hr />
              <div className="row">
                <h3>Customer information</h3>
              </div>
              <AddressGroup
                name="acf.customer_info.pickup_address"
                title="Pick-Up Address"
                errors={errors}
                register={register}
                control={control}
                isDisabled={!time}
                setValue={setValue}
              />
              <AddressGroup
                name="acf.customer_info.dropoff_address"
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
                  {...register('acf.customer_info.customer_name', {
                    required: true
                  })}
                />
                {errors.acf?.customer_info?.customer_name && <ErrorMessage />}
              </div>
              <div className="col-md-4">
                <input
                  disabled={!time}
                  type="text"
                  {...register('acf.customer_info.customer_phone', {
                    required: true
                  })}
                  className="form-control"
                  placeholder="Phone"
                />
                {errors.acf?.customer_info?.customer_phone && <ErrorMessage />}
              </div>
              <div className="col-md-4">
                <input
                  disabled={!time}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  {...register('acf.customer_info.customer_email', {
                    required: true
                  })}
                />
                {errors.acf?.customer_info?.customer_email && <ErrorMessage />}
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
                  {...register('acf.customer_info.contact_name')}
                />
              </div>
              <div className="col-md-4">
                <input
                  disabled={!time}
                  type="tel"
                  className="form-control"
                  placeholder="Phone"
                  {...register('acf.customer_info.contact_phone')}
                />
              </div>
              <div className="col-md-4">
                <input
                  disabled={!time}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  {...register('acf.customer_info.contact_email')}
                />
              </div>
              <div className="col-md-12">
                <textarea
                  disabled={!time}
                  rows={4}
                  className="form-control"
                  {...register('acf.customer_info.note')}
                  placeholder="Additional notes from customer (boxes/wrapping paper/bubble wrap/floor protection/items more than 250lb)"
                ></textarea>
              </div>
              {showResult && (
                <Result
                  movers={movers}
                  payment={payment}
                  smallBoxes={watch('acf.customer_info.small_boxes')}
                  mediumBoxes={watch('acf.customer_info.medium_boxes')}
                  wrappingPaper={watch('acf.customer_info.wrapping_paper')}
                  prices={prices}
                  heavyItems={heavyItems !== 'No'}
                  result={result}
                />
              )}
              <hr />
              <div className="col-md-12">
                {!createIntent.isSuccess && (
                  <button
                    disabled={isPending || createIntent.isPending}
                    className="btn btn-primary btn-lg"
                    type={isNeedDeposit ? 'button' : 'submit'}
                    onClick={() => {
                      isNeedDeposit && createIntent.mutate();
                    }}
                  >
                    {(isPending || createIntent.isPending) && (
                      <span
                        className="spinner-border spinner-border-sm me-3"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    {isNeedDeposit ? `Pay $${deposit} and submit` : 'Submit'}
                  </button>
                )}
              </div>
            </form>
            {createIntent.isSuccess && createIntent.data.clientSecret && (
              <PaymentWrapper
                clientSecret={createIntent.data.clientSecret}
                updateWork={updateWork}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
