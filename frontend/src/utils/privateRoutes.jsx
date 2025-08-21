import { Navigate, Outlet } from 'react-router-dom';
const privateRoute = () => {
const token = localStorage.getItem('token');
return token ? <Outlet /> : <Navigate to="/login" />;
};
export default privateRoute;