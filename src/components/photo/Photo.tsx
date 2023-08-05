/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";

const Photo = () => {
  return (
    <WallpaperWrapper>
      <img
        src="/images/1.jpeg"
        alt="wall_paper"
        css={{
          position: "absolute",
          objectFit: "cover",
          width: "100%",
          opacity: 0.8,
        }}
      />
    </WallpaperWrapper>
  );
};

export default Photo;

const WallpaperWrapper = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    width: 100%,
    height: 100%;
    flex-grow: 1;
    max-width: 450px;
    gap: 20px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    overflow: hidden;
  };
`;
