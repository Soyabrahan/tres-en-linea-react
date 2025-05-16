import "./App.css";
import Tablero from "./components/Tablero";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#1B1E23",
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Tablero />
    </div>
  );
}

export default App;
