import { randDelay } from '../utils/randDelay.js';

class ApiService {
  async getIndex(index: number): Promise<number> {
    await randDelay(1, 2000);

    return index;
  }
}

export const apiService = new ApiService();

