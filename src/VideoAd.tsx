import { AbsoluteFill, Sequence, Video, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { videoAdSchema } from "./Root";
import { ShimmerImg } from "./ShimmerImg";
import { WaterOverlay } from "./WaterOverlay";

type Props = z.infer<typeof videoAdSchema>;

export const VideoAd: React.FC<Props> = ({ src, overlayStartFraction, overlayFadeOutFrame, summerWeekendTop, summerWeekendFadeOutFrame, flashSummerWeekend, centeredSummerWeekend, showSummerWeekendInOverlay, dateTextBottom, snapIn }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const halfwayFrame = Math.floor(durationInFrames * overlayStartFraction);

  const showFlash = flashSummerWeekend !== null && frame >= flashSummerWeekend.start && frame <= flashSummerWeekend.end;

  const centeredOpacity = (() => {
    if (centeredSummerWeekend === null) return 0;
    const fadeIn = interpolate(frame, [centeredSummerWeekend.fadeInStart, centeredSummerWeekend.fadeInEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    if (centeredSummerWeekend.fadeOutStart !== null && centeredSummerWeekend.fadeOutEnd !== null) {
      const fadeOut = interpolate(frame, [centeredSummerWeekend.fadeOutStart, centeredSummerWeekend.fadeOutEnd], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      return Math.min(fadeIn, fadeOut);
    }
    return fadeIn;
  })();

  // Convert global fade-out frame to relative (within the sequence)
  const overlayFadeOutRelativeFrame = overlayFadeOutFrame !== null ? overlayFadeOutFrame - halfwayFrame : null;

  return (
    <AbsoluteFill>
      <Video
        src={staticFile(src)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {showFlash && (
        <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ShimmerImg src={staticFile("watercolor.png")} style={{ width: 600, display: "block" }} />
        </AbsoluteFill>
      )}
      {centeredSummerWeekend !== null && (
        centeredSummerWeekend.top !== null ? (
          <div style={{ position: "absolute", top: centeredSummerWeekend.top, left: "50%", transform: "translateX(-50%)", opacity: centeredOpacity }}>
            <ShimmerImg src={staticFile("watercolor.png")} style={{ width: centeredSummerWeekend.width, display: "block" }} />
          </div>
        ) : (
          <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: centeredOpacity }}>
            <ShimmerImg src={staticFile("watercolor.png")} style={{ width: centeredSummerWeekend.width, display: "block" }} />
          </AbsoluteFill>
        )
      )}
      <Sequence from={halfwayFrame}>
        <WaterOverlay
          summerWeekendTop={summerWeekendTop}
          summerWeekendFadeOutFrame={summerWeekendFadeOutFrame}
          showSummerWeekend={showSummerWeekendInOverlay}
          dateTextBottom={dateTextBottom}
          overlayFadeOutRelativeFrame={overlayFadeOutRelativeFrame}
          snapIn={snapIn}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
