// Node modules
import { useRef, useEffect, useState, type ReactNode } from 'react';

// Constants
const SCROLLBAR_HIDE_DELAY_MS = 5000;
const SCROLLBAR_FADE_MS = 300;
const THUMB_MIN_HEIGHT = 20;
// Hover detection zone: how many px from the right edge trigger the scrollbar
const SCROLLBAR_HOVER_ZONE = 10;

// Interfaces
interface CustomScrollAreaProps {
  children: ReactNode;
  className?: string;
}

export function CustomScrollArea({
  children,
  className = '',
}: CustomScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isNearScrollbarRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);
  const [showScrollbar, setShowScrollbar] = useState(true);

  const updateThumb = () => {
    const el = scrollRef.current;
    const thumb = thumbRef.current;
    if (!el || !thumb) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const thumbHeight = Math.max(
      THUMB_MIN_HEIGHT,
      (clientHeight / scrollHeight) * clientHeight,
    );
    const maxTop = clientHeight - thumbHeight;
    const top =
      scrollHeight <= clientHeight
        ? 0
        : (scrollTop / (scrollHeight - clientHeight)) * maxTop;

    thumb.style.height = `${thumbHeight}px`;
    thumb.style.top = `${top}px`;
  };

  const scheduleHide = () => {
    if (isNearScrollbarRef.current || isDraggingRef.current) return;
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(
      () => setShowScrollbar(false),
      SCROLLBAR_HIDE_DELAY_MS,
    );
  };

  useEffect(() => {
    updateThumb();
    scheduleHide();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleScroll = () => {
    updateThumb();
    setShowScrollbar(true);
    scheduleHide();
  };

  // Detect proximity to the right-edge scrollbar track only
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nearScrollbar = e.clientX >= rect.right - SCROLLBAR_HOVER_ZONE;

    if (nearScrollbar === isNearScrollbarRef.current) return;

    isNearScrollbarRef.current = nearScrollbar;
    if (nearScrollbar) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      setShowScrollbar(true);
    } else if (!isDraggingRef.current) {
      scheduleHide();
    }
  };

  const handleMouseLeave = () => {
    isNearScrollbarRef.current = false;
    if (!isDraggingRef.current) scheduleHide();
  };

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartScrollTopRef.current = scrollRef.current?.scrollTop ?? 0;

    const onMouseMove = (ev: MouseEvent) => {
      const el = scrollRef.current;
      const thumb = thumbRef.current;
      if (!el || !thumb) return;

      const deltaY = ev.clientY - dragStartYRef.current;
      const { scrollHeight, clientHeight } = el;
      const thumbHeight = parseFloat(thumb.style.height);
      const maxTop = clientHeight - thumbHeight;
      if (maxTop <= 0) return;

      el.scrollTop =
        dragStartScrollTopRef.current +
        (deltaY / maxTop) * (scrollHeight - clientHeight);
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (!isNearScrollbarRef.current) scheduleHide();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <main
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={scrollRef}
        className='h-full w-full overflow-y-auto scrollbar-hidden'
        onScroll={handleScroll}
      >
        {children}
      </div>

      {/* pointer-events-none on track so wheel events pass through to the scroll container */}
      <div
        className='absolute right-0 top-0 bottom-0 w-[6px] pointer-events-none'
        style={{
          opacity: showScrollbar ? 1 : 0,
          transition: `opacity ${SCROLLBAR_FADE_MS}ms ease-in-out`,
        }}
        aria-hidden
      >
        <div className='w-full h-full bg-[#f1f1f1] relative overflow-hidden'>
          <div
            ref={thumbRef}
            className='absolute left-0 right-0 w-full'
            style={{
              height: THUMB_MIN_HEIGHT,
              top: 0,
              backgroundColor: '#999999',
              cursor: 'default',
              pointerEvents: 'auto',
            }}
            onMouseDown={handleThumbMouseDown}
          />
        </div>
      </div>
    </main>
  );
}
