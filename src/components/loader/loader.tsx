import { TailSpin } from 'react-loader-spinner';
import './loader.css';

function Loader(): JSX.Element {
  return (
    <main className="loader-container">
      <span className="loader">
        <TailSpin color="#525288" height={150} width={150} />
      </span>
    </main>
  );
}

export default Loader;
