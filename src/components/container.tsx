import { useQuery } from '@tanstack/react-query';
import { configService } from '../services/config.service';
import { SpmForm } from './spm-form';

export const Container = () => {
  const { data, isPending, isSuccess } = useQuery({
    queryFn: configService.login,
    queryKey: ['config']
  });

  return isPending ? (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only" />
      </div>
    </div>
  ) : isSuccess ? (
    <SpmForm prices={data.prices} />
  ) : (
    <div className="alert alert-danger" role="alert">
      Something went wrong. We’re sorry for the inconvenience. Please try again
      later. If the problem persists, contact our support team.
    </div>
  );
};
