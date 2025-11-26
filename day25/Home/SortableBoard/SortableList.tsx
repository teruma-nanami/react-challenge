import { SortableCard } from './SortableCard';
import { AddCard } from './AddCard';

export function SortableList() {
  return (
    <div>
      <div className={`list`}>
          <div
            className="list-header"
            style={{
              cursor: 'grab',
            }}
          >
          <h3 className="list-title">テストリスト</h3>
          <button className="list-options">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
        <div
          style={{
            minHeight: '1px',
          }}
        >
          <SortableCard />
        </div>
        <AddCard />
      </div>
    </div>
  );
}
