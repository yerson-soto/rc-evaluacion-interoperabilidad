import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";

import classes from "./Header.module.css";
import { InputText } from "primereact/inputtext";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  const [value3, setValue3] = useState("");

  return (
    <div className={classes.header}>
      <span className="p-input-icon-left">
        <FaSearch />
        <InputText
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          placeholder="Search"
        />
      </span>
    </div>
  );
}
