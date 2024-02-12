import { createReducer, on } from "@ngrx/store";
import { BloodPressureType } from "./blood-pressure-type";
import * as BloodPressureActions from "./blood-pressure.action";

const initialState: BloodPressureType = {
    sys: 0,
    dia: 0,
    pulse: 0,
    other: ""
};

export const bloodPressureReducer = createReducer(
    initialState,
    on(BloodPressureActions.saveData, (state, { bloodPressure }) => {
        return {
            ...bloodPressure
        }
    })
);