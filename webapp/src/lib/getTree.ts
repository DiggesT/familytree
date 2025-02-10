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
  const childrensRows = arr.filter((value) => value.mother === currentRow.id || value.father === currentRow.id)
  const motherRow = arr.find((value) => value.id === currentRow.mother)
  const fatherRow = arr.find((value) => value.id === currentRow.father)

  const newAccC = childrensRows
    .map((value) => {
      return getTree({
        currentRow: value,
        arr: arr.filter((value2) => value2.id !== value.mother && value2.id !== value.father),
        depth: depth - 1,
        acc,
      })
    })
    .flatMap((value) => value)

  const newAccM = motherRow
    ? getTree({ currentRow: motherRow, arr: arr.filter((value) => value.id !== currentRow.id), depth: depth + 1, acc })
    : []

  const newAccF = fatherRow
    ? getTree({
        currentRow: fatherRow,
        arr: arr.filter((value) => value.id !== currentRow.id && value.mother !== currentRow.mother),
        depth: depth + 1,
        acc,
      })
    : []

  return [...newAccC, ...newAccM, ...newAccF, { ...currentRow, level: depth }]
}
