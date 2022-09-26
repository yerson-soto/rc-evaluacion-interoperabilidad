import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";
import { evaluationSlice } from "./slices/evaluationSlice";
import { domainSlice } from "./slices/domainSlice";
import { lineamentSlice } from './slices/lineamentSlice';
import { criterionSlice } from './slices/criterionSlice';
import { levelSlice } from "./slices/levelSlice";
import { choiceSlice } from "./slices/choiceSlice";
import { organizationSlice } from "./slices/organizationSlice";
import { questionSlice } from "./slices/questionSlice";
import { rankingSlice } from "./slices/rankingSlice";
import { scheduleSlice } from "./slices/scheduleSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [evaluationSlice.name]: evaluationSlice.reducer,
    [scheduleSlice.name]: scheduleSlice.reducer,
    [domainSlice.name]: domainSlice.reducer,
    [lineamentSlice.name]: lineamentSlice.reducer,
    [criterionSlice.name]: criterionSlice.reducer,
    [levelSlice.name]: levelSlice.reducer,
    [choiceSlice.name]: choiceSlice.reducer,
    [questionSlice.name]: questionSlice.reducer,
    [organizationSlice.name]: organizationSlice.reducer,
    [rankingSlice.name]: rankingSlice.reducer
  },
});

export default store;
