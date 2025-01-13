export const App = () => {
  const members = [
    { id: '1', name: 'Selezneva Elena', description: 'Mother' },
    { id: '2', name: 'Parkhomenko Borris', description: 'Father' },
  ]

  return (
    <div>
      <h1>Family Tree</h1>
      {members.map((member) => {
        return (
          <div key={member.id}>
            <h2>{member.name}</h2>
            <p>{member.description}</p>
          </div>
        )
      })}
    </div>
  )
}
