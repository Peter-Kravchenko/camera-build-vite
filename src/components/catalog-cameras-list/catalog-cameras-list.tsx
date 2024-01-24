import { TCameras } from '../../types/cameras';
import CameraCard from '../camera-card/camera-card';

type CatalogCamerasListProps = {
  cameras: TCameras;
};

function CatalogCamerasList({ cameras }: CatalogCamerasListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => (
        <CameraCard key={camera.id} camera={camera} />
      ))}
    </div>
  );
}

export default CatalogCamerasList;
