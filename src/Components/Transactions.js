import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import TransValue from "./TransValue";
import { Card, Descriptions, Typography, Tag, Pagination } from "antd";
import Arrow from "./Icons/Arrow";
import Earth from "./Icons/Earth";
import Info from "./Icons/Info";

const { Link, Text } = Typography;

const Transaction = ({ tx, isShowDollar }) => {
  const { fee, size, hash, time, inputs = [], out = [], itemTotal } = tx;

  return (
    <div className="transaction">
      <div className="t-title">
        <div className="title-left">
          <div className="title-name">
            <strong>Fee</strong>
          </div>
          <div>
            <TransValue flag={isShowDollar} value={fee} /> <br />
            (0.000 sat/B - 0.000 sat/WU - {size} bytes)
          </div>
        </div>
        <div>
          <Tag color="#87d068">
            <TransValue
              flag={isShowDollar}
              value={itemTotal}
              className="tran"
            />
          </Tag>
        </div>
      </div>
      <div className="t-title">
        <div className="title-left">
          <div className="title-name">
            <strong>Hash</strong>
          </div>
          <div>
            {/* 这些网址可以放常量文件中 */}
            <Link
              target="_blank"
              href={`https://www.blockchain.com/btc/tx/${hash}`}
            >
              {hash}
            </Link>
          </div>
        </div>
        <div>{dayjs(time * 1000).format("YYYY-MM-DD HH:MM")}</div>
      </div>
      <div className="input-output">
        <div className="inputs">
          {inputs.map((item) =>
            item.prev_out.tx_index ? (
              <div key={item.prev_out.tx_index} className="left-right">
                <div className="addr">
                  <Link
                    target="_blank"
                    href={`https://www.blockchain.com/btc/address/${item.prev_out.addr}`}
                  >
                    {item.prev_out.addr}
                  </Link>
                </div>
                <div className="nums">
                  <TransValue flag={isShowDollar} value={item.prev_out.value} />{" "}
                  <Earth className="icon-output" />
                </div>
              </div>
            ) : (
              <span key="0" style={{ color: "rgb(0, 135, 90)" }}>
                COINBASE (Newly Generated Coins)
              </span>
            )
          )}
        </div>
        <div className="middle">
          <Arrow />
        </div>
        <div className="out">
          {out.map((item) => (
            <div key={item.addr} className="left-right">
              <div className="addr">
                <Link
                  target="_blank"
                  href={`https://www.blockchain.com/btc/address/${item.addr}`}
                >
                  {item.addr}
                </Link>
              </div>
              <div className="nums">
                <TransValue flag={isShowDollar} value={item.value} />{" "}
                <Earth className="icon-spent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TransactionM = ({ tx, isShowDollar }) => {
  const { fee, size, hash, time, inputs = [], out = [], itemTotal } = tx;
  // console.log(time)

  return (
    <div className="transaction">
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="Amount">
          <Tag color="#87d068">
            <TransValue
              flag={isShowDollar}
              value={itemTotal}
              className="tran"
            />
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Fee">
          <TransValue flag={isShowDollar} value={fee} /> <br />
          <Text ellipsis className="table-ellipsis">
            (0.000 sat/B - 0.000 sat/WU - {size} bytes)
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Hash">
          <Text ellipsis className="table-ellipsis">
            <Link
              target="_blank"
              href={`https://www.blockchain.com/btc/tx/${hash}`}
            >
              {hash}
            </Link>
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {dayjs(time * 1000).format("YYYY-MM-DD HH:MM")}
        </Descriptions.Item>
        <Descriptions.Item label="From">
          <div className="inputs">
            {inputs.map((item) =>
              item.prev_out.tx_index ? (
                <div key={item.prev_out.tx_index} className="left-right">
                  <Text ellipsis className="table-ellipsis">
                    <Link
                      target="_blank"
                      href={`https://www.blockchain.com/btc/address/${item.prev_out.addr}`}
                    >
                      {item.prev_out.addr}
                    </Link>
                  </Text>{" "}
                  <br />
                  <div className="nums">
                    <TransValue
                      flag={isShowDollar}
                      value={item.prev_out.value}
                    />{" "}
                    <Earth className="icon-output" />
                  </div>
                </div>
              ) : (
                <span key="0" style={{ color: "rgb(0, 135, 90)" }}>
                  COINBASE (Newly Generated Coins)
                </span>
              )
            )}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="To">
          <div className="out">
            {out.map((item) => (
              <div key={item.addr} className="left-right">
                <Text ellipsis className="table-ellipsis">
                  <Link>{item.addr}</Link>
                </Text>
                <br />
                <div className="nums">
                  <TransValue flag={isShowDollar} value={item.value} />{" "}
                  <Earth className="icon-spent" />
                </div>
              </div>
            ))}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

const Transactions = ({ data, onClick, isShowDollar, isMobile, height }) => {
  const [pageData, setPageData] = useState({
    current: 1,
    total: data.length,
    pageSize: 5,
    data,
  });

  useEffect(() => {
    setPageData({
      ...pageData,
      total: data.length,
      data,
    });
  }, [JSON.stringify(data)]);

  const getPageData = () => {
    const { current, pageSize, data, total } = pageData;
    let result = [];
    for (let i = (current - 1) * pageSize; i < current * pageSize; i++) {
      if (i >= total) break;
      result.push(data[i]);
    }
    return result;
  };

  const onChange = (current) => {
    setPageData({ ...pageData, current });
  };

  return (
    <Card
      className="block-transactions"
      onClick={onClick}
      title={
        <div>
          Block Transactions{" "}
          <Info
            tooltip={`All transactions recorded in Block at height ${height}`}
          />
        </div>
      }
    >
      {getPageData().map((item) =>
        !isMobile ? (
          <Transaction key={item.hash} tx={item} isShowDollar={isShowDollar} />
        ) : (
          <TransactionM key={item.hash} tx={item} isShowDollar={isShowDollar} />
        )
      )}
      <Pagination
        className="page"
        size="small"
        showQuickJumper
        current={pageData.current}
        onChange={onChange}
        total={pageData.total}
      />
    </Card>
  );
};

export default Transactions;
