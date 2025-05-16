import { useState } from "react";
import { Button, Typography, Paper, Box } from "@mui/material";

type Casilla = "X" | "O" | null;

function Tablero() {
  /*realizamos el tablero siendo tablero el estado actual
    y setTablero  la funcion para cambiar el tablero
    useState inicia el tablero con un valor inicial como un constructor
    El <Casilla[]> le estamos indicando que tablero va a ser un arreglo de Casillas
    su valor solo puede ser X|O|NULL
    luego indicamos que es un arreglo de 9 casillas y que se va a rellenar todas con <null></null>*/

  const [tablero, setTablero] = useState<Casilla[]>(Array(9).fill(null));

  // realizamos una constante que revise si x es el siguiente
  const [xSiguiente, setXSiguiente] = useState(true);

  //funcion EncontrarGanador
  //indico que va a recibir el parametro casillas que va a ser un arreglo de tipo Casilla y va a retornar X,Y O Null
  const encontrarGanador = (casillas: Casilla[]): Casilla => {
    //casillas ganadoras
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
    //recorremmos el arreglo
    //la variable linea revisa cada linea
    for (let linea of lineas) {
      const [a, b, c] = linea;
      if (
        casillas[a] &&
        casillas[a] === casillas[b] &&
        casillas[a] === casillas[c]
      ) {
        return casillas[a]; // <--- aquí estaba el error
      }
    }
    return null; //no  encuentra tres casillas iguales de las lineas ganadoras retorna null
  };

  //funcion para cuando se clickee una casilla
  const handleClick = (i: number) => {
    // si la casilla esta llena o hay ganador no se lleva a cabo
    if (tablero[i] || encontrarGanador(tablero)) return;
    //creamos una copia de el tablero
    const newTablero = tablero.slice();
    //marcamos la casilla presionada
    newTablero[i] = xSiguiente ? "X" : "O"; //VERDADERO X FALSO O
    setTablero(newTablero); //se actualiza el tablero con la function setTablero usando useState
    setXSiguiente(!xSiguiente); //se actualiza xSiguiente a su valor contrario
  };

  //funcion para ver el ganador
  const ganador = encontrarGanador(tablero);
  const estado = ganador
    ? `Ganador : ${ganador}`
    : tablero.every((casilla) => casilla)
    ? "Empate"
    : `Siguiente jugador: ${xSiguiente ? "X" : "O"}`;

  //funcion para resetear
  const resetJuego = () => {
    setTablero(Array(9).fill(null));
    setXSiguiente(true);
  };
  return (
    <Box // contenedor principal
      sx={{
        display: "flex", //activamos flexbox
        flexDirection: "column", // organiza en columna
        alignItems: "center", // va a colocar el contenido en el centro
        mt: 4, //margin top 4
      }}
    >
      <Typography variant="h3" gutterBottom>
        TRES EN RAYA
      </Typography>
      <Typography variant="h6" gutterBottom>
        {estado}
      </Typography>
      <Box //contenedor del tablero
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)", // 3 columnas de 100 px
          gridTemplateRows: "repeat(3, 100px)", //3 filas de 100 px
          gap: 1, //espacio entre casillas
          mt: 2, //margen superior
        }}
      >
        {tablero.map(
          (
            casilla,
            i //recorre el arreglo del tablero
          ) => (
            <Paper //cada elemento del tablero se le asigna un paper
              key={i}
              elevation={3}
              sx={{
                width: "100px",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: casilla
                  ? casilla === "X"
                    ? "#e3f2fd"
                    : "#ffebee"
                  : "#fff",
                fontSize: "2.5rem",
                userSelect: "none",
              }}
              onClick={() => handleClick(i)} // si se presiona ese paper se llama la funcion handleClick
            >
              {casilla}
            </Paper>
          )
        )}
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
