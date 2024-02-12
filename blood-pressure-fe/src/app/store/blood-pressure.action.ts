import { createAction, props } from "@ngrx/store";
import { BloodPressureType } from "./blood-pressure-type";

export const saveData = createAction(
    "[Blood Pressure] Save Data", props<{bloodPressure: BloodPressureType}>()
);