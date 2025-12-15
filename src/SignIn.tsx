import { useState, useRef, useEffect } from "react";
import InvalidInputs from "./Invalid-Inputs";
import InputComponent from "./Input-component";
import SelectComponent from "./Select-component";
import { SelectContext } from "./user1/Create-context";
import "./App.css";

type SignInProps = {
  check: {
    name: boolean;
    age: boolean;
    email: boolean;
    goodToGo: boolean;
  };
  setCheck: React.Dispatch<
    React.SetStateAction<{
      name: boolean;
      age: boolean;
      email: boolean;
      goodToGo: boolean;
    }>
  >;
  setEmailWithName: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string | null;
    }>
  >;
  EmailWithName: {
    name: string;
    email: string | null;
  };
};
export default function SignIn({
  check,
  setCheck,
  setEmailWithName,
  EmailWithName,
}: SignInProps) {
  useEffect(() => {
    window.onbeforeunload = function (e) {
      e.preventDefault();
      localStorage.removeItem("email");
    };
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    employed: false,
    salary: "less then 500",
  });
  const [checkName, setCheckName] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRegex = /^[^\s@]+@[^\s@0-9]+\.[^\s@0-9]+$/;
  const ageRegex = /^[0-9]{2}$/;
  const nameRegex = /^[a-zA-Z\\.\s]{0,}$/;

  function handleCheckName(a: string) {
    if (
      !nameRegex.test(a) ||
      a.length > 16 ||
      a.includes(" ") ||
      /[a-zA-Z]{1}[\\.]{2,}/.test(a) ||
      !/[a-zA-Z]/.test(a) ||
      /[\\.]{2,}[a-zA-Z]{0,}/.test(a) ||
      a.startsWith(".")
    ) {
      setCheckName(true);
    } else {
      setCheckName(false);
    }
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target.value;
    setForm({
      ...form,
      email: target,
    });

    if (!emailRegex.test(target)) {
      if (emailRef.current) {
        emailRef.current.classList.add("error");
        emailRef.current.classList.remove("right");
      }
    } else {
      if (emailRef.current) {
        emailRef.current.classList.add("right");
        emailRef.current.classList.remove("error");
      }
    }
    if (!target) {
      if (emailRef.current) {
        emailRef.current.classList.remove("error");
        emailRef.current.classList.remove("right");
      }
    }
  }

  function handleAge(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target.value;
    setForm({
      ...form,
      age: target,
    });

    if (!ageRegex.test(target) || Number(target) < 18) {
      if (ageRef.current) {
        ageRef.current.classList.add("error");
        ageRef.current.classList.remove("right");
      }
    } else {
      if (ageRef.current) {
        ageRef.current.classList.add("right");
        ageRef.current.classList.remove("error");
      }
    }

    if (!target) {
      if (ageRef.current) {
        ageRef.current.classList.remove("error");
        ageRef.current.classList.remove("right");
      }
    }
  }

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    const currentValue = e.target.value;
    handleCheckName(currentValue);
    if (
      !nameRegex.test(currentValue) ||
      currentValue.length > 16 ||
      currentValue.includes(" ") ||
      /[a-zA-Z]{1}[\\.]{2,}/.test(currentValue) ||
      !/[a-zA-Z]/.test(currentValue) ||
      /[\\.]{2,}[a-zA-Z]{0,}/.test(form.name) ||
      form.name.startsWith(".")
    ) {
      if (nameRef.current) {
        nameRef.current.classList.add("error");
        nameRef.current.classList.remove("right");
      }
      // If invalid, just update the state with the current (invalid) value to show it to the user
      setForm({ ...form, name: currentValue.toUpperCase() });
    } else {
      if (nameRef.current) {
        nameRef.current.classList.add("right");
        nameRef.current.classList.remove("error");
      }

      // If valid, apply the dot-adding logic
      let finalValue = currentValue;
      if (
        currentValue.length > form.name.length &&
        !currentValue.endsWith(" ")
      ) {
        finalValue = currentValue.replace(/\.$/, "") + ".";
      }
      setForm({
        ...form,
        name: finalValue.toUpperCase(),
      });
    }

    if (!currentValue) {
      if (nameRef.current) {
        nameRef.current.classList.remove("error");
        nameRef.current.classList.remove("right");
      }
    }
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setForm({
      ...form,
      salary: e.target.value,
    });
  }
  function handleSubmition(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleCheckName(form.name);
    if (checkName) {
      setForm({
        ...form,
        name: "",
      });
      setCheck({
        ...check,
        name: true,
      });
      nameRef.current?.classList.add("error");
      nameRef.current?.classList.remove("right");
    } else if (!emailRegex.test(form.email)) {
      setForm({
        ...form,
        email: "",
      });
      setCheck({
        ...check,
        email: true,
      });
      emailRef.current?.classList.add("error");
      emailRef.current?.classList.remove("right");
    } else if (Number(form.age) < 18 || !ageRegex.test(form.age)) {
      setForm({
        ...form,
        age: "",
      });
      setCheck({
        ...check,
        age: true,
      });
      ageRef.current?.classList.add("error");
      ageRef.current?.classList.remove("right");
    } else {
      setCheck({
        ...check,
        goodToGo: true,
      });
      setEmailWithName({
        name: form.name,
        email: form.email,
      });
      localStorage.setItem("email", form.email);
      setForm({
        name: "",
        email: "",
        age: "",
        employed: false,
        salary: "less then 500",
      });
      emailRef.current?.classList.remove("right");
      ageRef.current?.classList.remove("right");
      nameRef.current?.classList.remove("right");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmition}>
        <InputComponent
          type="text"
          ref={nameRef}
          value={form.name}
          onChange={handleName}
          placeholder="Your name"
          className="shared-input"
          required
        />

        <InputComponent
          type="email"
          value={form.email}
          onChange={handleEmail}
          placeholder="Your email"
          ref={emailRef}
          className="shared-input"
          required
        />

        <InputComponent
          type="number"
          value={form.age}
          onChange={handleAge}
          placeholder="Your age"
          min={0}
          max={99}
          ref={ageRef}
          className="shared-input"
          required
        />

        <label htmlFor="checkbox">Are you employed?</label>

        <InputComponent
          type="checkbox"
          id="checkbox"
          onChange={(e) => {
            setForm({
              ...form,
              employed: e.target.checked,
            });
          }}
          checked={form.employed}
          className="shared-input"
        />

        <SelectContext.Provider
          value={{ value: form.salary, onChange: handleSelect }}
        >
          <SelectComponent />
        </SelectContext.Provider>

        <button
          type="submit"
          disabled={
            checkName ||
            !emailRegex.test(form.email) ||
            !ageRegex.test(form.age) ||
            Number(form.age) < 18
          }
        >
          Submit
        </button>
      </form>

      {(check.age || check.name || check.goodToGo || check.email) && (
        <InvalidInputs
          setCheck={setCheck}
          check={check}
          emailWithName={EmailWithName}
        />
      )}
    </>
  );
}
