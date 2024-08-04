import React, { useState, useEffect } from 'react';
import useGlobalStore from "./stores/useGlobalStore";
import GroupList from "./components/groups/group-list";
import ChannelList from "./components/channels/channel-list";
import Clock from "./components/clock";
import PlayerControl from "./components/player/player-control";
import Player from "./components/player/player";

function App(){
    const { playerState,fetchChannels } = useGlobalStore();
    const [inactive, setInactive] = useState(false);

    useEffect(() => {
        fetchChannels();
    }, []);

    // useEffect(() => {
    //     let timeoutId: NodeJS.Timeout;
    //
    //     const resetTimer = () => {
    //         if (timeoutId) {
    //             clearTimeout(timeoutId);
    //         }
    //
    //         timeoutId = setTimeout(() => {
    //             setInactive(true);
    //         }, 5000);
    //     };
    //
    //     const handleUserActivity = () => {
    //         if (playerState != 2) return;
    //         setInactive(false);
    //         resetTimer();
    //     };
    //
    //     window.addEventListener("mousemove", handleUserActivity);
    //     window.addEventListener("keydown", handleUserActivity);
    //
    //     return () => {
    //         window.removeEventListener("mousemove", handleUserActivity);
    //         window.removeEventListener("keydown", handleUserActivity);
    //         clearTimeout(timeoutId);
    //     };
    // }, [playerState]);

    return (
        <div className="w-screen h-screen overflow-hidden bg-black z-0 relative text-white">
            <div
                className={` ${
                    inactive
                        ? "bg-none"
                        : "bg-gradient-to-r from-black/50 via-black/30 to-black/50"
                } h-screen w-screen flex absolute left-0 top-0 bottom-0 z-50 p-0`}
            >
                <div
                    className={`${
                        inactive ? "-translate-x-full -ml-5" : "translate-x-0"
                    } flex w-[700px] bg-white/10 overflow-hidden backdrop-blur-2xl  shadow-2xl relative duration-100 transition-all ease-in-out`}
                >
                    <GroupList/>
                    <ChannelList/>
                </div>

                <div
                    className={`${
                        inactive ? "translate-x-full" : "translate-x-0"
                    } w-2/3 h-full flex flex-col justify-between items-center p-10`}
                >
                    <Clock/>
                    <PlayerControl inactive={inactive}/>
                </div>
            </div>

            <Player/>
        </div>
    )
}

export default App;