import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ShimmerImg } from "./ShimmerImg";

type Props = {
  summerWeekendTop: number;
  summerWeekendFadeOutFrame: number | null;
  showSummerWeekend: boolean;
  dateTextBottom: number;
  overlayFadeOutRelativeFrame: number | null;
  snapIn: boolean;
};

export const WaterOverlay: React.FC<Props> = ({
  summerWeekendTop,
  summerWeekendFadeOutFrame,
  showSummerWeekend,
  dateTextBottom,
  overlayFadeOutRelativeFrame,
  snapIn,
}) => {
  const frame = useCurrentFrame();

  const fadeIn = snapIn ? 1 : interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = overlayFadeOutRelativeFrame !== null
    ? interpolate(frame, [overlayFadeOutRelativeFrame - 20, overlayFadeOutRelativeFrame], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const opacity = Math.min(fadeIn, fadeOut);

  const summerWeekendOpacity =
    summerWeekendFadeOutFrame !== null
      ? interpolate(frame, [summerWeekendFadeOutFrame - 20, summerWeekendFadeOutFrame], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : 1;

  return (
    <AbsoluteFill style={{ opacity }}>
      {showSummerWeekend && (
        <div
          style={{
            position: "absolute",
            top: summerWeekendTop,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: summerWeekendOpacity,
          }}
        >
          <ShimmerImg
            src={staticFile("watercolor.png")}
            style={{ width: 600, display: "block", translate: "0px -6.2px" }}
            scale={14}
          />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: dateTextBottom,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ShimmerImg
          src={staticFile("date-text.png")}
          style={{ width: 320, display: "block" }}
          scale={20}
        />
      </div>
    </AbsoluteFill>
  );
};
