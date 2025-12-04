import { IConfigResponse } from '../models/config.module';
import { IWork } from '../models/form.model';
import { $api } from './http';

class ConfigService {
  private link = 'book.php?action=';

  login = async (work: string | null) => {
    try {
      let url = `${this.link}prices`;
      if (work) {
        url = `${url}&id=${work}`;
      }
      const res = await $api.post<IConfigResponse>(url);
      return res.data;
    } catch (_) {
      throw new Error();
    }
  };

  async createWork(data: IWork) {
    const res = await $api.post<IWork>('works', data);
    return res.data;
  }

  async updateWork(data: IWork, workId: string) {
    const res = await $api.patch<IWork>(`works/${workId}`, data);
    return res.data;
  }
}

export const configService = new ConfigService();
