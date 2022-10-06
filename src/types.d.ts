interface InputType {
  z: string;
  constraints: string[];
}

interface IParsedEquation {
  terms: string[];
  coefficients: number[];
  variables: string[];
  rhs: number | null;
}
