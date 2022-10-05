import React from "react";
import { Matrix } from "mathjs";
interface TableauProps {
  matrix: Matrix;
}

const Tableau: React.FC<TableauProps> = ({ matrix }) => {
  const display = JSON.stringify(matrix.toArray());
  return (
    <>
      <div className="tableau">
        <span className="horizontal-border">
          <span />
          <span />
        </span>
        <table className="">
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

      <pre className="whitespace-pre-wrap">{display}</pre>
      <br />
      <br />
      <br />
      <pre className="whitespace-pre-wrap">{JSON.stringify(matrix)}</pre>
    </>
  );
};

export default Tableau;
