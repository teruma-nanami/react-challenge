import api from '../../lib/api';
import { List } from './list.entity';

export const listRepository = {
  async find(): Promise<List[]> {
    const result = await api.get(`/lists`);
    return result.data.map((list: List) => new List(list));
  },
  async create(title: string): Promise<List> {
    const result = await api.post('/lists', { title });
    return new List(result.data);
  },
  async update(lists: List[]): Promise<List[]> {
    const result = await api.put('/lists', { lists });
    return result.data.map((list: List) => new List(list));
  },
  async delete(id: number): Promise<boolean> {
    await api.delete(`/lists/${id}`);
    return true;
  },
};
