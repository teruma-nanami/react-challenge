import { SortableCard } from './SortableCard';
import { AddCard } from './AddCard';
import { List } from '../../../modules/lists/list.entity';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { useAtomValue } from 'jotai';
import { cardsAtom } from '../../../modules/cards/card.state';

interface SortableListProps {
  list: List;
  onDelete: (id: number) => void;
  onCreateCard: (listId: number, title: string) => Promise<void>;
}
export function SortableList({
  list,
  onDelete,
  onCreateCard,
}: SortableListProps) {
  const cards = useAtomValue(cardsAtom);
  const sortedListCards = cards
    .filter((card) => card.listId == list.id)
    .sort((a, b) => a.position - b.position);

  return (
    <Draggable draggableId={`list-${list.id}`} index={list.position}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.8 : 1,
          }}
        >
          <div className={`list`}>
            <div
              className="list-header"
              style={{
                cursor: 'grab',
              }}
              {...provided.dragHandleProps}
            >
              <h3 className="list-title">{list.title}</h3>
              <button
                className="list-options"
                onClick={() => onDelete(list.id)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>
            </div>
            <Droppable droppableId={`list-${list.id}`} type="card">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    minHeight: '1px',
                  }}
                >
                  {sortedListCards.map((card) => (
                    <SortableCard key={card.id} card={card} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <AddCard listId={list.id} onCreate={onCreateCard} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
