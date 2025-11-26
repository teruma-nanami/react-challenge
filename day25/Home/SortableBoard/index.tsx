import { SortableList } from './SortableList';
import { AddList } from './AddList';

export default function SortableBoard() {
  return (
    <div className="board-container">
      <div style={{ display: 'flex', gap: '12px' }}>
        <SortableList />
      </div>
      <AddList />
    </div>
  );
}
