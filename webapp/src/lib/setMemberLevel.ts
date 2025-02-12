type member = { id: string; mother: string; father: string; name: string }
type memberWithLevel = member & { level: number }

export function groupMembersByLevel(arr: memberWithLevel[], depth: number): memberWithLevel[][] {
  if (!arr.length) {
    return []
  }
  return [
    arr.filter((value) => value.level === depth),
    ...groupMembersByLevel(
      arr.filter((value) => value.level !== depth),
      depth + 1
    ),
  ]
}

// TODO: update function with children search (also build tree functions)
export function setMemberLevel(currentMember: member, members: member[], level: number): memberWithLevel[] {
  // const memberChildrens = members.filter(
  //   (member) => member.mother === currentMember.id || member.father === currentMember.id
  // )
  const memberMother = members.find((member) => member.id === currentMember.mother)
  const memberFather = members.find((member) => member.id === currentMember.father)

  // const memberChildrensWithLevel = memberChildrens
  //   .map((children) => {
  //     return setMemberLevel(
  //       children,
  //       members.filter((member) => member.id !== children.mother && member.id !== children.father),
  //       level - 1
  //     )
  //   })
  //   .flatMap((member) => member)

  const memberMotherWithLevel = memberMother
    ? setMemberLevel(
        memberMother,
        members.filter((member) => member.id !== currentMember.id),
        level + 1
      )
    : []

  const memberFatherWithLevel = memberFather
    ? setMemberLevel(
        memberFather,
        members.filter((member) => member.id !== currentMember.id && member.mother !== currentMember.mother),
        level + 1
      )
    : []

  return [
    // ...memberChildrensWithLevel,
    ...memberMotherWithLevel,
    ...memberFatherWithLevel,
    { ...currentMember, level },
  ]
}
