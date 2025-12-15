import { useContext } from "react";
import { SelectContext } from "./user1/Create-context";

export default function SelectChild() {
  const select = useContext(SelectContext);
  return (
    <select
      value={select.value}
      onChange={select.onChange}
      className="shared-input"
    >
      <option value="less then 500">less then 500$</option>
      <option value="more then 500">more then 500$</option>
      <option value="more then 1000">more then 1000$</option>
    </select>
  );
}
