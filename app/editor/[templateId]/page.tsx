"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { templates } from "@/components/featured-templates";
import {
  buildInvitationFilename,
  captureInvitationElement,
  downloadCanvasAsPng,
} from "@/lib/capture-invitation";
import {
  downloadVideoBlob,
  recordInvitationVideo,
} from "@/lib/record-invitation-video";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { VideoInvitation } from "@/components/video-invitation";
import { ScrollStoryInvitation } from "@/components/scroll-story/scroll-story-invitation";
import { getTemplateVideo, supportsVideoDownload } from "@/lib/template-videos";
import {
  saveInvitationData,
  toScrollStoryData,
} from "@/lib/invitation-storage";
import {
  ArrowLeft,
  Download,
  Share2,
  Eye,
  Edit3,
  Type,
  Calendar,
  MapPin,
  Image as ImageIcon,
  Palette,
  Heart,
  ExternalLink,
  ShoppingCart,
  Music,
} from "lucide-react";

interface InvitationData {
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  message: string;
  couplePhoto: string | null;
  fontStyle: string;
  musicFile: string | null;
}

const fontOptions = [
  { value: "font-serif", label: "Elegant Serif" },
  { value: "font-sans", label: "Modern Sans" },
  { value: "font-mono", label: "Classic Mono" },
];

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.templateId as string;
  const template = templates.find((t) => t.id === templateId);
  const previewRef = useRef<HTMLDivElement>(null);

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const isVideoTemplate =
    template?.type === "animated" && Boolean(getTemplateVideo(templateId));
  const isStoryTemplate = template?.type === "story";
  const canDownloadVideo = supportsVideoDownload(templateId);

  const [data, setData] = useState<InvitationData>({
    brideName: "Priya",
    groomName: "Arjun",
    brideParents: "Mr. & Mrs. Krishnan Nair",
    groomParents: "Mr. & Mrs. Raghavan Menon",
    date: "2024-12-15",
    time: "10:30 AM",
    venue: "Guruvayur Temple",
    venueAddress: "Guruvayur, Thrissur, Kerala",
    message:
      "Together with our families, we invite you to celebrate our wedding",
    couplePhoto: null,
    fontStyle: "font-serif",
    musicFile: null,
  });

  const updateField = (field: keyof InvitationData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prev) => ({ ...prev, couplePhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prev) => ({ ...prev, musicFile: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const runDownload = useCallback(async () => {
    if (!previewRef.current) {
      toast.error("Preview not ready");
      return;
    }

    setIsDownloading(true);

    try {
      if (canDownloadVideo) {
        toast.message(
          isStoryTemplate ? "Recording cinematic clip…" : "Recording video…",
          { duration: 3000 },
        );
        const { blob, extension } = await recordInvitationVideo(
          previewRef.current,
          templateId,
        );
        const filename = buildInvitationFilename(
          data.brideName,
          data.groomName,
          extension,
        );
        downloadVideoBlob(blob, filename);
        toast.success(`Downloaded video (.${extension})`);
      } else {
        const canvas = await captureInvitationElement(previewRef.current);
        const filename = buildInvitationFilename(
          data.brideName,
          data.groomName,
          "png",
        );
        downloadCanvasAsPng(canvas, filename);
        toast.success("Downloaded PNG");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Download failed";
      console.error("Download error:", error);
      toast.error(message);
    } finally {
      setIsDownloading(false);
    }
  }, [
    data.brideName,
    data.groomName,
    canDownloadVideo,
    isStoryTemplate,
    templateId,
  ]);

  const openFullPreview = () => {
    if (isStoryTemplate) {
      saveInvitationData(templateId, toScrollStoryData(data));
    }
  };

  const copyTextToClipboard = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text);
    }

    if (typeof document !== "undefined") {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, text.length);

      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (!successful) {
        throw new Error("Copy command failed");
      }
    }
  };

  const shareInvitation = async () => {
    console.log("Sharing invitation with data:", data);

    // Save data before sharing
    if (isStoryTemplate) {
      saveInvitationData(templateId, toScrollStoryData(data));
    } else {
      saveInvitationData(templateId, toScrollStoryData(data));
    }

    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/invitation/${templateId}`
        : "";

    const text = `${data.brideName} & ${data.groomName} — Wedding Invitation`;
    const fullMessage = `${data.message}\n\n${url}`;

    try {
      // First try: Web Share API (mobile + some desktop)
      if (
        navigator.share &&
        /Android|iPhone|iPad|iPod/.test(navigator.userAgent)
      ) {
        await navigator.share({
          title: text,
          text: data.message,
          url,
        });
        toast.success("Invitation shared!");
        return;
      }

      // Second try: Copy to clipboard (works on all Windows/Mac/Linux)
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        return;
      }

      // Fallback: Old clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (success) {
        toast.success("Link copied to clipboard!");
      } else {
        throw new Error("Copy command failed");
      }
    } catch (error) {
      console.error("Share failed:", error);

      // Last resort: Show modal or fallback UI
      toast.error("Could not copy automatically");

      // Option A: Show the URL in a modal for manual copy
      // Option B: Open a share modal with preset social links
      // Create this component
    }
  };
  if (!template) {
    return (
      <div className="min-h-screen bg-kerala-ivory flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-kerala-dark mb-4">
            Template not found
          </h1>
          <Link href="/templates" className="text-kerala-green hover:underline">
            Browse templates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div className="min-h-screen bg-kerala-beige">
      <Toaster richColors position="top-center" />
      {/* Header */}
      <header className="bg-kerala-dark text-kerala-ivory py-4 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/templates")}
              className="p-2 hover:bg-kerala-green/20 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="font-bold text-lg">{template.name}</h1>
              <p className="text-sm text-kerala-ivory/60">
                Editing your invitation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isPreviewMode
                  ? "bg-kerala-gold text-kerala-dark"
                  : "bg-kerala-green/20 hover:bg-kerala-green/30"
              }`}
            >
              {isPreviewMode ? <Edit3 size={18} /> : <Eye size={18} />}
              <span className="hidden sm:inline">
                {isPreviewMode ? "Edit" : "Preview"}
              </span>
            </button>

            {isStoryTemplate && (
              <Link
                href={`/invitation/${templateId}`}
                target="_blank"
                onClick={openFullPreview}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-900/30 text-amber-200 hover:bg-amber-900/50 transition-colors"
              >
                <ExternalLink size={18} />
                <span className="hidden sm:inline">Full Preview</span>
              </Link>
            )}
            <button
              type="button"
              onClick={shareInvitation}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-kerala-green/20 hover:bg-kerala-green/30 transition-colors"
            >
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
            </button>
            <Link
              href={`/rsvp?invitation=${templateId}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-kerala-green/20 hover:bg-kerala-green/30 transition-colors"
            >
              <Heart size={18} />
              <span className="hidden sm:inline">RSVP</span>
            </Link>

            <Link
              href={`/payment?templateId=${templateId}`}
              className="flex items-center gap-2 px-4 py-2 bg-kerala-gold text-kerala-dark rounded-lg hover:bg-kerala-ivory transition-colors font-semibold"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Buy ₹3,999</span>
            </Link>

            <button
              type="button"
              disabled={isDownloading}
              onClick={runDownload}
              className="flex items-center gap-2 px-4 py-2 bg-kerala-green/20 hover:bg-kerala-green/30 transition-colors rounded-lg disabled:opacity-50"
            >
              <Download size={18} />
              <span className="hidden sm:inline">
                {isDownloading
                  ? "Saving…"
                  : canDownloadVideo
                    ? "Download Video"
                    : "Download PNG"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div
          className={`grid gap-8 ${
            isPreviewMode && isStoryTemplate ? "grid-cols-1" : "lg:grid-cols-2"
          }`}
        >
          {/* Editor Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={isPreviewMode ? "hidden" : ""}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-kerala-gold/10 overflow-hidden">
              <div className="p-6 border-b border-kerala-gold/10">
                <h2 className="text-xl font-bold text-kerala-dark flex items-center gap-2">
                  <Edit3 className="text-kerala-green" size={24} />
                  Edit Your Invitation
                </h2>
              </div>

              <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                {/* Names Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-kerala-dark flex items-center gap-2">
                    <Type size={18} className="text-kerala-gold" />
                    Couple Names
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-kerala-dark/60 mb-1">
                        Bride&apos;s Name
                      </label>
                      <input
                        type="text"
                        value={data.brideName}
                        onChange={(e) =>
                          updateField("brideName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-kerala-gold/20 rounded-lg focus:ring-2 focus:ring-kerala-green focus:border-transparent transition-all"
                        placeholder="Bride's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-kerala-dark/60 mb-1">
                        Groom&apos;s Name
                      </label>
                      <input
                        type="text"
                        value={data.groomName}
                        onChange={(e) =>
                          updateField("groomName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-kerala-gold/20 rounded-lg focus:ring-2 focus:ring-kerala-green focus:border-transparent transition-all"
                        placeholder="Groom's name"
                      />
                    </div>
                  </div>
                </div>

                {/* Parents Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-kerala-dark">
                    Parents&apos; Names
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-kerala-dark/60 mb-1">
                        Bride&apos;s Parents
                      </label>
                      <input
                        type="text"
                        value={data.brideParents}
                        onChange={(e) =>
                          updateField("brideParents", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-kerala-gold/20 rounded-lg focus:ring-2 focus:ring-kerala-green focus:border-transparent transition-all"
                        placeholder="Bride's parents"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-kerala-dark/60 mb-1">
                        Groom&apos;s Parents
                      </label>
                      <input
                        type="text"
                        value={data.groomParents}
                        onChange={(e) =>
                          updateField("groomParents", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-kerala-gold/20 rounded-lg focus:ring-2 focus:ring-kerala-green focus:border-transparent transition-all"
                        placeholder="Groom's parents"
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-kerala-dark flex items-center gap-2">
                    <Calendar size={18} className="text-kerala-gold" />
                    Date & Time
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-kerala-dark/60 mb-1">
                        Wedding Date
                      </label>
                      <input
                        type="date"
                        value={data.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        className="w-full px-4 py-3 border border-kerala-gold/20 rounded-lg focus:ring-2 focus:ring-kerala-green focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-kerala-dark/60 mb-1">
                        Time
                      </label>
                      <input
                        type="text"
                        value={data.time}
                        onChange={(e) => updateField("time", e.target.value)}
                        className="w-full px-4 py-3 border border-kerala-gold/20 rounded-lg focus:ring-2 focus:ring-kerala-green focus:border-transparent transition-all"
                        placeholder="10:30 AM"
                      />
                    </div>
                  </div>
                </div>

                {/* Venue Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-kerala-dark flex items-center gap-2">
                    <MapPin size={18} className="text-kerala-gold" />
                    Venue
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-kerala-dark/60 mb-1">
                        Venue Name
                      </label>
                      <input
                        type="text"
                        value={data.venue}
                        onChange={(e) => updateField("venue", e.target.value)}
                        className="w-full px-4 py-3 border border-kerala-gold/20 rounded-lg focus:ring-2 focus:ring-kerala-green focus:border-transparent transition-all"
                        placeholder="Venue name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-kerala-dark/60 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={data.venueAddress}
                        onChange={(e) =>
                          updateField("venueAddress", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-kerala-gold/20 rounded-lg focus:ring-2 focus:ring-kerala-green focus:border-transparent transition-all"
                        placeholder="Full address"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-kerala-dark">
                    Invitation Message
                  </h3>
                  <textarea
                    value={data.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-kerala-gold/20 rounded-lg focus:ring-2 focus:ring-kerala-green focus:border-transparent transition-all resize-none"
                    placeholder="Your invitation message"
                  />
                </div>

                {/* Photo Upload */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-kerala-dark flex items-center gap-2">
                    <ImageIcon size={18} className="text-kerala-gold" />
                    Couple Photo
                  </h3>
                  <div className="border-2 border-dashed border-kerala-gold/30 rounded-lg p-6 text-center">
                    {data.couplePhoto ? (
                      <div className="space-y-3">
                        <img
                          src={data.couplePhoto}
                          alt="Couple"
                          className="w-24 h-24 object-cover rounded-full mx-auto"
                        />
                        <button
                          onClick={() =>
                            setData((prev) => ({ ...prev, couplePhoto: null }))
                          }
                          className="text-sm text-red-600 hover:underline"
                        >
                          Remove photo
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="text-kerala-dark/50 mb-2">
                          <ImageIcon size={32} className="mx-auto mb-2" />
                          Click to upload photo
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Music Upload */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-kerala-dark flex items-center gap-2">
                    <Music size={18} className="text-kerala-gold" />
                    Background Music
                  </h3>
                  <div className="border-2 border-dashed border-kerala-gold/30 rounded-lg p-6 text-center">
                    {data.musicFile ? (
                      <div className="space-y-3">
                        <audio
                          src={data.musicFile}
                          controls
                          className="mx-auto"
                        />
                        <button
                          onClick={() =>
                            setData((prev) => ({ ...prev, musicFile: null }))
                          }
                          className="text-sm text-red-600 hover:underline"
                        >
                          Remove music
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="text-kerala-dark/50 mb-2">
                          <Music size={32} className="mx-auto mb-2" />
                          Click to upload music
                        </div>
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={handleMusicUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Font Style */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-kerala-dark flex items-center gap-2">
                    <Palette size={18} className="text-kerala-gold" />
                    Font Style
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {fontOptions.map((font) => (
                      <button
                        key={font.value}
                        onClick={() => updateField("fontStyle", font.value)}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          data.fontStyle === font.value
                            ? "border-kerala-green bg-kerala-green/10"
                            : "border-kerala-gold/20 hover:border-kerala-gold/40"
                        }`}
                      >
                        <span className={font.value}>{font.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-kerala-gold/10 overflow-hidden">
              <div className="p-6 border-b border-kerala-gold/10">
                <h2 className="text-xl font-bold text-kerala-dark flex items-center gap-2">
                  <Eye className="text-kerala-green" size={24} />
                  Live Preview
                </h2>
              </div>

              <div className="p-6">
                <div
                  ref={previewRef}
                  data-font-style={data.fontStyle}
                  className={
                    isStoryTemplate
                      ? isPreviewMode
                        ? "h-[min(85vh,900px)] rounded-xl overflow-hidden border border-kerala-gold/20"
                        : "h-[min(70vh,640px)] rounded-xl overflow-hidden border border-kerala-gold/20"
                      : ""
                  }
                >
                  <InvitationPreview template={template} data={data} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function InvitationPreview({
  template,
  data,
}: {
  template: (typeof templates)[0];
  data: InvitationData;
}) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Date";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (template.type === "animated" && getTemplateVideo(template.id)) {
    return (
      <VideoInvitation
        template={template}
        className={data.fontStyle}
        data={{
          brideName: data.brideName,
          groomName: data.groomName,
          message: data.message,
          date: formatDate(data.date),
          time: `at ${data.time}`,
          venue: `${data.venue}, ${data.venueAddress}`,
          couplePhoto: data.couplePhoto,
        }}
      />
    );
  }

  if (template.type === "story") {
    return (
      <ScrollStoryInvitation
        template={template}
        data={toScrollStoryData(data)}
        compact
        className={`h-full w-full ${data.fontStyle}`}
      />
    );
  }

  const bgGradients = {
    hindu: "from-orange-50 via-red-50 to-yellow-50",
    muslim: "from-emerald-50 via-teal-50 to-green-50",
    christian: "from-blue-50 via-indigo-50 to-white",
  };

  const accentColors = {
    hindu: "text-orange-700",
    muslim: "text-emerald-700",
    christian: "text-blue-700",
  };

  return (
    <div
      data-capture-root
      data-religion={template.religion}
      className={`${data.fontStyle} aspect-[3/4] bg-gradient-to-br ${bgGradients[template.religion]} rounded-lg overflow-hidden relative`}
    >
      {/* Background Music */}
      {data.musicFile && (
        <audio
          src={data.musicFile}
          autoPlay
          loop
          className="hidden"
        />
      )}

      {/* Decorative Border */}
      <div className="absolute inset-3 border-2 border-kerala-gold/40 rounded-lg" />
      <div className="absolute inset-4 border border-kerala-gold/20 rounded-lg" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
        {/* Top Decoration */}
        <div className="mb-4">
          {template.religion === "hindu" && <HinduDecorSmall />}
          {template.religion === "muslim" && <MuslimDecorSmall />}
          {template.religion === "christian" && <ChristianDecorSmall />}
        </div>

        {/* Invitation Text */}
        <p className="text-kerala-gold text-xs tracking-[0.2em] uppercase mb-2">
          Wedding Invitation
        </p>

        <p className="text-kerala-dark/60 text-sm mb-4 max-w-xs">
          {data.message}
        </p>

        {/* Couple Photo */}
        {data.couplePhoto && (
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-kerala-gold/30 mb-4">
            <img
              src={data.couplePhoto}
              alt="Couple"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Names */}
        <h2
          className={`text-3xl font-bold ${accentColors[template.religion]} mb-1`}
        >
          {data.brideName}
        </h2>
        <p className="text-kerala-gold text-lg mb-1">&</p>
        <h2
          className={`text-3xl font-bold ${accentColors[template.religion]} mb-4`}
        >
          {data.groomName}
        </h2>

        {/* Parents */}
        <div className="text-xs text-kerala-dark/50 mb-4 space-y-1">
          <p>Daughter of {data.brideParents}</p>
          <p>Son of {data.groomParents}</p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-kerala-gold/40 mb-4" />

        {/* Date & Time */}
        <p className="text-sm font-semibold text-kerala-dark mb-1">
          {formatDate(data.date)}
        </p>
        <p className="text-sm text-kerala-dark/60 mb-4">at {data.time}</p>

        {/* Venue */}
        <p className="font-semibold text-kerala-dark">{data.venue}</p>
        <p className="text-xs text-kerala-dark/50">{data.venueAddress}</p>

        {/* Bottom Decoration */}
        <div className="mt-6">
          <svg viewBox="0 0 100 20" className="w-24 h-4 text-kerala-gold/40">
            <path
              fill="currentColor"
              d="M0 10 Q25 0 50 10 Q75 20 100 10 L100 20 L0 20 Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HinduDecorSmall() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <path
        fill="#d4af37"
        d="M30 5L35 18H48L38 27L42 40L30 32L18 40L22 27L12 18H25L30 5Z"
      />
      <circle cx="30" cy="28" r="6" fill="#c41e3a" />
    </svg>
  );
}

function MuslimDecorSmall() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <path
        fill="#065f46"
        d="M30 5C22 15 18 25 18 35C18 50 24 55 30 58C36 55 42 50 42 35C42 25 38 15 30 5Z"
      />
      <path
        fill="#d4af37"
        d="M30 18L32 24L38 24L33 28L35 34L30 30L25 34L27 28L22 24L28 24L30 18Z"
      />
    </svg>
  );
}

function ChristianDecorSmall() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <rect x="27" y="10" width="6" height="40" fill="#d4af37" />
      <rect x="18" y="20" width="24" height="6" fill="#d4af37" />
    </svg>
  );
}
