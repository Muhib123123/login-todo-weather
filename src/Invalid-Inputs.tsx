import React from "react";
import { Link } from "react-router";
type CheckState = {
  name: boolean;
  age: boolean;
  email: boolean;
  goodToGo: boolean;
};

type InvalidInputsProps = {
  setCheck: React.Dispatch<React.SetStateAction<CheckState>>;
  check: CheckState;
};
export default function InvalidInputs({ setCheck, check }: InvalidInputsProps) {
  if (check.age) {
    const handleCloseElement = () => {
      setCheck({
        ...check,
        age: false,
      });
    };
    return (
      <div className="modal-overlay invalid-age">
        <div className="modal-content">
          <h2>Under 18 years old is not allowed</h2>
          <button onClick={handleCloseElement}>Close</button>
        </div>
      </div>
    );
  } else if (check.name) {
    const handleCloseElement = () => {
      setCheck({
        ...check,
        name: false,
      });
    };
    return (
      <div className="modal-overlay invalid-age">
        <div className="modal-content">
          <h2>
            Name should only contain letters with dots with a maximum of 16
            characters
          </h2>
          <button onClick={handleCloseElement}>Close</button>
        </div>
      </div>
    );
  } else if (check.email) {
    const handleCloseElement = () => {
      setCheck({
        ...check,
        email: false,
      });
    };
    return (
      <div className="modal-overlay invalid-age">
        <div className="modal-content">
          <h2>Invalid email</h2>
          <button onClick={handleCloseElement}>Close</button>
        </div>
      </div>
    );
  } else {
    const handleCloseElement = () => {
      setCheck({
        ...check,
        goodToGo: false,
      });
    };
    return (
      <div className="modal-overlay valid">
        <div className="modal-content">
          <h2>Form submitted successfully!</h2>
          <Link to="/lists">Go to lists</Link>
          <Link to="/todo">Go to todo</Link>
          <button onClick={handleCloseElement}>Log out</button>
        </div>
      </div>
    );
  }
}
