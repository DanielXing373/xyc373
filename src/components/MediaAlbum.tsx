"use client";

import { useCallback, useEffect, useId, useRef, useState, type RefObject } from "react";
import { flushSync } from "react-dom";
import type { MediaItem } from "@/content/types";
import { LinkedText } from "./LinkedText";

const ZOOM_MIN = 1;
const ZOOM_MAX = 5;
const ZOOM_STEP = 0.25;

type ZoomState = {
  scale: number;
  x: number;
  y: number;
};

const RESET_ZOOM: ZoomState = { scale: 1, x: 0, y: 0 };

type PlaybackHandoff = {
  id: number;
  time: number;
  play: boolean;
};

type MediaAlbumProps = {
  title: string;
  items: MediaItem[];
  variant?: "page" | "entry" | "slides";
  aspect?: string;
  maxHeight?: string;
  chrome?: "inset" | "plain";
};

export function MediaAlbum({
  title,
  items,
  variant = "page",
  aspect,
  maxHeight,
  chrome = "inset",
}: MediaAlbumProps) {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [playingSrc, setPlayingSrc] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [handoff, setHandoff] = useState<PlaybackHandoff | null>(null);
  const [zoom, setZoom] = useState<ZoomState>(RESET_ZOOM);
  const zoomRef = useRef<ZoomState>(RESET_ZOOM);
  const albumRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaBoxRef = useRef<HTMLDivElement>(null);
  const pageVideoRef = useRef<HTMLVideoElement>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const expandedRef = useRef(false);
  const handoffIdRef = useRef(0);
  const dragRef = useRef<{
    pointerId: number;
    lastX: number;
    lastY: number;
    moved: boolean;
  } | null>(null);
  const pinchRef = useRef<{
    distance: number;
    zoom: ZoomState;
  } | null>(null);

  const current = items[index] ?? items[0];
  const count = items.length;
  const failed = Boolean(current && failedSrc === current.src);
  const playing = Boolean(current && playingSrc === current.src);

  const applyZoom = useCallback((next: ZoomState) => {
    zoomRef.current = next;
    setZoom(next);
  }, []);

  const resetZoom = useCallback(() => {
    applyZoom(RESET_ZOOM);
  }, [applyZoom]);

  const zoomToward = useCallback(
    (clientX: number, clientY: number, nextScale: number) => {
      const currentZoom = zoomRef.current;
      const clamped = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, nextScale));
      if (clamped <= ZOOM_MIN) {
        applyZoom(RESET_ZOOM);
        return;
      }

      const box = mediaBoxRef.current ?? stageRef.current;
      if (!box) {
        applyZoom({ ...currentZoom, scale: clamped });
        return;
      }

      const rect = box.getBoundingClientRect();
      const cx = clientX - (rect.left + rect.width / 2);
      const cy = clientY - (rect.top + rect.height / 2);
      const ratio = clamped / currentZoom.scale;
      applyZoom({
        scale: clamped,
        x: currentZoom.x + cx * (1 - ratio),
        y: currentZoom.y + cy * (1 - ratio),
      });
    },
    [applyZoom],
  );

  const stepZoom = useCallback(
    (delta: number) => {
      const box = mediaBoxRef.current ?? stageRef.current;
      const rect = box?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width / 2 : 0;
      const cy = rect ? rect.top + rect.height / 2 : 0;
      zoomToward(cx, cy, zoomRef.current.scale + delta);
    },
    [zoomToward],
  );

  const captureHandoff = useCallback((video: HTMLVideoElement | null): PlaybackHandoff => {
    handoffIdRef.current += 1;
    return {
      id: handoffIdRef.current,
      time: video && Number.isFinite(video.currentTime) ? video.currentTime : 0,
      play: Boolean(video && !video.paused && !video.ended),
    };
  }, []);

  const applyPlayback = useCallback((video: HTMLVideoElement | null, next: PlaybackHandoff) => {
    if (!video) {
      return;
    }
    if (Number.isFinite(next.time)) {
      try {
        video.currentTime = next.time;
      } catch {
        // Seek can throw if the media element is not ready.
      }
    }
    if (next.play) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const closeLightbox = useCallback(() => {
    const item = current;
    if (item?.type === "video") {
      const next = captureHandoff(lightboxVideoRef.current);
      flushSync(() => {
        setHandoff(next);
        if (next.play) {
          setPlayingSrc(item.src);
        }
        setExpanded(false);
      });
      applyPlayback(pageVideoRef.current, next);
    } else {
      setExpanded(false);
    }
    resetZoom();
  }, [applyPlayback, captureHandoff, current, resetZoom]);

  const openLightbox = useCallback(() => {
    const item = current;
    if (item?.type === "video") {
      const next = captureHandoff(pageVideoRef.current);
      pageVideoRef.current?.pause();
      flushSync(() => {
        setHandoff(next);
        if (next.play) {
          setPlayingSrc(item.src);
        }
        setExpanded(true);
      });
      applyPlayback(lightboxVideoRef.current, next);
      return;
    }
    setExpanded(true);
  }, [applyPlayback, captureHandoff, current]);

  const go = useCallback(
    (direction: -1 | 1) => {
      setIndex((value) => (value + direction + count) % count);
      setPlayingSrc(null);
      setHandoff(null);
      resetZoom();
    },
    [count, resetZoom],
  );

  useEffect(() => {
    expandedRef.current = expanded;
    if (!expanded) {
      resetZoom();
    }
  }, [expanded, resetZoom]);

  useEffect(() => {
    const root = albumRef.current;
    if (!root) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || entry.isIntersecting) {
          return;
        }
        pageVideoRef.current?.pause();
        if (!expandedRef.current) {
          lightboxVideoRef.current?.pause();
        }
      },
      { threshold: 0, rootMargin: "-48px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [closeLightbox, expanded, go]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    const syncStageSize = () => {
      stage.style.setProperty("--stage-h", `${stage.clientHeight}px`);
      stage.style.setProperty("--stage-w", `${stage.clientWidth}px`);
    };

    syncStageSize();
    const observer = new ResizeObserver(syncStageSize);
    observer.observe(stage);

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const currentZoom = zoomRef.current;
      const factor = event.ctrlKey
        ? Math.exp(-event.deltaY * 0.01)
        : Math.exp(-event.deltaY * 0.0018);
      zoomToward(event.clientX, event.clientY, currentZoom.scale * factor);
    };

    const touchDistance = (touches: TouchList) => {
      const first = touches[0];
      const second = touches[1];
      if (!first || !second) {
        return 0;
      }
      return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
    };

    const touchMidpoint = (touches: TouchList) => {
      const first = touches[0];
      const second = touches[1];
      if (!first || !second) {
        return { x: 0, y: 0 };
      }
      return {
        x: (first.clientX + second.clientX) / 2,
        y: (first.clientY + second.clientY) / 2,
      };
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        dragRef.current = null;
        pinchRef.current = {
          distance: touchDistance(event.touches),
          zoom: zoomRef.current,
        };
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 2 || !pinchRef.current) {
        return;
      }
      event.preventDefault();
      const distance = touchDistance(event.touches);
      if (pinchRef.current.distance <= 0 || distance <= 0) {
        return;
      }
      const mid = touchMidpoint(event.touches);
      zoomToward(
        mid.x,
        mid.y,
        pinchRef.current.zoom.scale * (distance / pinchRef.current.distance),
      );
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (event.touches.length < 2) {
        pinchRef.current = null;
      }
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    stage.addEventListener("touchend", onTouchEnd);
    stage.addEventListener("touchcancel", onTouchEnd);

    return () => {
      observer.disconnect();
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      stage.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [expanded, zoomToward]);

  if (!current) {
    return (
      <p className="text-sm text-ink-muted">No media in this album yet.</p>
    );
  }

  const frameSrc =
    current.type === "video" ? (current.poster ?? current.src) : current.src;

  const stageFill = chrome === "plain" ? "bg-transparent" : "bg-paper-inset";
  const stageClass = maxHeight
    ? `relative w-full shrink-0 overflow-hidden ${stageFill}`
    : aspect
      ? `relative w-full overflow-hidden ${stageFill}`
      : variant === "slides"
        ? `relative aspect-video w-full overflow-hidden ${stageFill}`
        : variant === "entry"
          ? `relative h-[78svh] overflow-hidden ${stageFill}`
          : `relative h-[82svh] overflow-hidden ${stageFill}`;

  const startPan = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || zoomRef.current.scale <= 1 || pinchRef.current) {
      return;
    }
    if (isMediaChromeHit(event.target, event.clientY)) {
      return;
    }
    dragRef.current = {
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: false,
    };
  };

  const movePan = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }
    const dx = event.clientX - drag.lastX;
    const dy = event.clientY - drag.lastY;
    if (!drag.moved) {
      if (Math.abs(dx) + Math.abs(dy) <= 3) {
        return;
      }
      drag.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    const currentZoom = zoomRef.current;
    applyZoom({
      scale: currentZoom.scale,
      x: currentZoom.x + dx,
      y: currentZoom.y + dy,
    });
  };

  const endPan = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={albumRef}
      className={`flex w-full max-w-full flex-col ${maxHeight ? "" : "h-full"}`}
    >
      <p id={labelId} className="sr-only">
        Media album for {title}
      </p>
      <div
        className={`relative flex flex-col overflow-hidden ${chrome === "plain" ? "bg-transparent" : "rounded-sm bg-paper-inset"} ${maxHeight ? "" : "min-h-0 flex-1"}`}
        role="region"
        aria-labelledby={labelId}
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={(event) => {
          if (expanded) {
            return;
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            go(1);
          }
        }}
      >
        <div
          className={stageClass}
          style={
            maxHeight
              ? { height: maxHeight, minHeight: maxHeight }
              : aspect
                ? { aspectRatio: aspect }
                : undefined
          }
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {failed ? (
              <FailedFrame item={current} />
            ) : current.type === "video" ? (
              <div
                className={`h-full w-full min-h-0 min-w-0 ${expanded ? "invisible" : ""}`}
                aria-hidden={expanded}
              >
                <VideoPreview
                  item={current}
                  started={playing}
                  active={!expanded}
                  handoff={expanded ? null : handoff}
                  videoRef={pageVideoRef}
                  onStart={() => setPlayingSrc(current.src)}
                  onError={() => setFailedSrc(current.src)}
                />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={frameSrc}
                src={frameSrc}
                alt={current.alt}
                className="h-full w-full object-contain"
              />
            )}
          </div>

          <button
            type="button"
            className="absolute top-3 right-3 z-10 flex min-h-11 min-w-11 items-center justify-center rounded-sm bg-paper-raised/90 text-ink hover:bg-paper-raised"
            onClick={openLightbox}
            aria-label="Enlarge"
          >
            <FullscreenIcon />
          </button>

          {count > 1 ? (
            <>
              <button
                type="button"
                className="absolute top-1/2 left-2 z-10 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper-raised/90 text-xl text-ink hover:bg-paper-raised"
                onClick={() => go(-1)}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute top-1/2 right-2 z-10 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper-raised/90 text-xl text-ink hover:bg-paper-raised"
                onClick={() => go(1)}
                aria-label="Next"
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        <div
          className={`${chrome === "plain" ? "bg-transparent" : "bg-paper-raised/80"} flex min-h-[4.25rem] items-start px-4 py-3`}
          aria-live="polite"
        >
          <Caption item={current} index={index} count={count} />
        </div>
      </div>

      {expanded ? (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-ink/90 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${labelId}-zoom-title`}
          onClick={() => {
            if (window.getSelection()?.toString()) {
              return;
            }
            if (dragRef.current?.moved) {
              return;
            }
            closeLightbox();
          }}
        >
          <div className="mx-auto flex h-full w-full max-w-[90rem] flex-col">
            <div className="flex items-center justify-end gap-6 py-2">
              <ZoomControls
                scale={zoom.scale}
                onZoomOut={() => stepZoom(-ZOOM_STEP)}
                onZoomIn={() => stepZoom(ZOOM_STEP)}
                onReset={resetZoom}
              />
              <button
                type="button"
                className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-sm bg-paper-raised px-3 text-sm text-ink"
                onClick={(event) => {
                  event.stopPropagation();
                  closeLightbox();
                }}
              >
                Close
              </button>
            </div>
            <div className="flex min-h-0 flex-1 items-center gap-1 overflow-hidden md:gap-2">
              {count > 1 ? (
                <button
                  type="button"
                  className="flex size-14 shrink-0 items-center justify-center rounded-full bg-paper-raised text-3xl leading-none text-ink md:size-16 md:text-4xl"
                  onClick={(event) => {
                    event.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous"
                >
                  ‹
                </button>
              ) : null}
              <div
                ref={stageRef}
                className="flex h-full min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden"
              >
                <div
                  ref={mediaBoxRef}
                  className={`relative h-fit w-fit max-h-full max-w-full ${zoom.scale > 1 ? "cursor-grab" : ""}`}
                  style={{
                    transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})`,
                    transformOrigin: "center center",
                  }}
                  onClick={(event) => event.stopPropagation()}
                  onPointerDown={startPan}
                  onPointerMove={movePan}
                  onPointerUp={endPan}
                  onPointerCancel={endPan}
                >
                  {current.type === "video" ? (
                    <VideoPreview
                      item={current}
                      started={playing}
                      active
                      handoff={handoff}
                      videoRef={lightboxVideoRef}
                      onStart={() => setPlayingSrc(current.src)}
                      onError={() => setFailedSrc(current.src)}
                      fit="contain"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={current.src}
                      alt={current.alt}
                      className="lightbox-media block object-contain"
                      draggable={false}
                    />
                  )}
                </div>
              </div>
              {count > 1 ? (
                <button
                  type="button"
                  className="flex size-14 shrink-0 items-center justify-center rounded-full bg-paper-raised text-3xl leading-none text-ink md:size-16 md:text-4xl"
                  onClick={(event) => {
                    event.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next"
                >
                  ›
                </button>
              ) : null}
            </div>
            <div
              id={`${labelId}-zoom-title`}
              className="mt-3 w-max max-w-[min(72rem,calc(100%-2rem))] shrink-0 self-start pb-1 pl-14 text-paper-raised md:pl-16"
              onClick={(event) => event.stopPropagation()}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <Caption item={current} index={index} count={count} light />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ZoomControls({
  scale,
  onZoomOut,
  onZoomIn,
  onReset,
}: {
  scale: number;
  onZoomOut: () => void;
  onZoomIn: () => void;
  onReset: () => void;
}) {
  const percent = Math.round(scale * 100);
  const atMin = scale <= ZOOM_MIN + 0.001;
  const atMax = scale >= ZOOM_MAX - 0.001;

  return (
    <div
      className="inline-flex items-stretch rounded-sm bg-paper-raised text-ink"
      role="group"
      aria-label="Zoom"
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="flex min-h-11 min-w-11 items-center justify-center text-lg leading-none select-none hover:bg-white disabled:opacity-35 disabled:hover:bg-transparent"
        onClick={onZoomOut}
        disabled={atMin}
        aria-label="Zoom out"
      >
        −
      </button>
      <button
        type="button"
        className="min-w-12 px-1 text-center font-sans text-sm tabular-nums select-none hover:bg-white"
        onClick={onReset}
        aria-label={`Reset zoom to 100 percent. Current zoom ${percent} percent`}
      >
        {percent}%
      </button>
      <button
        type="button"
        className="flex min-h-11 min-w-11 items-center justify-center text-lg leading-none select-none hover:bg-white disabled:opacity-35 disabled:hover:bg-transparent"
        onClick={onZoomIn}
        disabled={atMax}
        aria-label="Zoom in"
      >
        +
      </button>
    </div>
  );
}

function isMediaChromeHit(target: EventTarget | null, clientY: number) {
  if (target instanceof Element && target.closest("button")) {
    return true;
  }
  if (!(target instanceof HTMLVideoElement) || !target.controls) {
    return false;
  }
  const rect = target.getBoundingClientRect();
  return clientY >= rect.bottom - 72;
}

function VideoPreview({
  item,
  started,
  onStart,
  onError,
  fit = "fill",
  active = true,
  handoff,
  videoRef,
}: {
  item: MediaItem;
  started: boolean;
  onStart: () => void;
  onError: () => void;
  fit?: "fill" | "contain";
  active?: boolean;
  handoff?: PlaybackHandoff | null;
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const appliedHandoffId = useRef<number | null>(null);

  useEffect(() => {
    appliedHandoffId.current = null;
  }, [item.src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (!active) {
      video.pause();
      video.muted = true;
      return;
    }
    video.muted = false;
  }, [active, videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !active || !handoff) {
      return;
    }
    if (appliedHandoffId.current === handoff.id) {
      return;
    }

    const apply = () => {
      appliedHandoffId.current = handoff.id;
      if (Number.isFinite(handoff.time)) {
        try {
          video.currentTime = handoff.time;
        } catch {
          // Seek can throw if the media element is not ready.
        }
      }
      if (handoff.play) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    if (video.readyState >= 1) {
      apply();
      return;
    }

    video.addEventListener("loadedmetadata", apply, { once: true });
    return () => video.removeEventListener("loadedmetadata", apply);
  }, [active, handoff, videoRef]);

  const contain = fit === "contain";

  return (
    <div
      className={
        contain
          ? "relative inline-block max-h-full max-w-full"
          : "relative h-full w-full min-h-0 min-w-0 overflow-hidden"
      }
    >
      <video
        ref={videoRef}
        key={item.src}
        className={
          contain
            ? "lightbox-media block object-contain [touch-action:auto]"
            : "h-full w-full object-contain"
        }
        controls={started}
        preload={started || Boolean(handoff) ? "auto" : "metadata"}
        playsInline
        aria-label={item.alt}
        onError={onError}
        onPlay={onStart}
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          if (started || handoff || !Number.isFinite(video.duration) || video.duration <= 0) {
            return;
          }
          video.currentTime = Math.min(1.2, video.duration * 0.12);
        }}
      >
        <source src={item.src} type="video/mp4" />
      </video>
      {started ? null : (
        <button
          type="button"
          className="absolute top-1/2 left-1/2 z-[15] flex min-h-16 min-w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-paper-raised hover:bg-ink/80"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            const video = videoRef.current;
            if (video && Number.isFinite(video.currentTime) && video.currentTime > 0) {
              try {
                video.currentTime = 0;
              } catch {
                // Seek can throw if the media element is not ready.
              }
            }
            onStart();
            void video?.play().catch(() => {});
          }}
          aria-label="Play video"
        >
          <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
}

function Caption({
  item,
  index,
  count,
  light = false,
}: {
  item: MediaItem;
  index: number;
  count: number;
  light?: boolean;
}) {
  const muted = light ? "text-paper-raised/80" : "text-ink-muted";
  const body = light ? "text-paper-raised" : "text-ink";

  const caption = item.caption.trim();
  const detail = item.detail.trim();
  const line =
    caption && detail ? `${caption} — ${detail}` : caption || detail;

  return (
    <p
      className={`font-sans text-sm ${body} ${light ? "w-max max-w-full whitespace-nowrap" : ""}`}
    >
      <span className={`tabular-nums ${muted}`}>
        {index + 1}/{count}
      </span>
      <span className="mx-2 opacity-50" aria-hidden="true">
        |
      </span>
      {line ? <LinkedText text={line} /> : null}
    </p>
  );
}

function FullscreenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
    </svg>
  );
}

function FailedFrame({ item }: { item: MediaItem }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-start justify-end gap-2 bg-paper-inset p-5"
      role="img"
      aria-label={`${item.alt} Media did not load.`}
    >
      <p className="rounded-sm bg-accent px-2 py-1 text-xs tracking-wide text-paper-raised uppercase">
        {item.type === "video" ? "Video unavailable" : "Image unavailable"}
      </p>
      <p className="max-w-md text-base text-ink">{item.caption}</p>
      <p className="max-w-md text-sm text-ink-muted">{item.detail}</p>
    </div>
  );
}
