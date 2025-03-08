import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routes: ["/feed", "/inbox", "/profile", "/settings"],
  currentRoute: 0,
};

export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    changeRoute: (state, action) => {
      state.currentRoute = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeRoute } = routerSlice.actions;

export default routerSlice.reducer;