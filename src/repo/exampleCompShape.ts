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
