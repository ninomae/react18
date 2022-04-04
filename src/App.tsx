import React, { Suspense } from "react";
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Transition from "./pages/Transition";
import NewHooks from "./pages/NewHooks";
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
            <Link to="/newhooks">NewHooks</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route index element={<Transition />} />
        <Route path="tranisition" element={<Transition />} />
        <Route path="newhooks" element={<NewHooks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
