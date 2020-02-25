import React, { useState, useEffect } from "react"
import useTwilioVideo from "../../hooks/use-twilio-video"
import { navigate } from "gatsby"

const Join = ({ location }) => {
  const defaultRoom = (location && location.state && location.state.room) || ""
  const { getParticipantToken, room: roomName, token } = useTwilioVideo()
  const [identity, setIdentity] = useState("")
  const [room, setRoom] = useState(defaultRoom)

  useEffect(() => {
    if (token && roomName) {
      navigate(`/user/room/${roomName}`)
    }
  }, [token, roomName])

  const handleSubmit = async event => {
    event.preventDefault()

    getParticipantToken({ identity, room })
  }

  return (
    <>
      <h1>Start or Join a Video Chat</h1>
      <form onSubmit={handleSubmit} className="start-form">
        <label htmlFor="identity">
          Display name:
          <input
            type="text"
            id="identity"
            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={identity}
            onChange={e => setIdentity(e.target.value)}
          />
        </label>
        <label htmlFor="room">
          Which room do you want to join?
          <input
            type="text"
            id="room"
            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={room}
            onChange={e => setRoom(e.target.value)}
          />
        </label>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Join Video Chat
        </button>
      </form>
    </>
  )
}

export default Join
