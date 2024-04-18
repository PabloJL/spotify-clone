import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/store/playerStore";
import { Pause, Play } from "@/icons/Controls";
import { VolumeControl } from "./Controls/VolumeControl";
import { SongControl } from "./Controls/SongControl";
import { CurrentSong } from "./Controls/CurrentSong";

export default function Player() {
  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(
    (state) => state
  );

  const audioRef = useRef();

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const { song, playlist, songs } = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  }, [currentMusic]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50 text-white">
      <div className="w-[350px]">
        <CurrentSong {...currentMusic.song} />
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SongControl audio={audioRef} />
          <audio ref={audioRef} />
        </div>
      </div>
      <div className="grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
}
