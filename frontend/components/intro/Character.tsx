import styles from "./Character.module.css";

export default function Character() {
  const shoe = (
    <g className={styles.shoe}>
      <path className={styles.shoeBody} d="M70 226 L98 226 Q118 228 122 242 L122 248 L68 248 L68 236 Z" />
      <line className={styles.sole} x1={68} y1={249} x2={122} y2={249} />
      <path d="M96 233 L113 237" style={{ stroke: "var(--accent)", strokeWidth: 3.5, strokeLinecap: "round", fill: "none" }} />
    </g>
  );

  return (
    <svg viewBox="0 0 200 260" focusable="false" className={styles.svg}>
      <defs>
        <pattern id="dots" width={7} height={7} patternUnits="userSpaceOnUse">
          <rect width={7} height={7} style={{ fill: "var(--hoodie)" }} />
          <circle cx={2} cy={2} r={1.1} style={{ fill: "var(--hoodie-dk)" }} />
          <circle cx={5.5} cy={5.5} r={1.1} style={{ fill: "var(--hoodie-dk)" }} />
        </pattern>
      </defs>
      <ellipse className={styles.shadow} cx={96} cy={252} rx={58} ry={6} />
      <g className={styles.bob}>
        {/* back leg */}
        <g className={`${styles.leg} ${styles.b}`}>
          <line className={styles.ol} x1={88} y1={150} x2={88} y2={222} strokeWidth={26} />
          <line className={`${styles.pants} ${styles.far}`} x1={88} y1={150} x2={88} y2={222} strokeWidth={18} />
          {shoe}
        </g>
        {/* back arm */}
        <g className={styles.arm}>
          <line className={styles.ol} x1={120} y1={98} x2={188} y2={88} strokeWidth={22} />
          <line className={styles.hood} x1={120} y1={98} x2={188} y2={88} strokeWidth={15} />
          <circle className={styles.hand} cx={190} cy={88} r={9} />
        </g>
        {/* front leg */}
        <g className={`${styles.leg} ${styles.a}`}>
          <line className={styles.ol} x1={88} y1={150} x2={88} y2={222} strokeWidth={26} />
          <line className={styles.pants} x1={88} y1={150} x2={88} y2={222} strokeWidth={18} />
          {shoe}
        </g>
        {/* torso and hood */}
        <line className={styles.ol} x1={88} y1={150} x2={122} y2={96} strokeWidth={54} />
        <line className={styles.hood} x1={88} y1={150} x2={122} y2={96} strokeWidth={46} />
        <path className={styles.line3} d="M100 138 Q112 146 124 136" />
        <circle cx={128} cy={86} r={16} style={{ fill: "url(#dots)", stroke: "var(--ink)", strokeWidth: 4 }} />
        {/* head */}
        <circle className={styles.skin} cx={142} cy={56} r={25} />
        <circle className={styles.skin} cx={127} cy={62} r={5.5} style={{ strokeWidth: 3 }} />
        <path className={styles.beanie} d="M116 50 Q114 24 142 24 Q170 24 168 50 Q142 42 116 50 Z" />
        <path d="M115 48 Q142 40 169 48 L170 58 Q142 50 114 58 Z" style={{ fill: "var(--ink)" }} />
        <circle className={styles.hand} cx={142} cy={21} r={8} />
        <circle cx={156} cy={66} r={9} style={{ fill: "#fff", stroke: "var(--ink)", strokeWidth: 3 }} />
        <circle cx={159} cy={66} r={2.4} style={{ fill: "var(--ink)" }} />
        <path className={styles.line3} d="M149 56 L163 60" />
        <path className={styles.line3} d="M167 64 Q173 68 167 73" />
        <path className={styles.line3} d="M154 78 Q160 82 166 78" />
        <path d="M124 38 Q128 44 124 48 Q120 44 124 38 Z" style={{ fill: "var(--sweat)", stroke: "var(--ink)", strokeWidth: 2 }} />
        <path className={styles.line3} d="M176 44 L184 40" />
        <path className={styles.line3} d="M178 54 L187 53" />
        {/* front arm */}
        <g className={styles.arm}>
          <line className={styles.ol} x1={124} y1={106} x2={188} y2={110} strokeWidth={22} />
          <line className={styles.hood} x1={124} y1={106} x2={188} y2={110} strokeWidth={15} />
          <circle className={styles.hand} cx={190} cy={110} r={9} />
        </g>
      </g>
    </svg>
  );
}
