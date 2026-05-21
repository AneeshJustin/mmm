import { captureVideoOverlay } from "@/lib/capture-invitation"
import {
  getDownloadVideoConfig,
  type TemplateVideoConfig,
} from "@/lib/template-videos"

const SCALE = 2
const FPS = 30
const MAX_CLIP_SEC = 20

function getSupportedMimeType(): string {
  const types = ["video/mp4", "video/webm;codecs=vp9", "video/webm"]
  return types.find((t) => MediaRecorder.isTypeSupported(t)) ?? "video/webm"
}

function getClipDurationSec(
  config: TemplateVideoConfig,
  video: HTMLVideoElement
): number {
  if (config.endSec !== undefined) {
    return Math.max(0.5, config.endSec - config.startSec)
  }
  const remaining = video.duration - config.startSec
  if (Number.isFinite(remaining) && remaining > 0) {
    return Math.min(remaining, MAX_CLIP_SEC)
  }
  return 10
}

async function seekVideo(video: HTMLVideoElement, time: number) {
  if (Math.abs(video.currentTime - time) < 0.05) return
  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Video seek timed out")), 5000)
    video.addEventListener(
      "seeked",
      () => {
        window.clearTimeout(timeout)
        resolve()
      },
      { once: true }
    )
    video.currentTime = time
  })
}

async function waitForVideoReady(video: HTMLVideoElement) {
  if (video.readyState >= 2) return
  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Video not ready")), 8000)
    const done = () => {
      window.clearTimeout(timeout)
      resolve()
    }
    video.addEventListener("loadeddata", done, { once: true })
    video.addEventListener("canplay", done, { once: true })
  })
}

export async function recordInvitationVideo(
  container: HTMLElement,
  templateId: string
): Promise<{ blob: Blob; extension: "mp4" | "webm" }> {
  const config = getDownloadVideoConfig(templateId)
  if (!config) {
    throw new Error("This template does not support video download")
  }

  const captureRoot =
    (container.querySelector("[data-capture-root]") as HTMLElement | null) ??
    (container.firstElementChild as HTMLElement)

  if (!captureRoot) {
    throw new Error("Preview not ready")
  }

  const video = captureRoot.querySelector("video")
  if (!video) {
    throw new Error("Video preview not found")
  }

  await waitForVideoReady(video)
  await seekVideo(video, config.startSec)

  const rect = captureRoot.getBoundingClientRect()
  const width = Math.round(rect.width) * SCALE
  const height = Math.round(rect.height) * SCALE

  if (width < 2 || height < 2) {
    throw new Error("Preview is not visible")
  }

  const overlayCanvas = await captureVideoOverlay(container)
  const clipDuration = getClipDurationSec(config, video)
  const totalFrames = Math.ceil(clipDuration * FPS)

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    throw new Error("Could not create recorder")
  }

  const mimeType = getSupportedMimeType()
  const stream = canvas.captureStream(FPS)
  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 6_000_000,
  })

  const chunks: BlobPart[] = []
  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) chunks.push(event.data)
  }

  const blobPromise = new Promise<Blob>((resolve, reject) => {
    recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType }))
    recorder.onerror = () => reject(new Error("Recording failed"))
  })

  recorder.start(200)
  await seekVideo(video, config.startSec)
  await video.play()

  let frame = 0

  await new Promise<void>((resolve) => {
    const drawFrame = () => {
      if (frame >= totalFrames) {
        recorder.stop()
        video.pause()
        resolve()
        return
      }

      if (
        config.endSec !== undefined &&
        video.currentTime >= config.endSec - 0.05
      ) {
        void seekVideo(video, config.startSec)
      }

      ctx.drawImage(video, 0, 0, width, height)
      ctx.drawImage(overlayCanvas, 0, 0, width, height)
      frame++
      requestAnimationFrame(drawFrame)
    }

    requestAnimationFrame(drawFrame)
  })

  const blob = await blobPromise
  const extension: "mp4" | "webm" = mimeType.includes("mp4") ? "mp4" : "webm"
  return { blob, extension }
}

export function downloadVideoBlob(
  blob: Blob,
  filename: string
) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
