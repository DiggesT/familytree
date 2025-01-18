import { useState } from 'react'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'

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
        <Input name="firstName" label="First Name" state={state} setState={setState} />
        <Input name="lastName" label="Last Name" state={state} setState={setState} />
        <Input name="role" label="Role" state={state} setState={setState} />
        <Textarea name="text" label="Text" state={state} setState={setState} />

        <button type="submit">Create Member</button>
      </form>
    </Segment>
  )
}
