// One fixed background behind the whole page: soft white/violet light blobs
// drifting slowly, under a faint grid that pans and has a few glowing cells.
const CELL = 56

const cells = [
  [3, 2, 0],
  [9, 4, 1.6],
  [15, 1, 3.1],
  [5, 8, 2.2],
  [12, 9, 0.8],
  [18, 6, 4],
  [2, 13, 3.6],
  [8, 15, 1.2],
  [16, 13, 2.8],
  [21, 10, 0.4],
  [23, 3, 2],
  [26, 14, 3.3],
]

export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <span className="bd-blob b1" />
      <span className="bd-blob b2" />
      <span className="bd-blob b3" />
      <span className="bd-blob b4" />
      <div className="bd-grid-mask">
        <div className="bd-grid" style={{ '--cell': `${CELL}px` }}>
          {cells.map(([x, y, delay]) => (
            <span
              key={`${x}-${y}`}
              className="bd-cell"
              style={{ left: x * CELL, top: y * CELL, width: CELL, height: CELL, animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
