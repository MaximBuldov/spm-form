import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { configService } from '../services/config.service';
import { SpmForm } from './spm-form';

export const Container = () => {
  const params = new URLSearchParams(window.location.search);
  const work = params.get('work');
  const { data, isPending, isSuccess } = useQuery({
    queryFn: () => configService.login(work),
    queryKey: ['config', work]
  });

  const mappedWork = useMemo(() => {
    const workObj = data?.work;
    if (workObj?.date) {
      workObj.date = dayjs(workObj.date).format('YYYY-MM-DD');
    }
    return workObj;
  }, [data?.work]);

  return isPending ? (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only" />
      </div>
    </div>
  ) : isSuccess ? (
    <SpmForm prices={data.prices} work={mappedWork} />
  ) : (
    <div className="alert alert-danger" role="alert">
      Something went wrong. We’re sorry for the inconvenience. Please try again
      later. If the problem persists, contact our support team.
    </div>
  );
};
