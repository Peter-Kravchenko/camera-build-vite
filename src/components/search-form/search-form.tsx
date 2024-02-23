import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras-data/cameras-data.selectors';
import { useNavigate } from 'react-router-dom';
import { AppRoute, TIMEOUT_DELAY } from '../../const';
import { filterCameras } from '../../utils/utils';
import { TCamera } from '../../types/cameras';

const searchValuePattern = /^[a-zA-Zа-яА-Я-0-9\s]+$/;

function SearchForm() {
  const cameras = useAppSelector(getCameras);
  const navigate = useNavigate();

  const [camerasList, setCamerasList] = useState(cameras);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSelectItem = (camera: TCamera) => {
    navigate(AppRoute.Product.replace(':id', `${camera.id}`));
    setIsOpen(false);
    setSearchValue('');
  };

  useEffect(() => {
    if (camerasList.length > 0 && searchValuePattern.test(searchValue)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    const debounce = setTimeout(() => {
      setCamerasList(filterCameras(searchValue, cameras));
    }, TIMEOUT_DELAY);
    return () => {
      clearTimeout(debounce);
    };
  }, [searchValue, cameras, camerasList]);

  return (
    <div className={cn('form-search', { 'list-opened': isOpen })}>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            value={searchValue}
            onChange={handleFormChange}
            autoComplete="off"
            placeholder="Поиск по сайту"
          />
        </label>
        <ul className="form-search__select-list">
          {camerasList.map((camera) => (
            <li
              key={camera.id}
              className="form-search__select-item"
              tabIndex={0}
              onClick={() => {
                handleSelectItem(camera);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSelectItem(camera);
                }
              }}
            >
              {camera.name}
            </li>
          ))}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={() => setSearchValue('')}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchForm;
