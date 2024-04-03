import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import SignUp from './Pages/Signup';
import Login from './Pages/Login';
import Recruiter from './Pages/Recruiter';
import Candidate from './Pages/Candidate';
import RecruiterDashboard from './Pages/RecruiterDashboard';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route  path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/recruiter" element={<Recruiter/>}/>
        <Route path="/candidate" element={<Candidate/>}/>
        <Route path="recruiter/dashboard/:id" element={<RecruiterDashboard/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
