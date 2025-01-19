import _ from 'lodash'

export const members = _.times(20, (i) => ({
  id: i.toString(),
  name: `Name ${i}`,
  role: `Role ${i}`,
  text: _.times(100, () => '<p>Some description text.</p>').join(''),
}))
