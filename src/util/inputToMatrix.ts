import { matrix } from "mathjs";

export default function inputToMatrix(input: InputType) {
  let z = input.z;
  // console.log("z", parseEquation(z));
  // input.constraints.forEach((constraint, i) => {
  //   console.log(`constraint${i + 1}`, parseEquation(constraint));
  // });

  const parsedConstraints = input.constraints.map((constraint) =>
    parseEquation(constraint)
  );
  const variablesForAllConstraints = parsedConstraints
    .map((c, i) => {
      return c.variables;
    })
    .flat()
    .sort();
  const uniqueVariablesForAllConstraints = variablesForAllConstraints.filter(
    (item, i, ar) => ar.indexOf(item) === i
  ) as string[];

  const constraintMatrix = parsedConstraints.map((constraint) => {
    const coefficients = uniqueVariablesForAllConstraints.map((variable) => {
      const varIndex = constraint.variables.indexOf(variable);

      if (varIndex === -1) return 0;
      return constraint.coefficients[varIndex];
    });
    return coefficients;
  });

  // Add b vector at the end
  const bVector = parsedConstraints.map((constraint) => {
    return constraint.rhs;
  }) as number[];
  constraintMatrix.forEach((constraint, i) => {
    constraint.push(bVector[i]);
  });

  console.log(constraintMatrix);

  // const m = matrix([
  //   [1, 0, 0, 2, -1, 10],
  //   [0, 1, 0, -1, -5, 20],
  //   [0, 0, 1, 6, -12, 18],
  //   [0, 0, 0, -2, 3, 60],
  // ]);
  const m = matrix(constraintMatrix);
  return m;
}

function parseEquation(equation: string) {
  let terms = equation.match(
    /(?<!_)(-?[0-9]+[a-z]+_?\d?)|(-?[a-z]_?\d?)/g
  ) as string[];
  let coefficients = terms?.map((term) => getCoefficient(term)) as number[];
  let variables = equation.match(/([a-z]+_?\d*)/g) as string[];
  let rhs = equation.match(/(?<==)(\d+)$/);

  return {
    terms,
    coefficients,
    variables,
    rhs: rhs ? parseInt(rhs[0]) : null,
  };
}

function getCoefficient(term: string) {
  const coefficient = term.match(/(?<!_)(-?[0-9]+)(?=[a-z]+)/);

  if (coefficient === null) {
    if (term[0] === "-") return -1;
    return 1;
  }

  return parseInt(coefficient[0]);
}
