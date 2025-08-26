import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const PrivateRoute = ({children}) => {
  const token = useSelector((state) => state.auth.token);
  // console.log('Current token in PrivateRoute:', token);
  // console.log('PrivateRoute - Children:', children);
  return token? children : <Navigate to='/login'/>
}

export default PrivateRoute
