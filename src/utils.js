const DOLLER = 19248;

const dealwithData = (data) => {
  data["tx"] = data["tx"] || [];
  let total = 0;
  data["tx"].map((item) => {
    item.itemTotal = item["out"].reduce((acc, item) => acc + item.value, 0);
    total += item.itemTotal;
  });
  data.total = total;
  data.btcTotal = toBTC(total);
  data.humanTotal = toHumanValue(parseFloat(data.btcTotal) * DOLLER);
  data.average = ~~(total / data["tx"].length);
  data.btcAverage = toBTC(data.average);
  data.humanAverage = toHumanValue(parseFloat(data.btcAverage) * DOLLER);
  data.firstAddr =
    data["tx"][0] && data["tx"][0]["out"][0] && data["tx"][0]["out"][0]["addr"];
  return data;
};

const throttle = (fn, time = 300) => {
  var t = null;
  return function () {
    if (t) return;
    t = setTimeout(() => {
      fn.call(this);
      clearTimeout(t);
      t = null;
    }, time);
  };
};

const toHumanValue = (value) => {
  let v = String(value);
  if (!/^[0-9]+.?[0-9]*$/.test(v)) return "";

  let [left, right] = v.split(".");
  let j = 1;
  let res = [];
  for (let i = left.length - 1; i >= 0; i--, j++) {
    res.unshift(left[i]);
    if (j % 3 === 0 && i !== 0) {
      res.unshift(",");
    }
  }
  res = res.join("");
  if (right) {
    res += "." + right.slice(0, 2);
  }
  return res;
};

const toBTC = (value) => {
  let v = String(value);
  if (!/^[0-9]+$/.test(v)) return "";

  if (v.length <= 8) {
    v = v.padStart(9, "0");
  }
  const index = v.length - 8;
  const str = v.slice(0, index) + "." + v.slice(index);
  return str;
};

export { dealwithData, throttle, toHumanValue, toBTC };
