import { useEffect, useState } from "react";

/**
 * DevsLibrary animated opening screen: books assemble, the wordmark appears,
 * and a tiny cyan slash crosses the name. Mount it above your app and pass
 * onFinish to remove it after the intro.
 */
export default function OpeningScreen({ onFinish, duration = 6000 }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const fadeAt = Math.max(0, duration - 400);
    const fadeTimer = window.setTimeout(() => setLeaving(true), fadeAt);
    const finishTimer = window.setTimeout(() => onFinish?.(), duration);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(finishTimer);
    };
  }, [duration, onFinish]);

  const name = "DEVSLIBRARY";

  return (
    <div
      className={`devslibrary-opening${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-label="DevsLibrary is starting"
    >
      <style>{`
        .devslibrary-opening {
          position: fixed; inset: 0; z-index: 2147483647;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; isolation: isolate; color: #f2f6fa;
          background: radial-gradient(ellipse at 50% 39%, rgba(97,218,251,.085), transparent 49%), #0b0f17;
          opacity: 1; transition: opacity .4s ease;
        }
        .devslibrary-opening.is-leaving { opacity: 0; pointer-events: none; }
        .devslibrary-opening__lockup { width: min(88vw, 360px); display:flex; flex-direction:column; align-items:center; transform:translateY(-1.5vh); }
        .devslibrary-opening__books { width:clamp(138px,45vw,210px); height:auto; overflow:visible; margin-bottom:clamp(15px,3.2vh,23px); }
        .devslibrary-opening__book { opacity:0; transform-box:fill-box; transform-origin:center; }
        .devslibrary-opening__cover { stroke:#1c2a38; stroke-width:1.6; }
        .devslibrary-opening__pages { fill:#f0f4f5; opacity:.96; }
        .devslibrary-opening__spine { fill:none; stroke:#627e91; stroke-width:1.5; stroke-linecap:round; }
        .devslibrary-opening__detail { fill:none; stroke:#607b8d; stroke-width:1.6; stroke-linecap:round; }
        .devslibrary-opening__book--1 .devslibrary-opening__cover { fill:#8faec1; }
        .devslibrary-opening__book--2 .devslibrary-opening__cover { fill:#dce7ed; }
        .devslibrary-opening__book--3 .devslibrary-opening__cover { fill:#a9cde2; }
        .devslibrary-opening__book--4 .devslibrary-opening__cover { fill:#edf3f7; }
        .devslibrary-opening__book--1 { animation: dsl-book-one .56s cubic-bezier(.2,.9,.25,1) .08s both; }
        .devslibrary-opening__book--2 { animation: dsl-book-two .56s cubic-bezier(.2,.9,.25,1) .2s both; }
        .devslibrary-opening__book--3 { animation: dsl-book-three .56s cubic-bezier(.2,.9,.25,1) .32s both; }
        .devslibrary-opening__book--4 { animation: dsl-book-four .56s cubic-bezier(.2,.9,.25,1) .44s both; }
        .devslibrary-opening__book-slash { fill:none; stroke-linecap:round; stroke-linejoin:round; stroke-dasharray:190; stroke-dashoffset:190; animation:dsl-slash-draw .46s cubic-bezier(.2,.9,.2,1) 1.08s forwards; }
        .devslibrary-opening__book-slash-shadow { stroke:#0b0f17; stroke-width:12; }
        .devslibrary-opening__book-slash-line { stroke:#61dafb; stroke-width:6; }
        .devslibrary-opening__wordmark { display:flex; align-items:center; justify-content:center; width:100%; white-space:nowrap; font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif; font-size:clamp(1.22rem,7.2vw,2.45rem); line-height:1.15; font-weight:760; font-style:italic; letter-spacing:.055em; }
        .devslibrary-opening__letter { display:inline-block; opacity:0; transform:translateY(9px) skewX(-5deg); animation:dsl-letter-reveal .32s cubic-bezier(.2,.8,.2,1) calc(1.48s + var(--i)*.043s) both; }
        /* Intentionally tiny and subtle: a short, thin slash over the wordmark. */
        .devslibrary-opening__name-slash { width:clamp(32px,10vw,44px); height:1.5px; margin-top:13px; border-radius:999px; background:#61dafb; box-shadow:0 0 5px rgba(97,218,251,.12); transform:rotate(-14deg) scaleX(0); transform-origin:center; animation:dsl-name-slash .32s ease-out 2.12s forwards; }
        .devslibrary-opening__footer { position:absolute; left:16px; right:16px; bottom:max(24px,calc(env(safe-area-inset-bottom,0px) + 18px)); text-align:center; color:#9baec0; font:500 .72rem/1.3 system-ui,sans-serif; letter-spacing:.09em; opacity:0; animation:dsl-footer .32s ease 2.42s forwards; }
        @keyframes dsl-book-one { from {opacity:0;transform:translate(-78px,38px) rotate(-13deg)} to {opacity:1;transform:translate(0,0) rotate(0)} }
        @keyframes dsl-book-two { from {opacity:0;transform:translate(-76px,-24px) rotate(-8deg)} to {opacity:1;transform:translate(0,0) rotate(0)} }
        @keyframes dsl-book-three { from {opacity:0;transform:translate(76px,-20px) rotate(9deg)} to {opacity:1;transform:translate(0,0) rotate(0)} }
        @keyframes dsl-book-four { from {opacity:0;transform:translate(22px,-66px) rotate(12deg)} to {opacity:1;transform:translate(0,0) rotate(0)} }
        @keyframes dsl-slash-draw { to {stroke-dashoffset:0} }
        @keyframes dsl-letter-reveal { to {opacity:1;transform:translateY(0) skewX(-5deg)} }
        @keyframes dsl-name-slash { to {transform:rotate(-14deg) scaleX(1)} }
        @keyframes dsl-footer { to {opacity:.94} }
        @media (max-width:360px) { .devslibrary-opening__lockup{width:90vw}.devslibrary-opening__wordmark{font-size:clamp(1.1rem,7.2vw,1.45rem);letter-spacing:.035em} }
        @media (max-height:520px) { .devslibrary-opening__lockup{transform:scale(.82)}.devslibrary-opening__books{margin-bottom:10px} }
        @media (prefers-reduced-motion:reduce) { .devslibrary-opening *{animation:none!important;opacity:1!important;transform:none!important;stroke-dashoffset:0!important} }
      `}</style>

      <div className="devslibrary-opening__lockup" aria-hidden="true">
        <svg className="devslibrary-opening__books" viewBox="0 0 240 180" focusable="false">
          <g className="devslibrary-opening__book devslibrary-opening__book--1">
            <rect className="devslibrary-opening__cover" x="42" y="112" width="156" height="25" rx="3.5" />
            <path className="devslibrary-opening__pages" d="M48 117 H192 V132 H48 Z" />
            <path className="devslibrary-opening__spine" d="M48 133 H192" />
          </g>
          <g className="devslibrary-opening__book devslibrary-opening__book--2">
            <rect className="devslibrary-opening__cover" x="27" y="87" width="170" height="24" rx="3.5" />
            <path className="devslibrary-opening__pages" d="M33 92 H191 V106 H33 Z" />
            <path className="devslibrary-opening__spine" d="M33 107 H191" />
            <path className="devslibrary-opening__detail" d="M42 98 H58" />
          </g>
          <g className="devslibrary-opening__book devslibrary-opening__book--3">
            <rect className="devslibrary-opening__cover" x="43" y="62" width="154" height="24" rx="3.5" />
            <path className="devslibrary-opening__pages" d="M49 67 H191 V81 H49 Z" />
            <path className="devslibrary-opening__spine" d="M49 82 H191" />
            <path className="devslibrary-opening__detail" d="M58 73 H73" />
          </g>
          <g className="devslibrary-opening__book devslibrary-opening__book--4">
            <rect className="devslibrary-opening__cover" x="62" y="37" width="120" height="24" rx="3.5" />
            <path className="devslibrary-opening__pages" d="M68 42 H176 V56 H68 Z" />
            <path className="devslibrary-opening__spine" d="M68 57 H176" />
            <path className="devslibrary-opening__detail" d="M77 48 H92" />
          </g>
          <path className="devslibrary-opening__book-slash devslibrary-opening__book-slash-shadow" d="M54 143 L188 18" />
          <path className="devslibrary-opening__book-slash devslibrary-opening__book-slash-line" d="M54 143 L188 18" />
        </svg>
        <div className="devslibrary-opening__wordmark" aria-label="DevsLibrary">
          {name.split("").map((letter, index) => (
            <span className="devslibrary-opening__letter" style={{ "--i": index }} key={`${letter}-${index}`}>
              {letter}
            </span>
          ))}
        </div>
        <span className="devslibrary-opening__name-slash" />
      </div>
      <div className="devslibrary-opening__footer">From Hyesent.dev</div>
    </div>
  );
}
