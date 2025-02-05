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
import CandidateDashboard from './Pages/CandidateDashboard';
import Application from './Pages/Application';
import ViewApplications from './Components/ViewApplications';
import UpdateJob from './Components/UpdateJob';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route  path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/recruiter/:UserID" element={<Recruiter/>}/>
        <Route path="/candidate/:UserID" element={<Candidate/>}/>
        <Route path="/recruiter/dashboard/:id" element={<RecruiterDashboard/>}/>
        <Route path="/candidate/dashboard/:id" element={<CandidateDashboard/>}/>
        <Route path="/candidate/apply/:id/:ListingID" element={<Application/>}/>
        <Route path='/recruiters/applications/:id/:ListingID' element={<ViewApplications/>}/>
        <Route path='/updatejob/:ListingID' element={<UpdateJob/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
