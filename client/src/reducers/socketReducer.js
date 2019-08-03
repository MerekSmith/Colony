import {
  SAVE_SOCKET,
  SAVE_PLAYERS,
  START_GAME,
  PLAYER_READY,
  POWER_CONFIRMED,
  TIME_TO_VOTE,
  VOTE_UPDATE,
  RESET_PLAYER
} from "../actions/types";

const intitalState = {
  socket: null,
  room: null,
  players: null,
  playerCount: 0,
  gameStarted: false,
  allReadyToPlay: false,
  allConfirmed: false,
  timeToVote: false,
  fullPlayerList: null,
  allVoted: false
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
      return {
        ...state,
        players: action.payload.players,
        allReadyToPlay: action.payload.allReadyToPlay
      };
    case POWER_CONFIRMED:
      return {
        ...state,
        players: action.payload.players,
        allConfirmed: action.payload.allConfirmed
      };
    case TIME_TO_VOTE:
      return {
        ...state,
        timeToVote: true
      };
    case VOTE_UPDATE:
      return {
        ...state,
        fullPlayerList: action.payload.fullPlayerList,
        allVoted: action.payload.allVoted
      };
    case RESET_PLAYER:
      return {
        ...state,
        room: null,
        players: null,
        playerCount: 0,
        gameStarted: false,
        allReadyToPlay: false,
        allConfirmed: false,
        timeToVote: false,
        fullPlayerList: null,
        allVoted: false
      };
    default:
      return state;
  }
}
