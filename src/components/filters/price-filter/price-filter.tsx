import cn from 'classnames';
import { DEFAULT_PAGE, PriceValidation } from '../../../const';
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
    min: PriceValidation;
    max: PriceValidation;
  };
  setIsPriceValid: ({
    min,
    max,
  }: {
    min: PriceValidation;
    max: PriceValidation;
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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceValue({
      ...priceValue,
      [name]: Number(value),
    });
  };

  const handleBlurMinPrice = () => {
    dispatch(setCurrentPage(DEFAULT_PAGE));
    searchParams.set('page', String(DEFAULT_PAGE));
    setSearchParams(searchParams);
    const isNotValidMinPrice =
      priceValue.min < 0 ||
      (priceValue.min > priceValue.max && priceValue.max !== 0);

    if (priceValue.min !== 0) {
      if (isNotValidMinPrice) {
        setIsPriceValid({
          ...isPriceValid,
          min: PriceValidation.Error,
        });
      } else {
        setIsPriceValid({
          ...isPriceValid,
          min: PriceValidation.Success,
        });
        dispatch(setActiveMinPrice(priceValue.min));
        searchParams.set('gte', String(priceValue.min));
        setSearchParams(searchParams);
      }
    } else {
      dispatch(setActiveMinPrice(0));
      searchParams.delete('gte');
      setSearchParams(searchParams);
      setIsPriceValid({
        ...isPriceValid,
        min: PriceValidation.Idle,
      });
    }
  };

  const handleBlurMaxPrice = () => {
    dispatch(setCurrentPage(DEFAULT_PAGE));
    searchParams.set('page', String(DEFAULT_PAGE));
    setSearchParams(searchParams);
    const isNotValidMaxPrice =
      priceValue.max < 0 ||
      (priceValue.max < priceValue.min && priceValue.min !== 0);

    if (priceValue.max !== 0) {
      if (isNotValidMaxPrice) {
        {
          setIsPriceValid({
            ...isPriceValid,
            max: PriceValidation.Error,
          });
        }
      } else {
        setIsPriceValid({
          ...isPriceValid,
          max: PriceValidation.Success,
        });
        dispatch(setActiveMaxPrice(priceValue.max));
        searchParams.set('lte', String(priceValue.max));
        setSearchParams(searchParams);
      }
    } else {
      dispatch(setActiveMaxPrice(0));
      searchParams.delete('lte');
      setSearchParams(searchParams);
      setIsPriceValid({
        ...isPriceValid,
        max: PriceValidation.Idle,
      });
    }
  };

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
            { 'is-valid': isPriceValid.min === PriceValidation.Success },
            { 'is-invalid': isPriceValid.min === PriceValidation.Error }
          )}
        >
          <label>
            <input
              type="number"
              name="min"
              placeholder={catalogPriceValue.min || ''}
              value={priceValue.min || ''}
              onBlur={handleBlurMinPrice}
              onChange={handlePriceChange}
            />
          </label>
        </div>
        <div
          className={cn(
            'custom-input',
            { 'is-valid': isPriceValid.max === PriceValidation.Success },
            { 'is-invalid': isPriceValid.max === PriceValidation.Error }
          )}
        >
          <label>
            <input
              type="number"
              name="max"
              placeholder={catalogPriceValue.max || ''}
              onBlur={handleBlurMaxPrice}
              value={priceValue.max || ''}
              onChange={handlePriceChange}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
