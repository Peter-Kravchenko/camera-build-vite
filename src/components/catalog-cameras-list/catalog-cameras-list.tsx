import { CardType } from '../../const';
import { TCameras } from '../../types/cameras';
import CameraCard from '../camera-card/camera-card';

type CatalogCamerasListProps = {
  cameras: TCameras;
};

function CatalogCamerasList({ cameras }: CatalogCamerasListProps): JSX.Element {
  return (
    <div className="cards catalog__cards" data-testid="catalog-cameras-list">
      {cameras.map((camera) => (
        <CameraCard key={camera.id} camera={camera} cardType={CardType.Catalog} />
      ))}
    </div>
  );
}

export default CatalogCamerasList;
