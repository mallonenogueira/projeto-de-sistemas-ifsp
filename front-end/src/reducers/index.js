import { combineReducers } from "redux";
import team from "./team";
import athlete from "./athlete";
import agility from "./agility";
import rast from "./rast";

export default combineReducers({
  team,
  athlete,
  rast,
  agility
});
