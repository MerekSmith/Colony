// import axios from "axios";
import { SAVE_SOCKET, SAVE_PLAYERS } from "./types";

export const saveSocket = socket => dispatch => {
  dispatch({ type: SAVE_SOCKET, payload: socket });
};

export const savePlayers = ({ players, room }) => dispatch => {
  dispatch({ type: SAVE_PLAYERS, payload: { players, room } });
};
