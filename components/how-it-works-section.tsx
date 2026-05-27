"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "1 - Choose a template",
    description: "Choose a design that fits your wedding aesthetics",
    video: "/templates/template-video1.mp4",
    type: "phone",
  },
  {
    number: "2 - Customise & Publish",
    description: "Add your story, event details, hit publish.",
    video: "/templates/template-video2.mp4",
    type: "editor",
  },
  {
    number: "3 - Share anywhere",
    description: "Share your invite with friends and family",
    video: "/templates/template-video3.mp4",
    type: "chat",
  },
]

function PhoneFrame({ video }: { video: string }) {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="relative w-[160px]">
        {/* Phone shell */}
        <div className="relative rounded-[28px] border-[6px] border-gray-800 bg-gray-800 shadow-xl overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-800 rounded-b-xl z-10" />
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full aspect-[9/19] object-cover"
          />
        </div>
      </div>
    </div>
  )
}

function EditorFrame({ video }: { video: string }) {
  return (
    <div className="flex items-center justify-center py-6 px-2">
      <div className="relative w-full max-w-[260px]">
        {/* Edit button overlay */}
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full aspect-video object-cover"
          />
          <div className="absolute top-3 right-3 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Edit
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatFrame({ video }: { video: string }) {
  return (
    <div className="flex flex-col gap-2 py-6 px-4 bg-[#f0f0f0] rounded-2xl mx-2 text-xs">
      {/* Incoming message */}
      <div className="self-start bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-gray-700 shadow-sm max-w-[80%]">
        Hey, is your wedding date finalised ?
      </div>
      {/* Outgoing */}
      <div className="self-end bg-[#dcf8c6] rounded-2xl rounded-tr-sm px-3 py-2 text-gray-800 shadow-sm max-w-[80%]">
        Yes! Wait, let me share the invite
      </div>
      {/* Invite card */}
      <div className="self-end rounded-xl overflow-hidden shadow-md max-w-[75%] border border-white">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full aspect-video object-cover"
        />
        <div className="bg-white px-2 py-1">
          <p className="font-semibold text-[10px] text-gray-800">Kanika Weds Abhishek</p>
          <p className="text-[9px] text-gray-400">www.keralavivah.com</p>
        </div>
      </div>
      {/* Incoming reactions */}
      <div className="self-start bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-gray-700 shadow-sm max-w-[80%]">
        Wow! This is stunning! 😍<br />Who made this ?
      </div>
      <div className="self-end bg-[#dcf8c6] rounded-2xl rounded-tr-sm px-3 py-2 text-gray-800 shadow-sm max-w-[80%]">
        Bought a template from keralavivah.com ❤️
      </div>
    </div>
  )
}

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-5">
            Create a Stunning Wedding Invite<br />Website in 10 Minutes
          </h2>
          <p className="text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
            Easily change everything — text, photos, layout, colors — and make your love story the star.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-3xl border border-gray-200 bg-white overflow-hidden flex flex-col"
            >
              {/* Visual area */}
              <div className="flex-1 bg-gray-50">
                {step.type === "phone" && <PhoneFrame video={step.video} />}
                {step.type === "editor" && <EditorFrame video={step.video} />}
                {step.type === "chat" && <ChatFrame video={step.video} />}
              </div>

              {/* Text */}
              <div className="px-6 py-5 border-t border-gray-100">
                <p className="font-bold text-black text-base mb-1">{step.number}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
