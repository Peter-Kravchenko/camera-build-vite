import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras-data/cameras-data.selectors';
import { useNavigate } from 'react-router-dom';
import { AppRoute, TIMEOUT_DELAY } from '../../const';
import { searchCameras } from '../../utils/utils';
import { TCamera, TCameras } from '../../types/cameras';

const searchValuePattern = /^[a-zA-Zа-яА-Я-0-9\s]+$/;

function SearchForm() {
  const cameras = useAppSelector(getCameras);
  const navigate = useNavigate();

  const [camerasList, setCamerasList] = useState<TCameras>(cameras);
  const [isOpenList, setIsOpenList] = useState<boolean>(false);
  const [isOpenReset, setIsOpenReset] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const searchRef = useRef<HTMLUListElement>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSelectItem = (camera: TCamera) => {
    navigate(AppRoute.Product.replace(':id', `${camera.id}`));
    setIsOpenList(false);
    setIsOpenReset(false);
    setSearchValue('');
  };

  const handleSearchKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchValue('');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const firstChild = searchRef.current?.childNodes[0] as HTMLLIElement;
      firstChild.focus();
    }
  };

  const moveFocusDown = (e: React.KeyboardEvent) => {
    const childs = Array.from(
      searchRef.current?.childNodes || []
    ) as HTMLLIElement[];
    e.preventDefault();
    const activeItem = document.activeElement;

    for (let i = 0; i < childs.length; i++) {
      const listLength = childs.length;
      if (activeItem === childs[i] && activeItem !== childs[listLength - 1]) {
        childs[i + 1].focus();
      }
    }
  };

  const moveFocusUp = (e: React.KeyboardEvent) => {
    e.preventDefault();
    const childs = Array.from(
      searchRef.current?.childNodes || []
    ) as HTMLLIElement[];
    const activeItem = document.activeElement;
    for (let i = 0; i < childs.length; i++) {
      if (activeItem === childs[i] && activeItem !== childs[0]) {
        childs[i - 1].focus();
      }
    }
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      setIsOpenReset(true);
    } else {
      setIsOpenReset(false);
    }
    if (
      searchValue.length > 2 &&
      camerasList.length > 0 &&
      searchValuePattern.test(searchValue)
    ) {
      setIsOpenList(true);
    } else {
      setIsOpenList(false);
    }
  }, [searchValue, camerasList]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setCamerasList(searchCameras(searchValue, cameras));
    }, TIMEOUT_DELAY);
    return () => {
      clearTimeout(debounce);
    };
  }, [searchValue, cameras]);

  return (
    <div
      className={cn('form-search', { 'list-opened': isOpenList })}
      data-testid="search-form"
    >
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
            onKeyDown={handleSearchKeydown}
          />
        </label>
        <ul className="form-search__select-list" ref={searchRef}>
          {camerasList.map((camera, index) => (
            <li
              key={camera.id}
              id={`search-item-${index}`}
              className="form-search__select-item"
              tabIndex={0}
              onClick={() => {
                handleSelectItem(camera);
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') {
                  handleSelectItem(camera);
                }
                if (e.key === 'ArrowDown') {
                  moveFocusDown(e);
                }
                if (e.key === 'ArrowUp') {
                  moveFocusUp(e);
                }
                if (e.key === 'Escape') {
                  setSearchValue('');
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
        style={{ display: isOpenReset ? 'block' : 'none' }}
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
