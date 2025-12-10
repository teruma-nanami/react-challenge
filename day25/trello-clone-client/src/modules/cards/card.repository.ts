import api from '../../lib/api';
import { Card } from './card.entity';

export const cardRepository = {
  async find() {
    const result = await api.get(`/cards`);
    return result.data.map((card: Card) => new Card(card));
  },
  async create(listId: number, title: string): Promise<Card> {
    const result = await api.post('/cards', { listId, title });
    return new Card(result.data);
  },
  async update(cards: Card[]): Promise<Card[]> {
    const result = await api.put('/cards', { cards });
    return result.data.map((card: Card) => new Card(card));
  },
  async delete(id: number): Promise<boolean> {
    await api.delete(`/cards/${id}`);
    return true;
  },
};
