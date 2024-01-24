import { create } from "zustand";
import GROUPS from "../groups.json";
import CHANNELS from "../channels.json";

const useGlobalStore = create((set) => ({
  channels: [],
  groups: GROUPS,
  channelActiveIndex: 0,
  groupActiveIndex: 2,
  playing: false,
  playerState: 1,
  currentPlay: null,
  setChannels: () =>
    set((state) => ({
      channels: CHANNELS.filter(
        (channel) => channel.group === GROUPS[state.groupActiveIndex].id
      ),
    })),
  setGroupActiveIndex: (index) => set((state) => ({ groupActiveIndex: index })),
  setChannelActiveIndex: (index) => set({ channelActiveIndex: index }),
  setCurrentPlay: (channel) => set({ currentPlay: channel }),
  setPlayerState: (state) => set({ playerState: state }),
  setPlaying: (bool) => set({ playing: bool }),
}));

export default useGlobalStore;
