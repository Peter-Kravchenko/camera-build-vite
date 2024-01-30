import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <main>
      <h1
        className="title title--h2"
        style={{ textAlign: 'center', paddingTop: '100px' }}
      >
        Ошибка 404, страница не найдена <br />
        <Link to={AppRoute.Catalog}>Вернуться на главную</Link>
      </h1>
    </main>
  );
}

export default NotFoundPage;
