function Player(){
	return(
	 <div className="absolute w-screen h-screen top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center">
        {playerState === 0 && (
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
            <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-x animate-puls"></div>
            <img
              className="w-full h-full object-cover"
              src={channels[channelIndex].logo}
            />
          </div>
        )}
        {playerState === 2 && (
          <span className="relative flex text-xl text-white text-center">
            Une erreur c'est produite. <br /> Changement de chaine dans 5s
          </span>
        )}
      </div>

      <div className="w-screen h-screen object-cover relative z-0">
        {/*<ReactPlayer className="react-player z-0" url={channels[channelIndex].url} width="100%" height="100%" onReady={() => setPlayerState(1)} onError={() => setPlayerState(2)} playing={false} />*/}
      </div>
      )
}
export default Player