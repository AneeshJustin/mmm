"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { templates } from "@/components/featured-templates"

const PRICE = 3999.01

const PAYMENT_STORAGE_KEY = "kerala_vivah_payment"

function PaymentForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const templateId = searchParams.get("templateId") ?? ""
  const template = templates.find((t) => t.id === templateId)

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const saved = localStorage.getItem(PAYMENT_STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.status === "completed" && parsed.templateId === templateId) {
          setSubmitted(true)
        }
      } catch {
        // ignore
      }
    }
  }, [templateId])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.firstName.trim()) e.firstName = "Required"
    if (!form.lastName.trim()) e.lastName = "Required"
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required"
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "Valid phone required"
    if (!form.city.trim()) e.city = "Required"
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const record = {
      ...form,
      amount: PRICE,
      templateId,
      templateName: template?.name ?? "Wedding Invite Template",
      status: "completed",
      orderId: `ORD-${Date.now()}`,
      paidAt: new Date().toISOString(),
    }
    localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(record))
    setSubmitted(true)
  }

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const templateName = template?.name ?? "Wedding Invite Template"

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1a2744] mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-1">
            Thank you, {form.firstName || "Guest"}!
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Your order for <span className="font-medium text-[#1a2744]">{templateName}</span> has been confirmed.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 mb-6 text-left space-y-1">
            <div className="flex justify-between">
              <span>Amount paid</span>
              <span className="font-semibold text-[#1a2744]">₹{PRICE.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span>Order ID</span>
              <span className="font-mono text-xs">{JSON.parse(localStorage.getItem(PAYMENT_STORAGE_KEY) ?? "{}").orderId ?? ""}</span>
            </div>
          </div>
          <button
            onClick={() => router.push(`/editor/${templateId}`)}
            className="w-full py-3 bg-[#1a2744] text-white rounded-lg font-semibold hover:bg-[#243459] transition-colors"
          >
            Back to Editor
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center px-4 py-10">
      {/* Geometric background pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-[0.04]"
            style={{
              right: `${-5 + i * 10}%`,
              top: `${-10 + i * 15}%`,
              width: "220px",
              height: "220px",
              background: "linear-gradient(135deg, #d4d4d4 0%, transparent 70%)",
              transform: "rotate(45deg)",
              borderRadius: "24px",
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-5xl">
        {/* Brand header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#1a2744] rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
          <span className="text-[#1a2744] font-semibold text-lg">keralavivah.com</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left — product info */}
            <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100">
              <h1 className="text-2xl font-bold text-[#1a2744] mb-1">{templateName}</h1>
              <div className="w-8 h-0.5 bg-[#1a2744] mb-4" />
              <p className="text-gray-500 text-sm mb-8">
                Premium Kerala wedding invitation template — easy to edit and share with your guests.
              </p>

              <div className="space-y-6 text-sm">
                <div>
                  <p className="font-semibold text-[#1a2744] mb-2">Contact Us:</p>
                  <div className="space-y-1.5 text-gray-500">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>hello@keralavivah.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+91 99599 00001</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-[#1a2744] mb-2">Terms &amp; Conditions:</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    All templates, designs and digital content on this site are the exclusive property of Kerala Vivah
                    and are protected by the Copyright Act, 1957, the Information Technology Act, 2000, and international
                    treaties. Any unauthorized copying, resale, modification, distribution, reverse-engineering, or sharing
                    — in India or abroad — will invite legal action including civil damages, criminal prosecution, and
                    injunctions.
                  </p>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed">
                  You agree to share information entered on this page with keralavivah.com and Razorpay, adhering to
                  applicable laws.
                </p>
              </div>
            </div>

            {/* Right — payment form */}
            <div className="p-8 lg:p-10">
              <h2 className="text-xl font-bold text-[#1a2744] mb-1">Payment Details</h2>
              <div className="w-8 h-0.5 bg-[#1a2744] mb-6" />

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Amount */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-[#1a2744] font-medium text-sm select-none">
                    ₹ {PRICE.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </div>

                {/* First + Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744]/30 transition-colors ${errors.firstName ? "border-red-400" : "border-gray-200"}`}
                      placeholder="First name"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744]/30 transition-colors ${errors.lastName ? "border-red-400" : "border-gray-200"}`}
                      placeholder="Last name"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744]/30 transition-colors ${errors.email ? "border-red-400" : "border-gray-200"}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-500 whitespace-nowrap select-none">
                      <span>🇮🇳</span>
                      <span>IN +91</span>
                    </div>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className={`flex-1 px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744]/30 transition-colors ${errors.phone ? "border-red-400" : "border-gray-200"}`}
                      placeholder="9876543210"
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744]/30 transition-colors ${errors.city ? "border-red-400" : "border-gray-200"}`}
                    placeholder="Your city"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                {/* Payment icons + Buy button */}
                <div className="flex items-center justify-between pt-2">
                  {/* Payment method icons */}
                  <div className="flex items-center gap-2">
                    <PaymentIcon label="UPI" />
                    <PaymentIcon label="VISA" />
                    <PaymentIcon label="MC" />
                    <PaymentIcon label="RuPay" />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#1a2744] text-white rounded-lg font-semibold text-sm hover:bg-[#243459] active:scale-[0.98] transition-all"
                  >
                    Buy ₹{PRICE.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentIcon({ label }: { label: string }) {
  const colors: Record<string, string> = {
    UPI: "text-[#5a2d82]",
    VISA: "text-[#1a1f71]",
    MC: "text-[#eb001b]",
    RuPay: "text-[#1a5276]",
  }
  return (
    <span
      className={`text-[10px] font-bold px-1.5 py-0.5 border border-gray-200 rounded ${colors[label] ?? "text-gray-500"} bg-white`}
    >
      {label}
    </span>
  )
}

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentForm />
    </Suspense>
  )
}
