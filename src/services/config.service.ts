import { IConfigResponse } from '../models/config.module';
import { FormPayload } from '../models/form.model';
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
    } catch (e) {
      console.log(e);
      throw new Error();
    }
  };

  async createWork(data: FormPayload) {
    const res = await $api.post<FormPayload>('works', data);
    return res.data;
  }

  async updateWork(data: FormPayload, workId: string) {
    const res = await $api.patch<FormPayload>(`works/${workId}`, data);
    return res.data;
  }
}

export const configService = new ConfigService();
