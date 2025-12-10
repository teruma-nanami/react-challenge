// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import housekeepReducer from "./housekeepSlice";
import incomeReducer from "./incomeSlice";

const rootReducer = combineReducers({
  housekeep: housekeepReducer,
  income: incomeReducer,
  category: categoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
