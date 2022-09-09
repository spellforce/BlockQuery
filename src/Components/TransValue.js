import React from "react";
import { toHumanValue, toBTC } from "../utils";

const TransValue = ({ flag, value, className }) => {
  let btc = toBTC(value);

  return flag ? (
    <span className={className}>${toHumanValue(parseFloat(btc) * 19248)}</span>
  ) : (
    <span className={className}>{btc} BTC</span>
  );
};

export default TransValue;
