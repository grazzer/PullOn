// example of comp shape

import { id } from "zod/v4/locales";

const shape: any = {
  categories: [
    {
      id: "c1",
      name: "under 18",
      ageRange: [0, 18],
      description: "string",
      rounds: [
        {
          id: "r1",
          stage: 1,
          name: "qualifiers",
          maxCompetitors: 100,
          problemCount: 3,
          style: "grading style",
        },
        {
          id: "r2",
          name: "finals",
          maxCompetitors: 10,
          problemCount: 3,
          style: "grading style",
        },
      ],
    },
  ],
};

const result = {
  athlete: "relation string",
  competition: "relation string",
  category: "c1",
  round: "r1",
  score: {
    1: true,
    2: false,
    3: true,
  },
};

// const formSchema = z.object({
//   CompetitionName: z
//     .string()
//     .min(5, "name must be at least 5 characters.")
//     .max(32, "name must be at most 32 characters."),
//   categories: z.array(
//     z.object({
//       // id: z.string(),
//       name: z.optional(z.string()),
//       ageRange: z.tuple([z.number(), z.number()]),
//       description: z.string(),
//       rounds: z.array(
//         z.object({
//           // id: z.string(),
//           stage: z.number(),
//           name: z.optional(z.string()),
//           maxCompetitors: z.number(),
//           problemCount: z.number(),
//           gradingStyle: z.string(),
//         }),
//       ),
//     }),
//   ),
// });
