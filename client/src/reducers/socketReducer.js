import { SAVE_SOCKET, SAVE_PLAYERS } from "../actions/types";

const intitalState = {
  socket: null,
  room: null,
  players: null
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
        room: action.payload.room
      };
    default:
      return state;
  }
}
