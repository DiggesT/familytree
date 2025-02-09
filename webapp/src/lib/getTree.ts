type row = { id: string; mother: string; father: string }
type sortedRow = row & { level: number }
export const getTree = ({
  currentRow,
  arr,
  depth,
  acc,
}: {
  currentRow: row
  arr: row[]
  depth: number
  acc: sortedRow[]
}): sortedRow[] => {
  const motherRow = arr.find((value) => value.id === currentRow.mother)
  const fatherRow = arr.find((value) => value.id === currentRow.father)

  const newAccM = motherRow ? getTree({ currentRow: motherRow, arr, depth: depth + 1, acc }) : acc
  const newAccF = fatherRow ? getTree({ currentRow: fatherRow, arr, depth: depth + 1, acc }) : acc

  return [...newAccM, ...newAccF, { ...currentRow, level: depth }]
}
