import { IConfigResponse } from '../models/config.module';
import { FormPayload } from '../models/form.model';
import { $api } from './http';

class ConfigService {
  private link = '/wp/v2/works';
  async login() {
    const res = await $api.post<IConfigResponse>('/jwt-auth/v1/token', {
      username: process.env.REACT_APP_LOGIN,
      password: process.env.REACT_APP_PASSWORD
    });
    return res.data;
  }

  async createWork(data: FormPayload) {
    const res = await $api.post<FormPayload>(this.link, data);
    return res.data;
  }

  async updateWork(data: FormPayload, workId: string) {
    const res = await $api.patch<FormPayload>(`${this.link}/${workId}`, data);
    return res.data;
  }
}

export const configService = new ConfigService();
