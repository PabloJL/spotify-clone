import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";
export default function CardPlayButton({ id }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlaylistPlaying = isPlaying && currentMusic?.playlist.id === id;
  const handleClick = () => {
    if (isPlaylistPlaying) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({ songs, playlist, song: songs[0] });
      });
  };

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4"
    >
      {isPlaylistPlaying ? <Pause /> : <Play />}
    </button>
  );
}
