import { IConfigResponse } from '../models/config.module';
import { IWork } from '../models/form.model';
import { $api } from './http';

export enum Actions {
  PRICES = 'prices',
  CREATE = 'create_work',
  UPDATE = 'update_work'
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
}

export const configService = new ConfigService();
