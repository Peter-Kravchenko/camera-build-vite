import cn from 'classnames';
import { DEFAULT_PAGE, ValidationMap } from '../../../const';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import {
  setCurrentPage,
  setActiveMinPrice,
  setActiveMaxPrice,
} from '../../../store/app-process/app-process.slice';
import {
  getCatalogMinValue,
  getCatalogMaxValue,
  getMinCamPrice,
  getMaxCamPrice,
} from '../../../utils/utils';
import { TMaxPrice, TMinPrice } from '../../../types/state';
import { TCameras } from '../../../types/cameras';

type TPriceFilterProps = {
  cameras: TCameras;
  activeMinPrice: TMinPrice;
  activeMaxPrice: TMaxPrice;
  isPriceValid: {
    min: ValidationMap;
    max: ValidationMap;
  };
  setIsPriceValid: ({
    min,
    max,
  }: {
    min: ValidationMap;
    max: ValidationMap;
  }) => void;
};

function PriceFilter({
  cameras,
  activeMinPrice,
  activeMaxPrice,
  isPriceValid,
  setIsPriceValid,
}: TPriceFilterProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [catalogPriceValue, setCatalogPriceValue] = useState({
    min: '',
    max: '',
  });

  const [priceValue, setPriceValue] = useState({
    min: activeMinPrice,
    max: activeMaxPrice,
  });

  const handlePriceValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceValue({
      ...priceValue,
      [name]: Number(value),
    });
  };

  const handleMinPrice = () => {
    dispatch(setCurrentPage(DEFAULT_PAGE));
    searchParams.set('page', String(DEFAULT_PAGE));
    setSearchParams(searchParams);
    const isNotValidMinPrice =
      priceValue.min < 0 ||
      priceValue.min > Number(catalogPriceValue.max) ||
      (priceValue.min > priceValue.max && priceValue.max !== 0);

    if (priceValue.min === 0) {
      dispatch(setActiveMinPrice(0));
      searchParams.delete('gte');
      setSearchParams(searchParams);
      setIsPriceValid({
        ...isPriceValid,
        min: ValidationMap.Idle,
      });
    } else {
      if (isNotValidMinPrice) {
        setPriceValue({ ...priceValue, min: Number(catalogPriceValue.min) });
      } else {
        setIsPriceValid({
          ...isPriceValid,
          min: ValidationMap.Success,
        });
        dispatch(setActiveMinPrice(priceValue.min));
        searchParams.set('gte', String(priceValue.min));
        setSearchParams(searchParams);
      }
    }
  };

  const handleMinPriceKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleMinPrice();
    }
  };

  const handleMinPriceBlur = () => handleMinPrice();

  const handleMaxPrice = () => {
    dispatch(setCurrentPage(DEFAULT_PAGE));
    searchParams.set('page', String(DEFAULT_PAGE));
    setSearchParams(searchParams);
    const isNotValidMaxPrice =
      priceValue.max < 0 ||
      (priceValue.max < priceValue.min && priceValue.min !== 0);

    if (priceValue.max === 0) {
      dispatch(setActiveMaxPrice(0));
      searchParams.delete('lte');
      setSearchParams(searchParams);
      setIsPriceValid({
        ...isPriceValid,
        max: ValidationMap.Idle,
      });
    } else {
      if (isNotValidMaxPrice) {
        {
          setPriceValue({ ...priceValue, max: Number(catalogPriceValue.max) });
        }
      } else {
        setIsPriceValid({
          ...isPriceValid,
          max: ValidationMap.Success,
        });
        dispatch(setActiveMaxPrice(priceValue.max));
        searchParams.set('lte', String(priceValue.max));
        setSearchParams(searchParams);
      }
    }
  };

  const handleMaxPriceKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleMaxPrice();
    }
  };

  const handleMaxPriceBlur = () => handleMaxPrice();

  useEffect(() => {
    const catalogMinValue = getCatalogMinValue(cameras);
    const catalogMaxValue = getCatalogMaxValue(cameras);

    const minPriceValue = getMinCamPrice(catalogMinValue, activeMinPrice);
    const maxPriceValue = getMaxCamPrice(catalogMaxValue, activeMaxPrice);

    setPriceValue({
      min: minPriceValue,
      max: maxPriceValue,
    });

    setCatalogPriceValue({
      min: String(catalogMinValue),
      max: String(catalogMaxValue),
    });
  }, [activeMinPrice, activeMaxPrice, cameras]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>

      <div className="catalog-filter__price-range">
        <div
          className={cn(
            'custom-input',
            { 'is-valid': isPriceValid.min === ValidationMap.Success },
            { 'is-invalid': isPriceValid.min === ValidationMap.Error }
          )}
        >
          <label>
            <input
              type="number"
              name="min"
              placeholder={catalogPriceValue.min || ''}
              value={priceValue.min || ''}
              onBlur={handleMinPriceBlur}
              onKeyDown={handleMinPriceKeydown}
              onChange={handlePriceValueChange}
            />
          </label>
        </div>
        <div
          className={cn(
            'custom-input',
            { 'is-valid': isPriceValid.max === ValidationMap.Success },
            { 'is-invalid': isPriceValid.max === ValidationMap.Error }
          )}
        >
          <label>
            <input
              type="number"
              name="max"
              placeholder={catalogPriceValue.max || ''}
              value={priceValue.max || ''}
              onBlur={handleMaxPriceBlur}
              onKeyDown={handleMaxPriceKeydown}
              onChange={handlePriceValueChange}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
