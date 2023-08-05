/** @jsxImportSource @emotion/react */

import { colors } from "../constants/color";

const Logo = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      css={{
        fontSize: 24,
        fontWeight: "600",
        cursor: "pointer",
        letterSpacing: -1,
        color: colors.primary,
      }}
      onClick={onClick}
    >
      TODO List
    </div>
  );
};

export default Logo;
