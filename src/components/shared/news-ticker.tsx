
import { getJobs, getTenders } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export function NewsTicker() {
  const latestTenders = getTenders().slice(0, 2);
  const latestJobs = getJobs().slice(0, 2);

  const items = [
    ...latestTenders.map(t => ({ type: 'Tender', text: t.title, href: '/tenders' })),
    ...latestJobs.map(j => ({ type: 'Career', text: j.title, href: '/careers' })),
  ];

  if (items.length === 0) {
    return null;
  }

  // Duplicate items to ensure seamless looping
  const tickerItems = [...items, ...items];

  return (
    <div className="flex bg-primary/10 text-sm text-primary dark:bg-primary dark:text-white">
      <div className="flex flex-shrink-0 items-center gap-2 bg-primary px-4 py-2 rounded-r-lg z-10 dark:bg-white">
        <FontAwesomeIcon icon={faBullhorn} className="h-5 w-5 text-white dark:text-primary" />
        <span className="font-semibold text-white dark:text-primary">Latest</span>
      </div>
      <div className="group flex flex-grow overflow-hidden">
        <div className="flex animate-marquee-container whitespace-nowrap group-hover:[animation-play-state:paused] text-primary dark:text-white">
          {tickerItems.map((item, index) => (
            <Link href={item.href} key={index} className="mx-4 flex flex-shrink-0 items-center gap-2 py-2 hover:underline">
              <Badge className="bg-primary text-white hover:bg-primary/90 dark:bg-white dark:text-primary dark:hover:bg-white/90">{item.type}</Badge>
              <span className="font-medium">{item.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// We need a wrapper for the animation because of how Tailwind JIT works.
// By defining the animation with a container class, we can ensure the keyframes are generated.
const MarqueeContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="animate-marquee-container">{children}</div>
);

// We need to define custom keyframes and animations for a seamless marquee effect
// which can't be done with standard Tailwind classes.
const animationStyles = `
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-marquee-container {
  animation: marquee 40s linear infinite;
}
`;

// Inject styles into the head
if (typeof window !== 'undefined') {
  let styleSheet = document.getElementById('marquee-styles') as HTMLStyleElement;
  if (!styleSheet) {
    styleSheet = document.createElement("style");
    styleSheet.id = 'marquee-styles';
    styleSheet.type = "text/css";
    styleSheet.innerText = animationStyles;
    document.head.appendChild(styleSheet);
  }
}
