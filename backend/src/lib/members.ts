import _ from 'lodash'

export const members = _.times(20, (i) => ({
  id: i.toString(),
  firstName: `First_Name_${i}`,
  lastName: `Last_Name_${i}`,
  role: `Role ${i}`,
  text: _.times(100, () => '<p>Some description text.</p>').join(''),
}))
