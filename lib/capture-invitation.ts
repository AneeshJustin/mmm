import html2canvas from "html2canvas"

const RELIGION_BG: Record<string, string> = {
  hindu: "#fff7ed",
  muslim: "#ecfdf5",
  christian: "#eff6ff",
}

const TEXT_PROPS = [
  "color",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "line-height",
  "letter-spacing",
  "text-align",
  "text-transform",
] as const

const BOX_PROPS = [
  "background-color",
  "border-color",
  "border-width",
  "border-style",
  "border-radius",
  "box-shadow",
  "opacity",
  "padding",
  "margin",
  "width",
  "height",
  "display",
  "flex-direction",
  "align-items",
  "justify-content",
  "gap",
  "position",
  "top",
  "left",
  "right",
  "bottom",
  "z-index",
  "overflow",
  "object-fit",
] as const

function hasUnsupportedColor(value: string): boolean {
  return /lab\(|oklch\(|color-mix\(/i.test(value)
}

function safeCSSValue(computed: CSSStyleDeclaration, prop: string): string | null {
  const value = computed.getPropertyValue(prop)
  if (!value || value === "none" || value === "normal") return null
  if (hasUnsupportedColor(value)) return null
  return value
}

/** Copy resolved RGB styles and drop Tailwind classes so html2canvas never parses lab(). */
function mirrorResolvedStyles(source: Element, target: Element) {
  const sourceEl = source as HTMLElement
  const targetEl = target as HTMLElement
  const computed = window.getComputedStyle(sourceEl)

  targetEl.removeAttribute("class")
  targetEl.style.cssText = ""

  for (const prop of [...TEXT_PROPS, ...BOX_PROPS]) {
    const value = safeCSSValue(computed, prop)
    if (value) targetEl.style.setProperty(prop, value)
  }

  const bg = computed.backgroundColor
  if (bg && !hasUnsupportedColor(bg)) {
    targetEl.style.setProperty("background-color", bg)
  }

  targetEl.style.setProperty("background-image", "none")
  targetEl.style.setProperty("transform", "none")
  targetEl.style.setProperty("animation", "none")
  targetEl.style.setProperty("transition", "none")
}

function mirrorTree(sourceRoot: HTMLElement, targetRoot: HTMLElement) {
  mirrorResolvedStyles(sourceRoot, targetRoot)

  const sourceNodes = sourceRoot.querySelectorAll("*")
  const targetNodes = targetRoot.querySelectorAll("*")
  const count = Math.min(sourceNodes.length, targetNodes.length)

  for (let i = 0; i < count; i++) {
    const source = sourceNodes[i]
    if (source.tagName === "VIDEO" || source.hasAttribute("data-capture-hide")) {
      ;(targetNodes[i] as HTMLElement).style.display = "none"
      continue
    }
    mirrorResolvedStyles(source, targetNodes[i])
  }
}

function applyReligionBackground(root: HTMLElement) {
  const religion = root.getAttribute("data-religion")
  if (religion && RELIGION_BG[religion]) {
    root.style.setProperty("background-color", RELIGION_BG[religion])
  }
}

export function getCaptureRoot(container: HTMLElement): HTMLElement {
  return (
    (container.querySelector("[data-capture-root]") as HTMLElement | null) ??
    (container.firstElementChild as HTMLElement | null) ??
    container
  )
}

/** Clone into a blank iframe — no app stylesheets, no lab() parse errors. */
async function captureInCleanIframe(
  sourceRoot: HTMLElement,
  scale: number,
  hasVideo: boolean
): Promise<HTMLCanvasElement> {
  const rect = sourceRoot.getBoundingClientRect()
  const width = Math.round(rect.width)
  const height = Math.round(rect.height)

  const iframe = document.createElement("iframe")
  iframe.setAttribute("aria-hidden", "true")
  iframe.style.cssText = `position:fixed;left:-10000px;top:0;width:${width}px;height:${height}px;border:0;visibility:hidden;`
  document.body.appendChild(iframe)

  const doc = iframe.contentDocument
  if (!doc) {
    iframe.remove()
    throw new Error("Could not create capture frame")
  }

  doc.open()
  doc.write(
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:transparent;"></body></html>'
  )
  doc.close()

  try {
    const clone = sourceRoot.cloneNode(true) as HTMLElement
    mirrorTree(sourceRoot, clone)

    if (!hasVideo) {
      applyReligionBackground(clone)
    }

    clone.style.width = `${width}px`
    clone.style.height = `${height}px`
    clone.style.boxSizing = "border-box"

    doc.body.appendChild(clone)

    return await html2canvas(clone, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: hasVideo ? null : "#fff8dc",
      logging: false,
      imageTimeout: 15000,
      width,
      height,
      windowWidth: width,
      windowHeight: height,
    })
  } finally {
    iframe.remove()
  }
}

async function waitForVideoFrame(video: HTMLVideoElement): Promise<void> {
  if (video.readyState >= 2) return

  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Video timed out")), 8000)
    const finish = () => {
      window.clearTimeout(timeout)
      resolve()
    }
    video.addEventListener("loadeddata", finish, { once: true })
    video.addEventListener("canplay", finish, { once: true })
    video.addEventListener(
      "error",
      () => {
        window.clearTimeout(timeout)
        reject(new Error("Video failed to load"))
      },
      { once: true }
    )
  })
}

async function drawVideoPoster(
  ctx: CanvasRenderingContext2D,
  poster: string,
  width: number,
  height: number
) {
  const img = new Image()
  img.crossOrigin = "anonymous"
  img.src = poster
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(new Error("Poster failed to load"))
  })
  ctx.drawImage(img, 0, 0, width, height)
}

/** Text/overlay layer only (transparent where video shows through). */
export async function captureVideoOverlay(
  container: HTMLElement
): Promise<HTMLCanvasElement> {
  const captureRoot = getCaptureRoot(container)
  return captureInCleanIframe(captureRoot, 2, true)
}

export async function captureInvitationElement(
  container: HTMLElement
): Promise<HTMLCanvasElement> {
  const captureRoot = getCaptureRoot(container)
  const scale = 2
  const rect = captureRoot.getBoundingClientRect()
  const width = Math.round(rect.width)
  const height = Math.round(rect.height)

  if (width < 1 || height < 1) {
    throw new Error("Preview is not visible. Scroll to the preview and try again.")
  }

  const video = captureRoot.querySelector("video")
  const hasVideo = Boolean(video)

  const overlayCanvas = await captureInCleanIframe(captureRoot, scale, hasVideo)

  if (!hasVideo || !video) {
    return overlayCanvas
  }

  const composite = document.createElement("canvas")
  composite.width = overlayCanvas.width
  composite.height = overlayCanvas.height
  const ctx = composite.getContext("2d")
  if (!ctx) {
    throw new Error("Could not create canvas")
  }

  try {
    await waitForVideoFrame(video)
    ctx.drawImage(video, 0, 0, composite.width, composite.height)
  } catch {
    if (video.poster) {
      await drawVideoPoster(ctx, video.poster, composite.width, composite.height)
    } else {
      ctx.fillStyle = "#1a1a1a"
      ctx.fillRect(0, 0, composite.width, composite.height)
    }
  }

  ctx.drawImage(overlayCanvas, 0, 0)
  return composite
}

export function downloadCanvasAsPng(
  canvas: HTMLCanvasElement,
  filename: string
) {
  const link = document.createElement("a")
  link.download = filename
  link.href = canvas.toDataURL("image/png", 1.0)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function buildInvitationFilename(
  brideName: string,
  groomName: string,
  ext: "png" | "mp4" | "webm"
) {
  const safe = (s: string) =>
    s.trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-") || "invitation"
  return `${safe(brideName)}-${safe(groomName)}-invitation.${ext}`
}
