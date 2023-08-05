/** @jsxImportSource @emotion/react */

import * as RadixSlider from "@radix-ui/react-slider";
import { colors } from "../../constants/color";

interface SlideProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SlideProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      css={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        userSelect: "none",
        touchAction: "none",
        width: "100%",
        height: "10px",
      }}
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track
        css={{
          backgroundColor: "#fff",
          position: "relative",
          flexGrow: "1",
          borderRadius: "9999px",
          height: "3px",
        }}
      >
        <RadixSlider.Range
          css={{
            position: "absolute",
            backgroundColor: colors.primary,
            borderRadius: "9999px",
            height: "100%",
          }}
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
