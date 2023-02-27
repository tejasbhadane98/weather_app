import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom"
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
