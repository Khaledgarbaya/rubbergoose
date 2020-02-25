import React, { useEffect } from "react"
import { navigate } from "gatsby"
import useTwilioVideo from "../../hooks/use-twilio-video"
import DashboardNav from "../../components/dashbaord-nav"
const VideoDisplay = ({ roomID }) => {
  const {
    token,
    videoRef,
    activeRoom,
    startVideo,
    leaveRoom,
  } = useTwilioVideo()
  const shareScreen = () => {}
  useEffect(() => {
    if (!roomID) {
      navigate("/user/screen-capture")
    }

    if (!token) {
      navigate("/user/screen-capture", { state: { room: roomID } })
    }

    if (!activeRoom) {
      startVideo()
    }

    // Add a window listener to disconnect if the tab is closed. This works
    // around a looooong lag before Twilio catches that the video is gone.
    window.addEventListener("beforeunload", leaveRoom)

    return () => {
      window.removeEventListener("beforeunload", leaveRoom)
    }
  }, [token, roomID, activeRoom, startVideo, leaveRoom])

  return (
    <div className="container mx-auto">
      <DashboardNav />
      <div className="w-full shadow rounded-lg p-8 bg-white">
        <h1>Room: “{roomID}”</h1>
        {activeRoom && (
          <>
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              onClick={leaveRoom}
            >
              Leave Room
            </button>

            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              onClick={shareScreen}
            >
              Share screen
            </button>
          </>
        )}
        <div className="chat" ref={videoRef} />
      </div>
    </div>
  )
}

export default VideoDisplay
