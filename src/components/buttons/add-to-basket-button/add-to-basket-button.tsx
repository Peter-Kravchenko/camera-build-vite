import { useAppDispatch } from '../../../hooks';
import { openAddToBasketModal } from '../../../store/modal-process/modal-process.slice';

function AddToBasketButton(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(openAddToBasketModal())}
      className="btn btn--purple"
      type="button"
    >
      <svg width={24} height={16} aria-hidden="true">
        <use xlinkHref="#icon-add-basket" />
      </svg>
      Добавить в корзину
    </button>
  );
}

export default AddToBasketButton;
