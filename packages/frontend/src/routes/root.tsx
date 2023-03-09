import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Outlet } from 'react-router-dom';

export const Root = () => (
  <>
    <Header isAdmin={false} logout={() => console.log('logout')} />
    <Outlet />
    {/* <Footer /> */}
  </>
);
