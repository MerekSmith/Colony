import { SAVE_SOCKET, SAVE_PLAYERS, START_GAME } from "../actions/types";

const intitalState = {
  socket: null,
  room: null,
  players: null,
  playerCount: 0,
  gameStarted: false
};

export default function(state = intitalState, action) {
  switch (action.type) {
    case SAVE_SOCKET:
      console.log("action payload", action.payload);
      return {
        ...state,
        socket: action.payload
      };
    case SAVE_PLAYERS:
      console.log("save players payload", action.payload);
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
    default:
      return state;
  }
}
