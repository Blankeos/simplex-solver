import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useReducer, useRef, useState } from "react";
import MathField from "../components/MathField";

import { compile } from "mathjs";
import produce from "immer";
import inputToMatrix from "@/util/inputToMatrix";

const initialInput: InputType = {
  z: "500x_1+250x_2",
  /* prettier-ignore */ constraints: ["20x_1+16x_2=300", "10x_2+35x_3=200", "25x_2+50x_3+45x_4=1250"],
};

type ACTIONS =
  | {
      type: "setZ";
      payload: string;
    }
  | {
      type: "addConstraint";
    }
  | {
      type: "setConstraint";
      payload: string;
      index: number;
    };
const Home: NextPage = () => {
  const [latex, setLatex] = useState("");
  const [input, dispatch] = useReducer(
    produce((draft: InputType, action: ACTIONS) => {
      switch (action.type) {
        case "setZ":
          draft.z = action.payload;
          break;
        case "setConstraint":
          draft.constraints[action.index] = action.payload;
          break;
        case "addConstraint":
          break;
        default:
          break;
      }
    }),
    initialInput
  );

  function handleCompile() {
    inputToMatrix(input);
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Simplex Solver</title>
        <meta name="description" content="Simplex Solver" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col flex-grow">
        <div className="max-w-5xl w-full mx-auto px-4">
          <h1 className="text-center text-lg font-semibold">Simplex Solver</h1>
          <div className="flex flex-col gap-y-2 mt-5">
            <div>
              <h2 className="font-semibold mb-3 text-gray-700">
                Objective Function
              </h2>
              <div className="flex gap-x-5 items-center bg-white rounded-md p-1 px-3 border border-slate-300">
                <p className="">min Z</p>
                <span>=</span>
                <div className="bg-white min-w-[8rem] rounded-md">
                  <MathField
                    latex={input.z}
                    onChange={(e) => {
                      dispatch({ type: "setZ", payload: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <h2 className="font-semibold mb-3 text-gray-700">
                System of Constraints (Standard Canonical Form)
              </h2>
              <div className="flex flex-col gap-y-1 bg-white p-3 px-3 border border-slate-300 rounded-md">
                {input.constraints.map((constraint, i) => {
                  return (
                    <MathField
                      key={i}
                      latex={constraint}
                      onChange={(e) => {
                        dispatch({
                          type: "setConstraint",
                          index: i,
                          payload: e.target.value,
                        });
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleCompile}>Compile Latex</button>
      </main>

      <footer>Footer</footer>
    </div>
  );
};

export default Home;
