import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ReactComponent as IconDollar } from "../icons/icon-dollar.svg";
import { ReactComponent as IconPerson } from "../icons/icon-person.svg";
import { valuesType } from "./Calculator";

const options = [5, 10, 15, 25, 50];

interface errorsType {
  bill?: string;
  customTip?: string;
  people?: string;
}

interface props {
  values: valuesType;
  setValues: Dispatch<SetStateAction<valuesType>>;
}

const Controls = ({ values, setValues }: props) => {
  const [errors, setErrors] = useState<errorsType>({});

  const total =
    values.bill > 0 && values.people > 0 ? values.bill / values.people : 0;
  const tipAmount =
    ((values.bill / 100) *
      (values.customTip > 0 ? values.customTip : values.tip)) /
    values.people;

  useEffect(() => {
    setValues((prev) => ({ ...prev, tipAmount: 0, total: 0 }));
    if (!Object.keys(errors).length && total > 0) {
      setValues((prev) => ({ ...prev, total, tipAmount }));
    }
  }, [setValues, total, tipAmount, errors]);

  // Check for Errors
  useEffect(() => {
    setErrors({});
    if (values.bill < 0) {
      setErrors((prev) => ({ ...prev, bill: "Can't be negative" }));
    }
    if (values.people < 0) {
      setErrors((prev) => ({ ...prev, people: "Can't be negative" }));
    }
    if (values.customTip < 0) {
      setErrors((prev) => ({ ...prev, customTip: "Can't be negative" }));
    }
    if (values.bill > 0 && values.people === 0) {
      setErrors((prev) => ({ ...prev, people: "Can't be zero" }));
    }
  }, [values.bill, values.people, values.customTip]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "customTip") setValues((prev) => ({ ...prev, tip: 0 }));
    setValues((prev) => ({ ...prev, [name]: +value }));
  };

  const handleSelect = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    setValues({ ...values, customTip: 0 });

    if (+value === values.tip) {
      setValues((prev) => ({ ...prev, tip: 0 }));
    } else {
      setValues((prev) => ({ ...prev, tip: +value }));
    }
  };

  return (
    <div className="calculator-controls">
      <div className="input-container">
        {errors.bill && <span className="error-msg">{errors.bill}</span>}
        <label htmlFor="bill">Bill</label>
        <div className="field">
          <IconDollar />
          <input
            className={errors.bill ? "error" : undefined}
            type="number"
            min="0"
            id="bill"
            name="bill"
            placeholder="0"
            value={values.bill === 0 ? "" : values.bill}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="tips">
        {errors.customTip && (
          <span className="error-msg">{errors.customTip}</span>
        )}
        <label htmlFor="tips">Select Tip %</label>
        <div className="tips-container" id="tips">
          {options.map((el, id) => (
            <button
              key={id}
              value={el}
              className={
                values.tip === el ? "btn btn-tip active" : "btn btn-tip"
              }
              onClick={handleSelect}
            >
              {el}%
            </button>
          ))}
          <input
            className={errors.customTip ? "custom-tip error" : "custom-tip"}
            placeholder="Custom"
            name="customTip"
            type="number"
            min="0"
            max="100"
            value={values.customTip === 0 ? "" : values.customTip}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="input-container">
        {errors.people && <span className="error-msg">{errors.people}</span>}
        <label htmlFor="people">Number of People</label>
        <div className="field">
          <IconPerson />
          <input
            className={errors.people ? "error" : undefined}
            type="number"
            min="0"
            id="people"
            name="people"
            placeholder="0"
            value={values.people === 0 ? "" : values.people}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
