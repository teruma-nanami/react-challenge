// housekeepSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Housekeep } from "../types/Housekeep";

const initialState: Housekeep[] = JSON.parse(
  localStorage.getItem("housekeeps") || "[]"
);

const housekeepSlice = createSlice({
  name: "housekeep",
  initialState,
  reducers: {
    addHousekeep: (state, action: PayloadAction<Housekeep>) => {
      state.push(action.payload);
      localStorage.setItem("housekeeps", JSON.stringify(state));
    },
    editHousekeep: (state, action: PayloadAction<Housekeep>) => {
      const index = state.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem("housekeeps", JSON.stringify(state));
      }
    },
    deleteHousekeep: (state, action: PayloadAction<string>) => {
      const newState = state.filter((h) => h.id !== action.payload);
      localStorage.setItem("housekeeps", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addHousekeep, editHousekeep, deleteHousekeep } =
  housekeepSlice.actions;
export default housekeepSlice.reducer;
