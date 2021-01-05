import { combineReducers } from 'redux'
import notification from './notification'
import blogs from './blogs'
import user from './user'


export default combineReducers({
  notification,
  blogs,
  user
})