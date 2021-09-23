import Calculator from "./components/Calculator";
import { ReactComponent as Logo } from "./icons/logo.svg";

const App = () => {
  return (
    <main className="main pad">
      <div className="container">
        <h1 className="logo" aria-label="splitter: tip calculator">
          <Logo />
        </h1>
        <Calculator />
      </div>
    </main>
  );
};

export default App;
