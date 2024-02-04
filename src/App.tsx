import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LayoutGpt } from "./components";
import { axiosInterceptor } from "./services/axiosInterceptor";
axiosInterceptor();

function App() {
  return (
    <div>
      <LayoutGpt />
    </div>
  );
}

export default App;
