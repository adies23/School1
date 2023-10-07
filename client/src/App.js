import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './page/Home';
import General from './page/General';
import CreateNewUser from './page/CreateNewUser';
import AdminPage from './page/AdminPage';
import Navigation from './component/Navigation';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="*" element = {<Home />}/>
          <Route path="/general" element={<General />}/>
          <Route path="/createNewUser" element={<CreateNewUser />}/>
          <Route path="/adminPage" element={<AdminPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
