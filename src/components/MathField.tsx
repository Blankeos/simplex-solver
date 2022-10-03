import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import { Mathfield } from "mathlive";

interface MathFieldElementsProps {
  children: React.ReactNode;
  key?: string;
}
const MathFieldElement = forwardRef(
  ({ children, key, ...props }: MathFieldElementsProps, ref) => {
    let mf = React.createElement("math-field", {
      ...props,
      children: children,
      ref: ref,
    });
    return mf;
  }
);

interface MathFieldProps {
  latex: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const MathField: React.FC<MathFieldProps> = ({ latex, onChange }) => {
  async function loadMathLive() {
    return await import("mathlive");
  }
  loadMathLive();

  const ref = useRef<Mathfield>(null);

  useEffect(() => {
    console.log(ref);
    if (ref && ref.current) {
      (ref.current as any).addEventListener("input", (e: any) => {
        if (onChange) {
          onChange(e);
        }
      });
    }
  }, [ref]);

  //   Better tracking of state changes, but bad user experience.
  //   useEffect(() => {
  //     if (ref && ref.current && ref.current.setValue) {
  //       ref.current.setValue(latex);
  //     }
  //   }, [latex]);

  return (
    <div>
      <MathFieldElement ref={ref}>{latex}</MathFieldElement>
    </div>
  );
};

export default MathField;
