import { Dispatch, SetStateAction } from "react";
import { valuesType, initialValues } from "./Calculator";

interface props {
  values: valuesType;
  setValues: Dispatch<SetStateAction<valuesType>>;
}

const Output = ({ values, setValues }: props) => {
  const handleReset = () => {
    setValues(initialValues);
  };

  return (
    <div className="calculator-output">
      <div className="output-container">
        <div className="output output-tip">
          <div className="output-label">
            <p>Tip Amount</p>
            <small>/ person</small>
          </div>
          <span className="output-number">${values.tipAmount.toFixed(2)}</span>
        </div>
        <div className="output output-total">
          <div className="output-label">
            <p>Total</p>
            <small>/ person</small>
          </div>
          <span className="output-number">${values.total.toFixed(2)}</span>
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
