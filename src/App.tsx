import "./styles/global.css";

import Header from "./components/Header";
import Step0 from "./components/Step0";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

function App() {
  return (
    <div className="app">
      <Header />
      <Step0 />
      <Step1 />
      <Step2 />
      <Step3 />
    </div>
  );
}

export default App;