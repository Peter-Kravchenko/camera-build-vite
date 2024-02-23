import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras-data/cameras-data.selectors';
import { TCamera } from '../../types/cameras';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

function SearchForm() {
  const cameras = useAppSelector(getCameras);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  let matchedCams: TCamera[] = cameras;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (searchValue) {
    matchedCams = cameras.filter((camera) =>
      camera.name.toLocaleLowerCase().match(searchValue.toLowerCase())
    );
  }

  useEffect(() => {
    if (matchedCams.length) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [matchedCams.length, searchValue]);

  return (
    <div className={cn('form-search', { 'list-opened': isOpen })}>
      <form>
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
            onBlur={() => {
              setTimeout(() => {
                setIsOpen(false);
              }, 300);
            }}
            autoComplete="off"
            placeholder="Поиск по сайту"
          />
        </label>
        <ul className="form-search__select-list">
          {matchedCams.map((camera) => (
            <li
              key={camera.id}
              className="form-search__select-item"
              tabIndex={-1}
              onClick={() => {
                navigate(AppRoute.Product.replace(':id', `${camera.id}`));
                setIsOpen(false);
                setSearchValue('');
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
