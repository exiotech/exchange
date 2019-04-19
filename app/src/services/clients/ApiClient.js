import axios from 'axios';
import { API_ROOT } from '../../consts';

const client = axios.create({
  baseURL: API_ROOT,
  timeout: 100000,
});

class ApiClient {
  constructor(client) {
    this._client = client;
  }

  get(url, options = {}) {
    return this._client.get(url, {
      ...options
    });
  }

  post(url, data, options = {}) {
    return this._client.post(url, data, {
      ...options
    });
  }

  patch(url, data, options = {}) {
    return this._client.patch(url, data, {
      ...options
    });
  }

  put(url, data, options = {}) {
    return this._client.put(url, data, {
      ...options
    });
  }

  delete(url, options = {}) {
    return this._client.delete(url, {
      ...options
    });
  }
}

export default new ApiClient(client);
