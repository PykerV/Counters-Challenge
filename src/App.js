import './App.css';
import styles from './App.module.scss';
import MultipleCounters from './Components/multipleCounters';

function App() {
  return (
    <div className={styles['app-container']}>
      <MultipleCounters />
    </div>
  );
}

export default App;
