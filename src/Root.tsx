import "./index.css";
import { Composition, Folder } from "remotion";
import { z } from "zod";
import { VideoAd } from "./VideoAd";

export const videoAdSchema = z.object({
  src: z.string(),
  overlayStartFraction: z.number().min(0).max(1),
  overlayFadeOutFrame: z.number().nullable(),
  summerWeekendTop: z.number(),
  summerWeekendFadeOutFrame: z.number().nullable(),
  flashSummerWeekend: z.object({ start: z.number(), end: z.number() }).nullable(),
  centeredSummerWeekend: z.object({
    fadeInStart: z.number(),
    fadeInEnd: z.number(),
    fadeOutStart: z.number().nullable(),
    fadeOutEnd: z.number().nullable(),
    width: z.number(),
    top: z.number().nullable(),
  }).nullable(),
  showSummerWeekendInOverlay: z.boolean(),
  dateTextBottom: z.number(),
  snapIn: z.boolean(),
});

const FPS = 24;

const videos = [
  { id: "Reel-1", src: "reel-1.mp4", durationInSeconds: 10.54, overlayStartFraction: 0.25, overlayFadeOutFrame: null, summerWeekendTop: 286, summerWeekendFadeOutFrame: null, flashSummerWeekend: null, centeredSummerWeekend: null, showSummerWeekendInOverlay: true, dateTextBottom: 360, snapIn: false },
  { id: "Reel-2", src: "reel-2.mp4", durationInSeconds: 18.125, overlayStartFraction: 0.25, overlayFadeOutFrame: null, summerWeekendTop: 220, summerWeekendFadeOutFrame: 240, flashSummerWeekend: { start: 42, end: 76 }, centeredSummerWeekend: null, showSummerWeekendInOverlay: true, dateTextBottom: 360, snapIn: false },
  { id: "Reel-3", src: "reel-3.mp4", durationInSeconds: 17.96, overlayStartFraction: 0.25, overlayFadeOutFrame: null, summerWeekendTop: 360, summerWeekendFadeOutFrame: null, flashSummerWeekend: null, centeredSummerWeekend: { fadeInStart: 46, fadeInEnd: 78, fadeOutStart: 298, fadeOutEnd: 330, width: 700, top: null }, showSummerWeekendInOverlay: false, dateTextBottom: 360, snapIn: false },
  { id: "Reel-4", src: "reel-4.mp4", durationInSeconds: 10.42, overlayStartFraction: 0.237, overlayFadeOutFrame: 150, summerWeekendTop: 360, summerWeekendFadeOutFrame: null, flashSummerWeekend: null, centeredSummerWeekend: { fadeInStart: 58, fadeInEnd: 59, fadeOutStart: 132, fadeOutEnd: 150, width: 700, top: null }, showSummerWeekendInOverlay: false, dateTextBottom: 360, snapIn: true },
  { id: "Reel-5", src: "reel-5.mp4", durationInSeconds: 12.04, overlayStartFraction: 0.25, overlayFadeOutFrame: null, summerWeekendTop: 200, summerWeekendFadeOutFrame: null, flashSummerWeekend: null, centeredSummerWeekend: { fadeInStart: 43, fadeInEnd: 59, fadeOutStart: null, fadeOutEnd: null, width: 600, top: 200 }, showSummerWeekendInOverlay: false, dateTextBottom: 360, snapIn: false },
  { id: "Reel-6", src: "reel-6.mp4", durationInSeconds: 17.67, overlayStartFraction: 0.19, overlayFadeOutFrame: 330, summerWeekendTop: 1180, summerWeekendFadeOutFrame: null, flashSummerWeekend: null, centeredSummerWeekend: null, showSummerWeekendInOverlay: true, dateTextBottom: 230, snapIn: false },
  { id: "Aftermovie", src: "aftermovie.mp4", durationInSeconds: 64.5, overlayStartFraction: 0.25, overlayFadeOutFrame: null, summerWeekendTop: 360, summerWeekendFadeOutFrame: null, flashSummerWeekend: null, centeredSummerWeekend: null, showSummerWeekendInOverlay: true, dateTextBottom: 360, snapIn: false },
];

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="JC-Summer-Weekend">
      {videos.map(({ id, src, durationInSeconds, overlayStartFraction, overlayFadeOutFrame, summerWeekendTop, summerWeekendFadeOutFrame, flashSummerWeekend, centeredSummerWeekend, showSummerWeekendInOverlay, dateTextBottom, snapIn }) => (
        <Composition
          key={id}
          id={id}
          component={VideoAd}
          durationInFrames={Math.ceil(durationInSeconds * FPS)}
          fps={FPS}
          width={1080}
          height={1920}
          schema={videoAdSchema}
          defaultProps={{ src, overlayStartFraction, overlayFadeOutFrame, summerWeekendTop, summerWeekendFadeOutFrame, flashSummerWeekend, centeredSummerWeekend, showSummerWeekendInOverlay, dateTextBottom, snapIn }}
        />
      ))}
    </Folder>
  );
};
