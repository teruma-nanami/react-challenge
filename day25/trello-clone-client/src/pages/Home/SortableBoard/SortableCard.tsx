import { useSetAtom } from 'jotai';
import { Card } from '../../../modules/cards/card.entity';
import { selectedCardIdAtom } from '../../../modules/cards/card.state';
import { Draggable } from '@hello-pangea/dnd';

interface SortableCardProps {
  card: Card;
}

export function SortableCard({ card }: SortableCardProps) {
  const setSelectedCardId = useSetAtom(selectedCardIdAtom);

  return (
    <Draggable draggableId={`card-${card.id}`} index={card.position}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.5 : 1,
          }}
        >
          <div className={`card`} onClick={() => setSelectedCardId(card.id)}>
            <div className="card-title">
              {card.completed && (
                <span className="card-check">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="#4CAF50"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </span>
              )}
              {card.title}
            </div>
            {card.dueDate != null && (
              <div className="card-badge">🕒 {card.dueDate}</div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
