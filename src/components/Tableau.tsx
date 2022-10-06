import React from "react";
import { Matrix } from "mathjs";
interface TableauProps {
  matrix: Matrix;
  variableNames: string[];
}

const Tableau: React.FC<TableauProps> = ({ matrix, variableNames }) => {
  return (
    <>
      <div className="tableau">
        <span className="horizontal-border">
          <span />
          <span />
        </span>
        <table className="">
          <tr>
            {[...variableNames, "RHS", "θ"].map((varName, i) => (
              <th key={i}>{varName}</th>
            ))}
          </tr>
          {matrix.toArray().map((row, i) => (
            <tr key={i}>
              {(row as number[]).map((col, i) => (
                <td key={i}>{col}</td>
              ))}
            </tr>
          ))}
        </table>
        <span className="horizontal-border">
          <span />
          <span />
        </span>
      </div>
    </>
  );
};

export default Tableau;
