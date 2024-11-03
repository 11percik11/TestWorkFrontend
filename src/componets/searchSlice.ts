import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  value: string;
  company: string;
  presence: boolean;
  filter: boolean;
  usertrue: number;
  userfalse: number;
}

const initialState: SearchState = {
  value: "",
  company: "",
  presence: true,
  filter: true,
  usertrue: 0,
  userfalse: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setCompanyValue(state, action: PayloadAction<string>) {
        state.company = action.payload;
      },
    setPresenceValue(state, action: PayloadAction<boolean>) {
        state.presence = action.payload;
      },
    setFilterValue(state, action: PayloadAction<boolean>) {
        state.filter = action.payload;
      },
    setUserTrueValue(state, action: PayloadAction<number>) {
        state.usertrue = action.payload;
      },
    setUserFalseValue(state, action: PayloadAction<number>) {
        state.userfalse = action.payload;
      },
  },
});

export const { setSearchValue, setCompanyValue, setPresenceValue, setFilterValue, setUserTrueValue, setUserFalseValue } = searchSlice.actions;
export default searchSlice.reducer;