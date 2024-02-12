import { createReducer } from "@ngrx/store";
import { BloodPressureType } from "./blood-pressure-type";

const initialState: BloodPressureType = {
    sys: 100,
    dia: 200,
    pulse: 300,
    note: "400"
};

export const bloodPressureReducer = createReducer(
    initialState
);