import './App.css';
import Drag from './components/drag';

const App = () => {
  const data = [{
    title: '1',
    video: true
  },
  {
    title: '2',
    video: false
  },
  {
    title: '3',
    video: false
  },
  {
    title: '4',
    video: false
  }]
  return (
    <div className="App" >
      <div className="container">
        <Drag data={data} />
      </div>
    </div>
  );
}

export default App;