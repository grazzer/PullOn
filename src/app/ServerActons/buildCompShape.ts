function buildCompShapeAction(
  name: string,
  location: number,
  date: Date,
  description: string,
): Record<string, any> {
  "use server";
  const shape = {
    name: name,
    location: location,
    date: date,
    description: description,
    category: [],
  };
  return shape;
}
function addCategoryAction(
  shape: Record<string, any>,
  name: string,
  ageRange: [number, number],
  description: string,
) {
  "use server";
  let _id = "";
  if (shape.category.length == 0) {
    _id = "c1";
  } else {
    const lastId = shape.category[shape.category.length - 1].id;
    const num = parseInt(lastId.slice(1)) + 1;
    _id = "c" + num;
  }

  shape.category.push({
    id: _id,
    name: name,
    ageRange: ageRange,
    description: description,
    rounds: [],
  });
  return shape;
}

function addRoundAction(
  shape: Record<string, any>,
  categoryId: string,
  name: string,
  maxCompetitors: number,
  problemCount: number,
  style: string,
) {
  "use server";
  const category = shape.category.find((cat: any) => cat.id === categoryId);
  if (!category) {
    throw new Error("Cannot create round, category not found");
  }

  let _id = "";
  if (shape.category.length == 0) {
    _id = "c1";
  } else {
    const lastId = shape.category[shape.category.length - 1].id;
    const num = parseInt(lastId.slice(1)) + 1;
    _id = "c" + num;
  }
  shape.category.rounds.push({
    id: "r1",
    name: name,
    maxCompetitors: maxCompetitors,
    problemCount: problemCount,
    style: style,
  });
  return shape;
}
