import {
  SAVE_SOCKET,
  SAVE_PLAYERS,
  START_GAME,
  PLAYER_READY
} from "../actions/types";

const intitalState = {
  socket: null,
  room: null,
  players: null,
  playerCount: 0,
  gameStarted: false,
  allReadyToPlay: false
};

export default function(state = intitalState, action) {
  switch (action.type) {
    case SAVE_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    case SAVE_PLAYERS:
      return {
        ...state,
        players: action.payload.players,
        room: action.payload.room,
        playerCount: action.payload.playerCount
      };
    case START_GAME:
      return {
        ...state,
        gameStarted: true
      };
    case PLAYER_READY:
      console.log(action.payload);
      return {
        ...state,
        players: action.payload.players,
        allReadyToPlay: action.payload.allReadyToPlay
      };
    default:
      return state;
  }
}
