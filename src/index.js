import React, { useEffect, useState, useTransition } from "react";
import ReactDOM from "react-dom/client";
import { Space, Card, Input, message, Skeleton } from "antd";
import "./index.less";
const Summary = React.lazy(() =>
  import(/* webpackPrefetch: true */ "./Components/Summary")
);
const Transactions = React.lazy(() =>
  import(/* webpackPrefetch: true */ "./Components/Transactions")
);
import { dealwithData, throttle } from "./utils";

const getBlock = (id) => {
  return fetch(`https://blockchain.info/rawblock/${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw data;
      }
      return dealwithData(data);
    });
};

const getIsMobile = () => {
  const width = document.documentElement.clientWidth;
  if (width <= 800) {
    return true;
  } else {
    return false;
  }
};

// 一些计算和数据，不太精确，比如BTC转doller，一些业务上的数据拿的可能不对，这个需要根据需求来
const App = () => {
  const [data, setData] = useState();
  const [, startTransition] = useTransition();
  const [isMobile, setIsMobile] = useState(getIsMobile());
  const [isShowDollar, setIsShowDollar] = useState(false);
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  const onSearch = (text) => {
    let value = String(text);
    if (!/[0-9a-zA-Z]+/g.test(value)) {
      setStatus("error");
      message.warning("please input invalid value");
      return;
    }
    setLoading(true);
    getBlock(value)
      .then((data) => {
        startTransition(() => setData(data || {}));
        setStatus();
        document.body.style.height = "auto";
        setLoading(false);
      })
      .catch((err) => {
        message.error(err.message);
        setLoading(false);
      });
  };

  const onClick = (e) => {
    if (e.target.className === "tran") {
      setIsShowDollar(!isShowDollar);
    }
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      throttle(() => {
        setIsMobile(getIsMobile());
      })
    );
    // 可以设置定时器，获取新的data，更新数据，demo中未写
    return () => {
      window.removeEventListener("resize");
    };
  }, []);

  return (
    <div className="container">
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Card className="block-input">
          <Input.Search
            placeholder="input search text"
            onSearch={onSearch}
            status={status}
            loading={loading}
            enterButton
            style={{ maxWidth: "500px" }}
          />
        </Card>
        {data && (
          <React.Suspense fallback={<Skeleton active />}>
            <Summary
              data={data}
              isMobile={isMobile}
              isShowDollar={isShowDollar}
            />
          </React.Suspense>
        )}
        {data && (
          <React.Suspense fallback={<Skeleton active />}>
            <Transactions
              data={data.tx || []}
              onClick={onClick}
              isMobile={isMobile}
              isShowDollar={isShowDollar}
              height={data.height}
            />
          </React.Suspense>
        )}
      </Space>
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
