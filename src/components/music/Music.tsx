import styled from "@emotion/styled";
import Player from "./Player";

const Music = () => {
  return (
    <MusicLayout>
      <Player />
    </MusicLayout>
  );
};

export default Music;

const MusicLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%,
  height: 200px;
  max-width: 450px;
  gap: 20px;
  background: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 20px;
`;
