import { useGameMessageListener } from "../hooks/game";

export const Game = () => {
  useGameMessageListener();

  return (
    <div
      className="shadow-xl rounded-xl"
      style={{ height: "500px", width: "50%" }}
    >
      <iframe
        id="gameFrame"
        className="rounded-xl h-full w-full"
        allowFullScreen
        title="game"
        src="./build/experiment_01.html"
      />
    </div>
  );
};
