import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useSelector } from 'react-redux';
import { getModalStatus } from '../../store/modal-process/modal-process.selectors';

function Layout(): JSX.Element {
  const isModalopen = useSelector(getModalStatus);

  if (
    isModalopen.isModalAddReviewOpen ||
    isModalopen.isModalAddToBasketOpen ||
    isModalopen.isModalAddReviewSuccessOpen ||
    isModalopen.isModalAddToBasketSuccessOpen
  ) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
