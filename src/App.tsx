import React, { Suspense } from "react";
import {
  Link,
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Transition from "./pages/Transition";
import AutomaticBatching from "./pages/AutomaticBatching";
import NewHooks from "./pages/NewHooks";

/*
function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tranisition">Transition</Link>
          </li>
          <li>
            <Link to="/automaticbatching">AutoMaticBatching</Link>
          </li>
          <li>
            <Link to="/newhooks">NewHooks</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/">
          <Transition />
        </Route>
        <Route path="/tranisition">
          <Transition />
        </Route>
        <Route path="/automaticbatching">
          <AutomaticBatching />
        </Route>
        <Route path="/newhooks">
          <NewHooks />
        </Route>
      </Routes>
    </Router>
  );
}

*/
const App: React.VFC = (_) => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tranisition">Transition</Link>
          </li>
          <li>
            <Link to="/automaticbatching">AutoMaticBatching</Link>
          </li>
          <li>
            <Link to="/newhooks">NewHooks</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route index element={<Transition />} />
        <Route path="tranisition" element={<Transition />} />
        <Route path="automaticbatching" element={<AutomaticBatching />} />
        <Route path="newhooks" element={<NewHooks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
