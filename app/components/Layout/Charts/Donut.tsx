export default function Donut({
  strokeColor = '#000000',
  strokeWidth = '9',
}: {
  strokeColor?: string;
  strokeWidth?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="57"
      height="56"
      viewBox="0 0 57 56"
      fill="none"
    >
      <circle
        cx="28.5"
        cy="28"
        r="23.5"
        stroke={strokeColor}
        stroke-width={strokeWidth}
      />
    </svg>
  );
}
