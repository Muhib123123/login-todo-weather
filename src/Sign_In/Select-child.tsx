import { useContext } from "react";
import { SelectContext } from "../Todo_List/user1/Create-context";

export default function SelectChild() {
  const select = useContext(SelectContext);
  return (
    <>
    <label htmlFor="select">Salary:</label>
    <select
      value={select.value}
      onChange={select.onChange}
      className="shared-input"
    >
      <option value="less then 4000">less then 4000$</option>
      <option value="more then 4000">more then 4000$</option>
      <option value="more then 10000">more then 10000$</option>
    </select>
    </>
  );
}
