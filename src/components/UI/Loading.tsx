/** @jsxImportSource @emotion/react */

import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      css={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        css={{
          zIndex: 10000,
        }}
      >
        <FadeLoader color="#A374DB" />
      </div>
    </div>
  );
};

export default Loading;
