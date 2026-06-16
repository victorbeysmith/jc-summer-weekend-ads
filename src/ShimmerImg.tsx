import { useId } from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  src: string;
  style?: React.CSSProperties;
  scale?: number;
};

export const ShimmerImg: React.FC<Props> = ({ src, style, scale = 14 }) => {
  const rawId = useId();
  const filterId = `shimmer-${rawId.replace(/:/g, "")}`;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const freqX = 0.013 + Math.sin(t * 0.38) * 0.005;
  const freqY = 0.008 + Math.cos(t * 0.52) * 0.003;

  return (
    <div style={{ display: "inline-block", filter: `url(#${filterId})` }}>
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${freqX.toFixed(5)} ${freqY.toFixed(5)}`}
              numOctaves={4}
              seed={1}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <Img src={src} style={style} />
    </div>
  );
};
