export default function inputToMatrix(input: InputType) {
  console.log(exp(input.z));
  //   const zSplit = "2x^3+4x^2-6x+1=0".match(/^(-?\d+)([a-z]*)|(-)?([a-z]+)$/gi);
  //   //   const zSplit = input.z.match(/(-?\d+)x\^?(\d+)?/);
  //   //
  //   //   const zSplit = input.z.split(/[+\-\s]/g);
  //   console.log(typeof zSplit);
  //   console.log(zSplit);
}

function exp(term: string) {
  const matches = term.match(/(-?[0-9]*)([a-zA-Z]*)/);
  if (matches === null) return;
  return [convertNumMatch(matches[1]), matches[2]];
}

function convertNumMatch(numMatch: string) {
  if (!numMatch) return "0";
  else if (numMatch === "-") return "-1";
  else return numMatch;
}
