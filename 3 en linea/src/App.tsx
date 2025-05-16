import "./App.css";
import Tablero from "./components/Tablero";

function App() {
  return (
    <div
      style={{
        backgroundImage: "url('/background.png')", // <-- así debe ir
        backgroundSize: "cover",
        backgroundPosition: "center",
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
