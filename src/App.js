import "./App.css";
// import Header from './components/Header';
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ContentContainer from "./components/ContentContainer";
import CountryInfoPage from "./components/CountryInfoPage";
import ErrorElement from "./components/ErrorElement";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Layout darkMode={darkMode} setDarkMode={setDarkMode} />}
          errorElement={<ErrorElement />}
        >
          <Route
            path="/"
            element={
              <ContentContainer darkMode={darkMode} setDarkMode={setDarkMode} />
            }
            errorElement={<ErrorElement />}
          />
          <Route
            path=":country"
            element={<CountryInfoPage darkMode={darkMode} />}
            errorElement={<ErrorElement />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
