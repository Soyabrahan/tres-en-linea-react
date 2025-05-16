import { useState } from "react";
import { Button, Typography, Paper, Box } from "@mui/material";

type Casilla = "X" | "O" | null;

// Cambia la función para devolver los índices ganadores
function encontrarGanador(casillas: Casilla[]): number[] | null {
  const lineas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let linea of lineas) {
    const [a, b, c] = linea;
    if (
      casillas[a] &&
      casillas[a] === casillas[b] &&
      casillas[a] === casillas[c]
    ) {
      return [a, b, c]; // Devuelve los índices ganadores
    }
  }
  return null;
}

function Tablero() {
  const [tablero, setTablero] = useState<Casilla[]>(Array(9).fill(null));
  const [xSiguiente, setXSiguiente] = useState(true);

  // Ahora ganador es un array de índices o null
  const indicesGanadores = encontrarGanador(tablero);
  const ganador = indicesGanadores ? tablero[indicesGanadores[0]] : null;

  const estado = ganador
    ? `Ganador : ${ganador}`
    : tablero.every((casilla) => casilla)
    ? "Empate"
    : `Siguiente jugador: ${xSiguiente ? "X" : "O"}`;

  const handleClick = (i: number) => {
    if (tablero[i] || ganador) return;
    const newTablero = tablero.slice();
    newTablero[i] = xSiguiente ? "X" : "O";
    setTablero(newTablero);
    setXSiguiente(!xSiguiente);
  };

  const resetJuego = () => {
    setTablero(Array(9).fill(null));
    setXSiguiente(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        TRES EN RAYA
      </Typography>
      <Typography variant="h6" gutterBottom>
        {estado}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridTemplateRows: "repeat(3, 100px)",
          gap: 1,
          mt: 2,
        }}
      >
        {tablero.map((casilla, i) => {
          // Si la casilla está en los índices ganadores, ponla verde
          const esGanadora = indicesGanadores?.includes(i);
          return (
            <Paper
              key={i}
              elevation={3}
              sx={{
                width: "100px",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: esGanadora
                  ? "#66bb6a" // verde para ganadoras
                  : casilla
                  ? casilla === "X"
                    ? "#e3f2fd"
                    : "#ffebee"
                  : "#fff",
                fontSize: "2.5rem",
                userSelect: "none",
                transition: "background 0.3s",
              }}
              onClick={() => handleClick(i)}
            >
              {casilla}
            </Paper>
          );
        })}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={resetJuego}
      >
        Reiniciar Juego
      </Button>
    </Box>
  );
}

export default Tablero;
