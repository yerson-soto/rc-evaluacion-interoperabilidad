import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/authSlice";
import { evaluationSlice } from "./slices/evaluationSlice";
import { domainSlice } from "./slices/domainSlice";
import { lineamentSlice } from './slices/lineamentSlice';
import { criterionSlice } from './slices/criterionSlice';
import { levelSlice } from "./slices/levelSlice";
import { choiceSlice } from "./slices/choiceSlice";
import { userSlice } from "./slices/userSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [evaluationSlice.name]: evaluationSlice.reducer,
    [domainSlice.name]: domainSlice.reducer,
    [lineamentSlice.name]: lineamentSlice.reducer,
    [criterionSlice.name]: criterionSlice.reducer,
    [levelSlice.name]: levelSlice.reducer,
    [choiceSlice.name]: choiceSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
});

export default store;
