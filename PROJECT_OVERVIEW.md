# 🌟 Kerala Vivah — Technical Project Overview & Architecture Note

Welcome to the technical overview of **Kerala Vivah**—a premium, state-of-the-art Kerala-themed wedding invitation builder. This platform allows users to create, customize, and export stunning animated and cinematic video invitations, manage RSVPs dynamically, and analyze registrations in a secure admin dashboard.

---

## 🛠️ 1. Technologies & Architecture Stack

The project is built using a modern, scalable, and highly optimized web development stack:

### Core Framework & Runtime
*   **Next.js (v16.2.6)**: Leveraging the App Router, Server Actions, and Node.js-based API endpoints.
*   **React 19 & TypeScript (v5.7.3)**: Provides component-based, strongly-typed state management and type safety throughout both frontend components and server configurations.

### Database & Persistence
*   **MongoDB & Mongoose (v9.6.2)**: A flexible Document-oriented store using structured ODM schemas. 
*   **Indexing Strategy**: Includes compound constraints like `rsvpSchema.index({ email: 1, phone: 1, invitationId: 1 }, { unique: true })` to guarantee idempotent RSVP submissions and prevent duplicate entries.

### User Interface & Rich Aesthetics
*   **TailwindCSS (v4.2.0)**: Tailored brand design system utilizing custom theme tokens (e.g., gold accents, deep forest green, and rich ivory) matching traditional Kerala wedding themes.
*   **Radix UI & Vaul**: Accessible, headless interactive primitives for dialogs, select inputs, popovers, drawers, and collapsibles.
*   **Framer Motion (v12.39) & GSAP (v3.15)**: Orchestrates micro-interactions, smooth entrance transitions, page-fade animations, and high-performance physics-based floating elements.

### Advanced Assets & Utilities
*   **Nodemailer**: Connects securely to external SMTP services to dispatch styled RSVP confirmations.
*   **SheetJS (XLSX v0.18.5)**: Used on the server to dynamically generate and download binary spreadsheet workbook streams (.xlsx).
*   **jsPDF & jsPDF-AutoTable**: Client-side document compiler producing multi-column layout PDFs for instant download.
*   **html2canvas & MediaRecorder API**: Powers the browser-based client-side screenshot and video rendering pipeline.

---

## 🔄 2. Core Workings of the Project

The application follows a structured user experience flow:

1.  **Landing Page & Religious Categories**: Users explore Kerala-themed wedding design concepts, selecting from cultural template categories: **Hindu** (traditional saffron/gold, Radha-Krishna art), **Muslim** (emerald/gold, Nikah motifs, arches), and **Christian** (floral layouts, serene blue/white).
2.  **Dynamic Customizer & Live Editor (`app/editor/[templateId]`)**: Users input their custom text details (names, dates, parents' info, venue address, map routes) in a side panel while watching changes update immediately in a real-time live preview.
3.  **Dynamic Preview System**: Renders loop videos in the background with floating typography layered on top using Framer Motion and GSAP animations.
4.  **Bespoke Online Invitation & RSVP Portal**: Publishes a custom, animated webpage for the wedding. Guests can navigate event schedules, RSVP for specific sub-events (Wedding, Reception, Haldi, Mehendi), specify guest counts and meal preferences (Veg/Non-Veg), and submit custom greetings.
5.  **Analytics & Management (`app/admin/rsvp`)**: A secure administrative interface displaying counter cards, filterable lists, CSV/Excel export links, direct inline editor modals, and data charts.

---

## ⚙️ 3. How the Background Features Work Under the Hood

The project contains several advanced engineering implementations that handle background rendering, database integrations, and transactional operations:

### 1. The Sandboxed Page Capture System (`lib/capture-invitation.ts`)
Standard tools like `html2canvas` frequently crash when parsing modern CSS functions (such as Tailwind v4's `oklch()` or `lab()` color-mix styles), and their performance degrades due to surrounding page assets.

To bypass this, the project implements a **Sandboxed IFrame Renderer**:
1.  It creates a temporary, hidden `<iframe>` in the document body.
2.  It clones the target template DOM tree into this clean document context.
3.  It recurses through all nodes to fetch their fully-resolved RGB styles (`window.getComputedStyle`), dropping all layout and animation-related classes.
4.  It assigns clean inline styles, strips active animations to capture static frames, and executes `html2canvas` inside the isolated context to produce a high-definition PNG.

### 2. Client-Side Video Rendering Pipeline (`lib/record-invitation-video.ts`)
Instead of spinning up heavy server-side headless browsers (like Puppeteer) which are expensive to scale, Kerala Vivah processes **personalized video recordings completely on the user's browser**:

*   **Synchronous Time-Seeking**: It captures the active background `<video />` element and forces it to align exactly with the designated segment configured in `lib/template-videos.ts` (e.g. `startSec: 0` to `endSec: 11`).
*   **Dual-Layer Context Composition**: It creates a hidden `<canvas />` scaled to high-resolution (`SCALE = 2`). Using `requestAnimationFrame`, a high-performance drawing loop plays:
    1.  Draw the active background video frame onto the canvas.
    2.  Composite the dynamic, sandboxed, high-resolution text canvas on top.
*   **Native Stream Capture**: The script captures the canvas rendering context stream at a constant **30 FPS** (`canvas.captureStream(FPS)`).
*   **MediaRecorder Encoding**: It pipes this raw stream data directly into the browser's native `MediaRecorder` API, encoding it at a high bitrate (`6,000,000 bits/sec`) as a `video/mp4` or `video/webm` blob for direct download.

> [!TIP]
> **Performance Optimization**: The drawing loop monitors wall-clock time (`performance.now()`) rather than counting frames, ensuring that differences in display refresh rates (e.g., 60Hz or 120Hz screens) do not alter the duration of the downloaded video.

### 3. Serverless RSVP Database & Stats (`app/api/rsvp/route.ts` & `/stats`)
*   **Validation Check**: Inside the API, incoming HTTP POST packages are checked using validation functions.
*   **Anti-Spam Verification**: The backend queries the Mongoose collection using a unique filter checking the guest's email, phone, and target invitation ID to prevent spam submissions.
*   **Real-time Analytics API**: The `/stats` endpoint aggregates and groups registrations, summing guest tallies, event attendance distributions, and dietary balances using lightweight database queries, making dashboard loading instantaneous.

### 4. Styled SMTP E-Mail dispatch (`lib/email.ts`)
Upon database validation, a customized HTML message is generated. It features a responsive layout with traditional Kerala gold-on-dark aesthetics (`#1a0f0a` background, `#fef3c7` typography, `#d4af37` headers) and is sent to guests using **Nodemailer**'s secure SMTP transport connection.

### 5. Server-Side Binary Spreadsheet Streams (`app/api/admin/rsvp/export/excel/route.ts`)
Rather than relying on the client to compile and parse heavy database files, the Excel export leverages **SheetJS** (`xlsx`) directly inside the Next.js runtime environment:
1.  It queries all RSVPs and maps them to flat JSON rows (incorporating human-readable date formats).
2.  It creates a virtual workbook (`XLSX.utils.book_new()`) and builds a single worksheet sheet named "RSVPs".
3.  It converts this database bundle into a raw binary buffer, and streams it back to the client with `Content-Disposition: attachment` headers, so the browser treats the response directly as a secure `.xlsx` download.

---

> [!NOTE]
> All administrative routes (e.g. list, update, delete, excel export) are protected by a secure authorization middleware (`lib/auth.ts`) which validates incoming HTTP requests using a custom key header (`x-admin-secret`), preventing unauthorized access to guest registration records.
