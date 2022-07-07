import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetEvaluation } from "library/api/repositories/EvaluationRepository";

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ 
//     baseUrl: 'https://c1491/Evaluacion_Institucional' 
//   }),
//   endpoints: (builder) => ({
//     getPokemonByName: builder.query<Response<GetEvaluation, string>({
//       query: () => '/evaluationinstitutional',
      
//     }),
//   }),
// })
