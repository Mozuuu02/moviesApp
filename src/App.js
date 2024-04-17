import React from "react";
import Header from "./Header";
import Cards from "./Cards";
import AddMovie from "./AddMovie";
import { Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import { createContext, useState } from "react";
import Signup from "./Signup";
import Loginn from "./Loginn";
const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <Appstate.Provider value={{login,userName,setLogin,setUserName}}>
    <div className="App relative">
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/AddMovie" element={<AddMovie />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/Login" element={<Loginn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate}