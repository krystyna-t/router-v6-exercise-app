import logo from './logo.svg';
import './App.css';
import UserProfile from './UserProfile.js';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, useNavigate } from "react-router-dom";

function Home() {
  return <p>Home</p>;
}

function About() {
  return <p>About</p>;
}

function NoMatch() {
  const location = useLocation();

  return (
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  );
}

// function UserProfile() {
//   const params = useParams();
//   return <p>{JSON.stringify(params)}</p>;
// }

function BackButton() {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate(-1)}>
      Go Back
    </button>
  );
}

function ForwardButton() {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate(1)}>
      Go Forward
    </button>
  );
}

function GoHomeButton() {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate("/")}>
      Go Home
    </button>
  );
}

function App() {
  const userId = [1, 2, 3, 4, 5];

  return (
    <Router>
      <div className="App">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <br />
        <h1>Navbar</h1>
        {
          userId.map((id) => (
            <div key={id}>
              <Link to={`/user/${id}`}>User {id}</Link>
            </div>
          ))}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="*" element={<NoMatch/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
