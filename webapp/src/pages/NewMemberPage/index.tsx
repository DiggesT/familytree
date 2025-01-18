import { useState } from 'react'
import { Segment } from '../../components/Segment'

export const NewMemberPage = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    role: '',
    text: '',
  })
  return (
    <Segment title="New Member">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.info('Submitted', state)
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="firstName">First Name</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setState({ ...state, firstName: e.target.value })
            }}
            value={state.firstName}
            name="firstName"
            id="firstName"
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="lastName">Last Name</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setState({ ...state, lastName: e.target.value })
            }}
            value={state.lastName}
            name="lastName"
            id="lastName"
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="role">Role</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setState({ ...state, role: e.target.value })
            }}
            value={state.role}
            name="role"
            id="role"
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="text">Text</label>
          <br />
          <textarea
            onChange={(e) => {
              setState({ ...state, text: e.target.value })
            }}
            value={state.text}
            name="text"
            id="text"
          />
        </div>

        <button type="submit">Create Member</button>
      </form>
    </Segment>
  )
}
