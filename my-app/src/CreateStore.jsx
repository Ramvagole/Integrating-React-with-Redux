import {legacy_createStore} from "redux"
import { reducer } from "./Reducer"
export let store=legacy_createStore(reducer)
