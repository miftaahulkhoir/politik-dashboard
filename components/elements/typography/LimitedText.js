import { Typography } from "antd";
import React from "react";

function LimitedText({ text, charLimit = 50 }) {
  const showElipsis = text.length > charLimit ? true : false;

  return (
    <Typography.Text style={{ width: `${charLimit - 10}ch` }} ellipsis={showElipsis ? { tooltip: text } : false}>
      {text}
    </Typography.Text>
  );
}

export default LimitedText;
