import React from "react";
import { Spin } from "antd";

export default function loading() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Spin size="large" />
      </div>
    </div>
  );
}
