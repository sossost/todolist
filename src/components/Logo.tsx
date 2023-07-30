/** @jsxImportSource @emotion/react */

import { colors } from "../constants/color";

const Logo = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      css={{
        fontSize: 24,
        fontWeight: "700",
        cursor: "pointer",
        color: colors.primary,
      }}
      onClick={onClick}
    >
      TODO List
    </div>
  );
};

export default Logo;
