import './App.css';
import Drag from './components/drag';

const App = () => {
  const data = [{
    title: '1',
    items: ['1']
  },
  {
    title: '2',
    items: []
  },
  {
    title: '3',
    items: []
  },
  {
    title: '4',
    items: []
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