export const TreeMemberIcon = ({ name = 'No name', x, y }: { name: string; x: number; y: number }) => {
  return (
    <svg width="100" height="100" x={x} y={y}>
      <rect x="0" y="0" width="100" height="100" rx="10" fill="#4b4b4b" />
      <rect x="2" y="2" width="96" height="96" rx="8" fill="white" />

      <circle cx="50" cy="25" r="15" fill="#a5a5a5" />
      <path d="M30 60 C 30 35, 70 35, 70 60" fill="#a5a5a5" />

      <text x="50" y="80" fontSize="9" textAnchor="middle">
        {name}
      </text>
    </svg>
  )
}
