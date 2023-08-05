/** @jsxImportSource @emotion/react */

import useSound from "use-sound";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import Slider from "./Slider";
import { Song } from "../../types";
import { colors } from "../../constants/color";
import styled from "@emotion/styled";
import { MUSICS } from "../../data/music";
import { shuffleArray } from "../../utils/shuffleArray";

const Player = () => {
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState<Song[]>(shuffleArray(MUSICS));
  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (songs.length === 0) {
      return;
    }

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextSong = songs[currentIndex + 1];

    if (!nextSong) {
      return setCurrentSong(songs[0]);
    }

    setCurrentSong(nextSong);
  };

  const onPlayPrevious = () => {
    if (songs.length === 0) {
      return;
    }

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const previousSong = songs[currentIndex - 1];

    if (!previousSong) {
      return setCurrentSong(songs[songs.length - 1]);
    }

    setCurrentSong(previousSong);
  };

  const [play, { pause, sound }] = useSound(currentSong.songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <PlayerContentContainer>
      <TextSliderContainer>
        <MusicMetaCotainer>
          <MusicMetaText>
            {currentSong.title} - {currentSong.artist}
          </MusicMetaText>
        </MusicMetaCotainer>
      </TextSliderContainer>

      <PlayerButtonsContainer>
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={24}
          css={ControlIconStyle}
        />
        <PlayButtonWrapper onClick={handlePlay}>
          <Icon size={30} css={{ color: "#fff" }} />
        </PlayButtonWrapper>
        <AiFillStepForward
          onClick={onPlayNext}
          size={24}
          css={ControlIconStyle}
        />
      </PlayerButtonsContainer>

      <VolumeSliderContainer>
        <VolumeIcon
          onClick={toggleMute}
          css={{
            cursor: "pointer",
            color: colors.primary,
            "&:hover": {
              color: colors.secondary,
            },
            transition: "color 0.2s ease-in-out",
          }}
          size={30}
        />
        <Slider value={volume} onChange={(value) => setVolume(value)} />
      </VolumeSliderContainer>
    </PlayerContentContainer>
  );
};

export default Player;

const PlayerContentContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  height: 100%;
  width: 100%;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TextSliderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  overflow: hidden;
`;

const MusicMetaCotainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  text-align: center;
  white-space: nowrap;

  @keyframes slideRightToLeft {
    0% {
      transform: translateX(100%);
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  animation: slideRightToLeft 10s linear infinite;
`;

const MusicMetaText = styled.span`
  color: ${colors.primary};
  font-weight: bold;
  font-size: 16px;
`;

const PlayerButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  gap: 10px;
  @media (min-width: 768px) {
    justify-content: center;
  }
`;

const ControlIconStyle = {
  color: colors.primary,
  cursor: "pointer",
  "@media (min-width: 1024px)": {
    "&:hover": {
      color: colors.secondary,
    },
    transition: "color 0.2s ease-in-out",
  },
};

const PlayButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 9999px;
  background-color: ${colors.primary};
  padding: 4px;
  cursor: pointer;
  @media (min-width: 1024px) {
    &:hover {
      background-color: ${colors.secondary};
    }
    transition: background-color 0.2s ease-in-out;
  }
`;

const VolumeSliderContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100px;
  }
`;
