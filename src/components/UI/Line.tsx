/** @jsxImportSource @emotion/react */

import React from "react";
import { colors } from "../../constants/color";

interface LineProps {
  direction: "horizontal" | "vertical";
  spacing?: number;
}

const Line = ({ direction, spacing }: LineProps) => {
  const TYPE_DIRECTION = {
    horizontal: {
      borderBottom: `1px solid ${colors.secondary}`,
      padding: `${spacing}px 0`,
    },
    vertical: {
      borderRight: `1px solid ${colors.secondary}`,
      padding: `0 ${spacing}px`,
    },
  };

  return (
    <div
      css={{
        flex: "none",
        ...TYPE_DIRECTION[direction],
      }}
    />
  );
};

export default React.memo(Line);
