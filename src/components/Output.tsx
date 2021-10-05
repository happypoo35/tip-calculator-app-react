import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { valuesType, initialValues } from "./Calculator";

interface props {
  values: valuesType;
  setValues: Dispatch<SetStateAction<valuesType>>;
}

const Output = ({ values, setValues }: props) => {
  const [countTotal, setCountTotal] = useState(0);
  const [countTip, setCountTip] = useState(0);
  const handleReset = () => {
    setValues(initialValues);
  };

  const speed = 100;

  useEffect(() => {
    const inc = values.total / speed;

    if (countTotal < values.total && values.total - countTotal > inc) {
      setTimeout(() => setCountTotal((p) => p + inc), 1);
    } else if (countTotal > values.total) {
      setTimeout(() => setCountTotal((p) => (p = 0 + inc)), 1);
    } else {
      setCountTotal(values.total);
    }
  }, [countTotal, values.total]);

  useEffect(() => {
    const inc = values.tipAmount / speed;

    if (countTip < values.tipAmount && values.tipAmount - countTip > inc) {
      setTimeout(() => setCountTip((p) => p + inc), 1);
    } else if (countTip > values.tipAmount) {
      setTimeout(() => setCountTip((p) => (p = 0 + inc)), 1);
    } else {
      setCountTip(values.tipAmount);
    }
  }, [countTip, values.tipAmount]);

  return (
    <div className="calculator-output">
      <div className="output-container">
        <div className="output output-tip">
          <div className="output-label">
            <p>Tip Amount</p>
            <small>/ person</small>
          </div>
          {/* <span className="output-number">${values.tipAmount.toFixed(2)}</span> */}
          <span className="output-number">${countTip.toFixed(2)}</span>
        </div>
        <div className="output output-total">
          <div className="output-label">
            <p>Total</p>
            <small>/ person</small>
          </div>
          {/* <span className="output-number">${values.total.toFixed(2)}</span> */}
          <span className="output-number">${countTotal.toFixed(2)}</span>
        </div>
      </div>
      <button
        className="btn btn-reset"
        disabled={values.total === 0}
        onClick={handleReset}
      >
        reset
      </button>
    </div>
  );
};

export default Output;
