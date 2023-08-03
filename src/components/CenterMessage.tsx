/** @jsxImportSource @emotion/react */

import { colors } from "../constants/color";

const CenterMessage = ({ message }: { message: string }) => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: "18px",
        fontWeight: 500,
        color: colors.mainFont,
      }}
    >
      {message}
    </div>
  );
};

export default CenterMessage;
