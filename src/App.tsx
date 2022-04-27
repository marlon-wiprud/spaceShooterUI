import "./App.css";
import { AuthProvider } from "./context/auth";
import { GameProvider } from "./context/game";
import { Game } from "./molecules/game";

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <div
          className="flex justify-center items-center flex-col"
          style={{ minHeight: "100vh" }}
        >
          <Game />
        </div>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
