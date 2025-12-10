import { IConfigResponse } from '../models/config.module';
import { IIntent, IWork } from '../models/form.model';
import { $api } from './http';

export enum Actions {
  PRICES = 'prices',
  CREATE = 'create_work',
  UPDATE = 'update_work',
  INTENT = 'create_intent'
}

class ConfigService {
  private link = 'book.php';

  login = async (work?: string | null, token?: string | null) => {
    try {
      const res = await $api.post<IConfigResponse>(
        this.link,
        { work, token },
        { params: { action: 'prices' } }
      );
      return res.data;
    } catch (_) {
      throw new Error();
    }
  };

  createWork = async (data: IWork, action: Actions) => {
    try {
      const res = await $api.post<IWork>(this.link, data, {
        params: { action }
      });
      return res.data;
    } catch (_) {
      throw new Error();
    }
  };

  createIntent = async (work?: number, token?: string) => {
    try {
      if (work && token) {
        const res = await $api.post<IIntent>(
          this.link,
          { work, token },
          { params: { action: Actions.INTENT } }
        );
        return res.data;
      } else {
        throw new Error('Wrong data');
      }
    } catch (_) {
      throw new Error();
    }
  };
}

export const configService = new ConfigService();
