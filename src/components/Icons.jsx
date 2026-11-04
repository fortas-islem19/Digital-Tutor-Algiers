const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const PlaneIcon = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
  </svg>
)

export const PassportIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="5" y="2.5" width="14" height="19" rx="2" />
    <circle cx="12" cy="10" r="3.2" />
    <path d="M9 17h6" />
  </svg>
)

export const BedIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M3 7v12M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6" />
    <circle cx="7" cy="11" r="2" />
  </svg>
)

export const CheckIcon = (p) => (
  <svg {...base} strokeWidth={3} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

export const PinIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

export const SnowIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 2v20M4.9 6l14.2 12M19.1 6L4.9 18M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5" />
  </svg>
)

export const LinkIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M9 17H7a5 5 0 0 1 0-10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" />
  </svg>
)

export const SeatIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill={color}
      d="M6 3h12a1 1 0 0 1 1 1v8H5V4a1 1 0 0 1 1-1zM3 10h3v5h12v-5h3v6a2 2 0 0 1-2 2v3h-2v-3H7v3H5v-3a2 2 0 0 1-2-2z"
    />
  </svg>
)

export const UsersIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a5.5 5.5 0 0 1 3.5 6" />
  </svg>
)

export const BusIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="4" y="3" width="16" height="15" rx="3" />
    <path d="M4 11h16M8 21v-3M16 21v-3" />
    <circle cx="8" cy="14.5" r="0.8" fill="currentColor" />
    <circle cx="16" cy="14.5" r="0.8" fill="currentColor" />
  </svg>
)

export const SparkIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />
  </svg>
)

export const XIcon = (p) => (
  <svg {...base} strokeWidth={3} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const DocIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
)

export const ClockIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const PhoneIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M5 3h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 14.5V18a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
  </svg>
)

export const CalendarIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
)

export const GiftIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="8" width="17" height="4.5" rx="1" />
    <path d="M5 12.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7.5M12 8v13M12 8S10.5 3.5 8 3.5a2.25 2.25 0 0 0 0 4.5M12 8s1.5-4.5 4-4.5a2.25 2.25 0 0 1 0 4.5" />
  </svg>
)

export const LaptopIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="4.5" y="4.5" width="15" height="10.5" rx="1.5" />
    <path d="M2.5 19h19" />
  </svg>
)

export const CapIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M2.5 9.5 12 5l9.5 4.5L12 14z" />
    <path d="M6.5 11.5V16c1.5 1.5 3.5 2.2 5.5 2.2s4-.7 5.5-2.2v-4.5M21.5 9.5V15" />
  </svg>
)

export const PlayIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.5v7l5.5-3.5z" fill="currentColor" />
  </svg>
)

export const CameraIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
)
