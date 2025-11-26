import { atom } from 'jotai';
import { Card } from './card.entity';

export const cardsAtom = atom<Card[]>([]);

export const selectedCardIdAtom = atom<number | null>(null);

export const selectedCardAtom = atom((get) => {
  const selectedCardId = get(selectedCardIdAtom);
  const cards = get(cardsAtom);
  return selectedCardId != null
    ? cards.find((card) => card.id == selectedCardId)
    : null;
});
