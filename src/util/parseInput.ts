import { matrix } from "mathjs";

export type ParsedInput = ReturnType<typeof parseInput>;
export default function parseInput(input: InputType) {
  let z = input.z;

  const parsedConstraints = input.constraints.map((constraint) =>
    parseEquation(constraint)
  );

  const variableNames = getUniqueVariables(parsedConstraints);

  const constraintMatrix = parsedConstraints.map((constraint) => {
    const coefficients = variableNames.map((variable) => {
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

  // Theta Column

  const m = matrix(constraintMatrix);
  return {
    matrix: m,
    variableNames: variableNames,
  };
}

function getUniqueVariables(parsedEquationList: IParsedEquation[]) {
  // Get All Variables of All Constraints
  const variablesForAllConstraints = parsedEquationList
    .map((c, i) => {
      return c.variables;
    })
    .flat()
    .sort();

  // Filter Unique Values and only return unique values
  return variablesForAllConstraints.filter(
    (item, i, ar) => ar.indexOf(item) === i
  ) as string[];
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
