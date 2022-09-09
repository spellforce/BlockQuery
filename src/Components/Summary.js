import React from "react";
import dayjs from "dayjs";
import { Card, Descriptions, Typography, Tag } from "antd";
import { toHumanValue } from "../utils";
import Info from "./Icons/Info";
import TransValue from "./TransValue";

const { Paragraph, Text, Link } = Typography;
// 摘要
const Summary = ({ data, isMobile, isShowDollar }) => {
  isMobile = true;
  const {
    total,
    btcTotal,
    firstAddr,
    humanTotal,
    btcAverage,
    humanAverage,
    block_index,
    hash,
    time,
    mrkl_root,
    ver,
    bits,
    weight,
    height,
    size,
    n_tx,
    fee,
    nonce,
  } = data;

  return (
    <Card
      className="block-summary"
      title={
        <div>
          Block {block_index}{" "}
          <Info
            tooltip={`Block at height ${height} in the Bitcoin blockchain`}
          />
        </div>
      }
    >
      <Typography className="weight">
        <Paragraph>
          This block was mined on{" "}
          {dayjs(time * 1000).format("MMMM DD, YYYY in hh:mm A")} GMT Z by{" "}
          <Link href={`https://www.blockchain.com/btc/address/${firstAddr}`}>
            Unknown
          </Link>
          . It currently has 598,442 confirmations on the Bitcoin blockchain.
        </Paragraph>
        <Paragraph>
          The miner(s) of this block earned a total reward of 50.00000000 BTC
          ($946,173.50). The reward consisted of a base reward of 50.00000000
          BTC ($946,173.50) with an additional 0.00200000 BTC ($37.85) reward
          paid as fees of the 22 transactions which were included in the block.
          The Block rewards, also known as the Coinbase reward, were sent to
          this{" "}
          <Link href={`https://www.blockchain.com/btc/address/${firstAddr}`}>
            address
          </Link>
          .
        </Paragraph>
        <Paragraph>
          A total of {btcTotal} BTC ($ {humanTotal}) were sent in the block with
          the average transaction being {btcAverage} BTC ($ {humanAverage}).
        </Paragraph>
      </Typography>
      <Descriptions size="small" bordered column={isMobile ? 1 : 2}>
        <Descriptions.Item label="Hash" span={isMobile ? 1 : 2}>
          <Text
            ellipsis
            className={isMobile ? `table-ellipsis` : ""}
            copyable={!isMobile}
          >
            <Link>{hash}</Link>
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Confirmations" className="confirmations">
          598,442
        </Descriptions.Item>
        <Descriptions.Item label="Timestamp">
          <Tag color="#87d068">
            {dayjs(time * 1000).format("YYYY-MM-DD HH:MM")}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Height">{height}</Descriptions.Item>
        <Descriptions.Item label="Miner">
          <Link href={`https://www.blockchain.com/btc/address/${firstAddr}`}>
            Unknown
          </Link>
        </Descriptions.Item>
        <Descriptions.Item label="Number of Transactions">
          {n_tx}
        </Descriptions.Item>
        <Descriptions.Item label="Difficulty">1,192,497.75</Descriptions.Item>
        <Descriptions.Item label="Merkle root" span={isMobile ? 1 : 2}>
          <Text
            ellipsis
            className={isMobile ? `table-ellipsis` : ""}
            copyable={!isMobile}
          >
            <Link>{mrkl_root}</Link>
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Version">{ver}</Descriptions.Item>
        <Descriptions.Item label="Bits">{bits}</Descriptions.Item>
        <Descriptions.Item label="Weight">{weight}</Descriptions.Item>
        <Descriptions.Item label="Size">{size}</Descriptions.Item>
        <Descriptions.Item label="Nonce">
          {toHumanValue(nonce)}
        </Descriptions.Item>
        <Descriptions.Item label="Transaction Volume">
          <TransValue flag={isShowDollar} value={total} />
        </Descriptions.Item>
        <Descriptions.Item label="Block Reward">$944,015.00</Descriptions.Item>
        <Descriptions.Item label="Fee Reward">
          <TransValue className="feereward" flag={isShowDollar} value={fee} />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Summary;
