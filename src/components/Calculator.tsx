import { useState } from "react";
import Controls from "./Controls";
import Output from "./Output";

export interface valuesType {
  bill: number;
  tip: number;
  customTip: number;
  people: number;
  tipAmount: number;
  total: number;
}

export const initialValues = {
  bill: 0,
  tip: 0,
  customTip: 0,
  people: 0,
  tipAmount: 0,
  total: 0,
};

const Calculator = () => {
  const [values, setValues] = useState(initialValues);

  return (
    <section className="calculator" aria-label="calculator">
      <Controls values={values} setValues={setValues} />
      <Output values={values} setValues={setValues} />
    </section>
  );
};

export default Calculator;
