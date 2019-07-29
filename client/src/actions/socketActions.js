// import axios from "axios";
import { SAVE_SOCKET, SAVE_PLAYERS, START_GAME } from "./types";

export const saveSocket = socket => dispatch => {
  dispatch({ type: SAVE_SOCKET, payload: socket });
};

export const savePlayers = ({ players, room, playerCount }) => dispatch => {
  dispatch({ type: SAVE_PLAYERS, payload: { players, room, playerCount } });
};

export const startGame = () => dispatch => {
  dispatch({ type: START_GAME });
};
