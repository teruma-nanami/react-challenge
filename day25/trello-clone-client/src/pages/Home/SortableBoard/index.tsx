import { SortableList } from './SortableList';
import { AddList } from './AddList';
import { useAtom } from 'jotai';
import { listRepository } from '../../../modules/lists/list.repository';
import { listsAtom } from '../../../modules/lists/list.state';
import {
  DragDropContext,
  Droppable,
  type DraggableLocation,
  type DropResult,
} from '@hello-pangea/dnd';
import { cardRepository } from '../../../modules/cards/card.repository';
import { cardsAtom } from '../../../modules/cards/card.state';
import type { Card } from '../../../modules/cards/card.entity';

export default function SortableBoard() {
  const [lists, setLists] = useAtom(listsAtom);
  const [cards, setCards] = useAtom(cardsAtom);
  const sortedLists = [...lists].sort((a, b) => a.position - b.position);

  const createCard = async (listId: number, title: string) => {
    const newCard = await cardRepository.create(listId, title);
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const createList = async (title: string) => {
    const newList = await listRepository.create(title);
    setLists((prevLists) => [...prevLists, newList]);
  };

  const deleteList = async (listId: number) => {
    const confirmMessage =
      'リストを削除しますか？このリスト内のカードも全て削除されます';
    try {
      if (window.confirm(confirmMessage)) {
        await listRepository.delete(listId);
        setLists((prevLists) => prevLists.filter((l) => l.id !== listId));
      }
    } catch (error) {
      console.error('リストの削除に失敗しました。', error);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, type, draggableId } = result;

    if (destination == null) return;

    if (type == 'list') {
      await handleListMove(source, destination);
      return;
    }

    if (type == 'card') {
      const cardId = parseInt(draggableId.replace('card-', ''));
      await handleCardMove(cardId, source, destination);
    }
  };

  const handleCardMove = async (
    cardId: number,
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    const targetCard = cards.find((card) => card.id == cardId);
    if (targetCard == null) return cards;
    const originaCards = [...cards];
    try {
      const updatedCards =
        source.droppableId == destination.droppableId
          ? moveCardInSameList(source, destination)
          : moveCardBetweenLists(source, destination, targetCard);
      setCards(updatedCards);
      await cardRepository.update(updatedCards);
    } catch (error) {
      console.error('カードの移動でエラーが発生しました', error);
      setCards(originaCards);
    }
  };

  const moveCardBetweenLists = (
    source: DraggableLocation,
    destination: DraggableLocation,
    card: Card
  ) => {
    const sourceListId = parseInt(source.droppableId.replace('list-', ''));
    const destinationListId = parseInt(
      destination.droppableId.replace('list-', '')
    );
    const sourceListCards = cards
      .filter((c) => c.listId == sourceListId && c.id !== card.id)
      .sort((a, b) => a.position - b.position);
    const updatedCards = updateCardsPosition(cards, sourceListCards);

    const destinationListCards = updatedCards
      .filter((c) => c.listId == destinationListId)
      .sort((a, b) => a.position - b.position);
    destinationListCards.splice(destination.index, 0, {
      ...card,
      listId: destinationListId,
    });

    return updateCardsPosition(updatedCards, destinationListCards);
  };

  const moveCardInSameList = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    const sourceListId = parseInt(source.droppableId.replace('list-', ''));
    const listCards = cards
      .filter((card) => card.listId == sourceListId)
      .sort((a, b) => a.position - b.position);
    const [removed] = listCards.splice(source.index, 1);
    listCards.splice(destination.index, 0, removed);

    return updateCardsPosition(cards, listCards);
  };

  const updateCardsPosition = (cards: Card[], updatedCards: Card[]) => {
    return cards.map((card) => {
      const cardInex = updatedCards.findIndex((c) => c.id == card.id);
      return cardInex !== -1
        ? {
            ...updatedCards[cardInex],
            position: cardInex,
          }
        : card;
    });
  };

  const handleListMove = async (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    const [reorderedList] = sortedLists.splice(source.index, 1);
    sortedLists.splice(destination.index, 0, reorderedList);

    const updatedLists = sortedLists.map((list, index) => ({
      ...list,
      position: index,
    }));

    const originalists = [...lists];
    setLists(updatedLists);
    try {
      await listRepository.update(updatedLists);
    } catch (error) {
      console.error('リストの移動に失敗しました', error);
      setLists(originalists);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board-container">
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <div
              style={{ display: 'flex', gap: '12px' }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {sortedLists.map((list) => (
                <SortableList
                  key={list.id}
                  list={list}
                  onDelete={deleteList}
                  onCreateCard={createCard}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <AddList onCreate={createList} />
      </div>
    </DragDropContext>
  );
}
