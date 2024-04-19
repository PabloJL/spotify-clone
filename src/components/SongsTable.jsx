import { usePlayerStore } from "@/store/playerStore";

export default function SongsTable({ songInfo, index }) {
  const { setCurrentMusic, currentMusic } = usePlayerStore((state) => state);
  const { song, songs, playlist } = currentMusic;
  const handleClick = () => {
    setCurrentMusic({ songs, playlist, song: songs[songInfo.id] });
  };
  return (
    <tr class="border-spacing-0 text-gray-300 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300">
      <td class="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5">{index + 1}</td>
      <td class="px-4 py-2 flex gap-3">
        <picture class="">
          <img src={songInfo.image} alt={songInfo.title} class="w-11 h-11" />
        </picture>
        <div class="flex flex-col">
          <h3 class="text-white text-base font-normal">{songInfo.title}</h3>
          <span>{songInfo.artists.join(", ")}</span>
        </div>
      </td>
      <td class="px-4 py-2">{songInfo.album}</td>
      <td class="px-4 py-2 rounded-tr-lg rounded-br-lg">{songInfo.duration}</td>
    </tr>
  );
}
