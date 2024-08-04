import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import GROUPS from "../data/groups";
import {ChannelsType, GroupType} from "../utils/interfaces";
import {getChannels} from "../services/channels";

interface globalStoreType {
    channels: ChannelsType[],
    filteredChannels: ChannelsType[],
    groups: GroupType[],
    channelActiveIndex: number,
    groupActive: string,
    playing: boolean,
    playerState: number,
    currentPlay: ChannelsType | null,
    fetchChannels: () => void
    setGroupActive: (group: string) => void
    setChannelActiveIndex: (index: number) => void
    setCurrentPlay: (channel: ChannelsType) => void
    setPlayerState: (state: number) => void
    setPlaying: (bool: boolean) => void
}

const useGlobalStore = create<globalStoreType>()(
  persist((set, get) => ({
      channels: [],
      filteredChannels:[],
      groups: GROUPS,
      channelActiveIndex: 0,
      groupActive: "Sport",
      playing: false,
      playerState: 0,
      currentPlay: null,
      setChannelActiveIndex: (index: number) => set({ channelActiveIndex: index }),
      setCurrentPlay: (channel: ChannelsType) => set({ currentPlay: channel }),
      setPlayerState: (state: number) => set({ playerState: state }),
      setPlaying: (bool: boolean) => set({ playing: bool }),
      setGroupActive: (group: string) => {
          const CHANNELS = get().channels
          const filteredChannels = CHANNELS.filter((channel) => channel.group === group)
          set({ groupActive: group, filteredChannels })
      },
      fetchChannels: async () =>{
          const channels = await getChannels()
          const ACTIVEGROUP = get().groupActive
          const filteredChannels = channels.filter((channel) => channel.group === ACTIVEGROUP)

          set({ channels, filteredChannels })
      }
    }),
    {
      name: "_stv_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGlobalStore;
