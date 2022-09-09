/**
 * @jest-environment jsdom
 */

import React from "react";
import "./matchMedia";
// import renderer from 'react-test-renderer'
import Transactions from "../Components/Transactions";
import data from "./data.json";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

global.IS_REACT_ACT_ENVIRONMENT = true;

let container = null;
let root = null;
beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  // 退出时进行清理
  // unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("test Transactions content", () => {
  act(() => {
    root.render(
      <Transactions
        data={data.tx}
        isMobile={false}
        isShowDollar={false}
        height={data.height}
      />
    );
  });
  expect(container.textContent).toBe(
    "Block Transactions Fee0.00000000 BTC (0.000 sat/B - 0.000 sat/WU - 168 bytes) BTCHash5b09bbb8d3cb2f8d4edbcf30664419fb7c9deaeeb1f62cb432e7741c80dbe5ba2011-11-24 18:11COINBASE (Newly Generated Coins)1KUCp7YP5FP8ViRxhfszSUJCTAajK6viGy50.00200000 BTC Fee0.00000000 BTC (0.000 sat/B - 0.000 sat/WU - 259 bytes) BTCHash7fec6bd918ee43fddebc9a7d976f3c6d31a61efb4f27482810a6b63f0e4a02d52011-11-24 18:111EeYUCnnCDqdjNGWK9uNWQ66FQkbr6MUBa82.62537860 BTC 1F2o1EEREuUpjK12ifRtah6SyQK29eff7y0.05000000 BTC 15EFHxnebLB8vUAu8YmeGXaHrwgHwT5jJK82.57537860 BTC Fee0.00000000 BTC (0.000 sat/B - 0.000 sat/WU - 258 bytes) BTCHasha9300383c7b0f5fc03d495844420f25035c34c4c1abb0bdb43fed1d491bbb5e22011-11-24 18:1114GPE4J81192XDWxsdjVp11fibninVn9pR75.91252376 BTC 1KgeAsUgzduPyfwZVX9qMFUm6aKBJc81Tz75.86252376 BTC 18kWdvq94DCX8LR9TTv2urvdFDwi8xmY1Z0.05000000 BTC Fee0.00000000 BTC (0.000 sat/B - 0.000 sat/WU - 257 bytes) BTCHash956365e81276bea27acc4278c90481a2c178b402ed988e976e205fb0e28c1ebc2011-11-24 18:111J46J1JgpQQaNvz6gmoca9C6hs66WCAiNd75.02411430 BTC 1FXdhaDu7MEWmRLJojQMJFNcd2g9ghEq1m74.74411430 BTC 1KcyrWg6m3mK9bHfRHJj2pE9Bytdv2dxYM0.28000000 BTC Fee0.00000000 BTC (0.000 sat/B - 0.000 sat/WU - 257 bytes) BTCHash505b42ec5e8499843ae3ad6f56f66ce52025d37205df19fb5777179d407b29782011-11-24 18:111Fo9mzh1nLJ63AyXkw6mUVtosn3HKzvRyD81.74436009 BTC 18oH3d8MwqmVKqES9cnyozN6WVGoNKMpFX81.69436009 BTC 19DHwfKoZ4d5onx2aCM9k1ycZJb8C47t4J0.05000000 BTC 123Go toPage"
  );
});

it("test Transactions mobile", () => {
  act(() => {
    root.render(
      <Transactions
        data={data.tx}
        isMobile={true}
        isShowDollar={false}
        height={data.height}
      />
    );
  });

  expect(
    container.ownerDocument.getElementsByClassName("ant-descriptions-view")
      .length
  ).not.toBe(0);
});

it("test Transactions isShowDollar", () => {
  act(() => {
    root.render(
      <Transactions
        data={data.tx}
        isMobile={false}
        isShowDollar={true}
        height={data.height}
      />
    );
  });
  expect(
    container.ownerDocument
      .getElementsByClassName("tran")[0]
      .textContent.indexOf("$")
  ).not.toBe(-1);
});

it("test Transactions isShowDollar", () => {
  act(() => {
    root.render(
      <Transactions
        data={data.tx}
        isMobile={false}
        isShowDollar={true}
        height={data.height}
      />
    );
  });
  expect(
    container.ownerDocument
      .getElementsByClassName("tran")[0]
      .textContent.indexOf("$")
  ).not.toBe(-1);
});
