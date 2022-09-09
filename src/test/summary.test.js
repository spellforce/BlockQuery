/**
 * @jest-environment jsdom
 */

import React from "react";
import "./matchMedia";
// import renderer from 'react-test-renderer'
import Summary from "../Components/Summary";
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

it("test Summary content", () => {
  act(() => {
    root.render(<Summary data={data} isMobile={false} isShowDollar={false} />);
  });
  expect(container.textContent).toBe(
    "Block 154595 This block was mined on November 24, 2011 in 06:40 PM GMT Z by Unknown. It currently has 598,442 confirmations on the Bitcoin blockchain.The miner(s) of this block earned a total reward of 50.00000000 BTC ($946,173.50). The reward consisted of a base reward of 50.00000000 BTC ($946,173.50) with an additional 0.00200000 BTC ($37.85) reward paid as fees of the 22 transactions which were included in the block. The Block rewards, also known as the Coinbase reward, were sent to this address.A total of  BTC ($ ) were sent in the block with the average transaction being  BTC ($ ).Hash0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103lg...Confirmations598,442Timestamp2011-11-24 18:11Height154595MinerUnknownNumber of Transactions22Difficulty1,192,497.75Merkle root935aa0ed2e29a4b81e0c995c39e06995ecce7ddbebb26ed32d550a72e8200bf5lg...Version1Bits437129626Weight36780Size9195Nonce2,964,215,930Transaction Volume BTCBlock Reward$944,015.00Fee Reward0.00200000 BTC"
  );
  // root.unmount();
});

it("test Summary mobile", () => {
  act(() => {
    root.render(<Summary data={data} isMobile={true} isShowDollar={false} />);
  });
  expect(
    container.ownerDocument.getElementsByClassName("confirmations")[0]
      .parentNode.childNodes.length
  ).toBe(2);
});

it("test Summary isShowDollar", () => {
  act(() => {
    root.render(<Summary data={data} isMobile={true} isShowDollar={true} />);
  });
  expect(
    container.ownerDocument
      .getElementsByClassName("feereward")[0]
      .textContent.indexOf("$")
  ).not.toBe(-1);
});
