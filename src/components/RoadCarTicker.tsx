export function RoadCarTicker() {
  return (
    <div 
      className="relative w-full overflow-hidden bg-transparent h-7 sm:h-8 flex items-center select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Infinite cruising car track */}
      <div className="relative w-full h-full flex items-center">
        <div className="animate-car-drive flex items-center shrink-0">
          <svg
            viewBox="0 0 76 34"
            className="h-5 sm:h-6 w-auto text-[#782846] drop-shadow-xs"
            fill="currentColor"
          >
            {/* Soft dust puff trailing behind the wheels */}
            <circle cx="8" cy="27" r="2.5" fill="#E2CFD8" opacity="0.8" />
            <circle cx="4" cy="28" r="1.5" fill="#E8D9E0" opacity="0.6" />
            
            {/* Sleek retro-modern car body in main brand color (#782846) */}
            <path
              d="M13 22 C13 18 16 13 23 11 L35 7 C41 4 48 4 54 7 L65 12 C70 14 74 18 74 22 L74 24 C74 25.5 72.5 27 71 27 L65 27 C64.5 23.5 61.5 21 58 21 C54.5 21 51.5 23.5 51 27 L31 27 C30.5 23.5 27.5 21 24 21 C20.5 21 17.5 23.5 17 27 L15 27 C13.5 27 12 25.5 12 24 Z"
              fill="#782846"
            />
            
            {/* Front & Rear Windows in soft warm tint */}
            <path
              d="M26 12 L36 9 C40 7.5 45 7.5 48 9 L51 13 L26 13 Z"
              fill="#FAF3F5"
              opacity="0.95"
            />
            <path
              d="M53 13 L50 9 C53 7.8 56 8.5 58 10 L63 13 Z"
              fill="#FAF3F5"
              opacity="0.95"
            />
            
            {/* Headlight beam glow */}
            <circle cx="72" cy="18" r="1.8" fill="#FFF4D0" />
            <path d="M73 18 L76 16 L76 20 Z" fill="#FFEAA7" opacity="0.8" />

            {/* Tail light */}
            <rect x="12" y="17" width="2.5" height="4" rx="1" fill="#E84A5F" />

            {/* Front Wheel */}
            <circle cx="58" cy="26" r="5.5" fill="#2B212D" />
            <circle cx="58" cy="26" r="2.5" fill="#FAF3F5" />
            
            {/* Rear Wheel */}
            <circle cx="24" cy="26" r="5.5" fill="#2B212D" />
            <circle cx="24" cy="26" r="2.5" fill="#FAF3F5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
