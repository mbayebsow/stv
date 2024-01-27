import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import GROUPS from "../data/groups.json";
import CHANNELS from "../data/channels.json";

const useGlobalStore = create(
  persist(
    (set) => ({
      channels: [],
      groups: GROUPS,
      channelActiveIndex: 0,
      groupActiveIndex: 1,
      playing: false,
      playerState: 0,
      currentPlay: null,
      setChannels: () =>
        set((state) => ({
          channels: CHANNELS.filter(
            (channel) => channel.group === GROUPS[state.groupActiveIndex].id
          ),
        })),
      setGroupActiveIndex: (index) =>
        set((state) => ({ groupActiveIndex: index })),
      setChannelActiveIndex: (index) => set({ channelActiveIndex: index }),
      setCurrentPlay: (channel) => set({ currentPlay: channel }),
      setPlayerState: (state) => set({ playerState: state }),
      setPlaying: (bool) => set({ playing: bool }),
    }),
    {
      name: "_stv_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGlobalStore;
