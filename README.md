<div align="center">

<img src="https://github.com/user-attachments/assets/889ea49a-ee51-4876-bf71-5c7afd4b7921" alt="Jarvis AI Assistant - Idle State" width="100%"/>

# J.A.R.V.I.S

### Just A Rather Very Intelligent System

**A personal AI assistant inspired by Iron Man — voice-activated, context-aware, and built for real-time interaction.**

[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Engine-blue?style=for-the-badge\&logo=google)](https://deepmind.google/technologies/gemini/)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-Voice_Synthesis-purple?style=for-the-badge)](https://elevenlabs.io)
[![React](https://img.shields.io/badge/React-UI_Framework-61DAFB?style=for-the-badge\&logo=react)](https://react.dev)

</div>

---

## Demo

<div align="center">

📸 Screenshots are included below to showcase the assistant in action.

</div>

---

## Overview

Jarvis is a personal AI assistant designed to feel fast, intelligent, and responsive. It combines voice interaction, AI reasoning, web access, and a custom Iron Man-inspired interface to create an assistant experience that feels alive.

It can understand commands, answer naturally, search for information, keep track of context, and respond through realistic voice output. The entire experience is wrapped in a polished UI with live state transitions and an Intelligence Panel that shows what Jarvis is doing in real time.

---

## Why Jarvis?

Most assistants answer questions.

Jarvis was built to feel more like a true personal AI companion — one that understands context, interacts through voice, and provides visibility into what it is doing as it works.

The goal is not just conversation.

The goal is assistance.

---

## Interface

<div align="center">

### Idle State

<img src="https://github.com/user-attachments/assets/889ea49a-ee51-4876-bf71-5c7afd4b7921" alt="Jarvis Idle State" width="90%"/>

*Standby mode with live system awareness through the Intelligence Panel*

### Speaking State

<img src="https://github.com/user-attachments/assets/21c3205e-9bae-45b3-9b6b-f320c62fcc75" alt="Jarvis Speaking State" width="90%"/>

*Active response mode with voice synthesis and execution feedback*

</div>

---

## Intelligence Panel

One of Jarvis’ defining features is the **Intelligence Panel**.

Instead of behaving like a black box, Jarvis exposes its current activity in real time:

* Current execution state
* Active tool usage
* Processing status
* Response generation progress
* System awareness indicators
* Live interaction feedback

This creates a more transparent, immersive, and premium assistant experience.

---

## Features

* **Voice-Activated Interaction** — Speak naturally and Jarvis processes your input end to end
* **AI-Powered Responses** — Gemini handles reasoning, dialogue, and contextual understanding
* **Real-Time Intelligence Panel** — A live sidebar that shows execution state, system activity, and response flow
* **Web Search Capability** — Access current information when needed
* **Calendar Support** — Check schedules and upcoming events through natural language
* **Email Support** — Read and summarize inbox content conversationally
* **Natural Voice Output** — Responses are spoken back in a realistic human-like voice
* **Context Awareness** — Jarvis keeps track of conversation flow within a session
* **Custom Iron Man UI** — A sleek dark interface with animated transitions between idle, listening, processing, and speaking states
* **Modular Assistant Design** — Built so new tools and capabilities can be added cleanly

---

## Capabilities at a Glance

* Conversational AI
* Voice interaction
* Real-time information retrieval
* Calendar management
* Email assistance
* Session memory
* Live system awareness
* Elegant visual feedback

---

## Architecture

```text
User Voice Input
       │
       ▼
   React / Vite UI  ────────────────┐
       │                           │
       │  Command + Context         │
       ▼                           │
   Assistant Gateway               │
       │                           │
       ▼                           │
   AI Orchestration Layer          │
       │                           │
       ├── Web Search              │
       ├── Calendar Access         │
       ├── Email Access            │
       └── Session Memory          │
       │
       ▼
   AI Response Generation
       │
       ▼
   Voice Synthesis
       │
       ▼
   Audio Playback in UI
```

---

## Tech Stack

| Layer            | Technology                     |
| ---------------- | ------------------------------ |
| Frontend         | React + Vite + Tailwind CSS    |
| AI / LLM         | Google Gemini                  |
| Voice Synthesis  | ElevenLabs API                 |
| Web Search       | Tavily Search API              |
| Calendar & Email | Google Calendar API, Gmail API |
| Interface Design | Custom animated HUD-style UI   |
| System Layer     | Self-hosted assistant runtime  |

---

## Getting Started

### Prerequisites

* Node.js 18+ installed
* API keys for Gemini, ElevenLabs, and any connected services
* A configured environment file for local execution

### 1. Clone the Repository

```bash
 git clone https://github.com/ahmadjaved18/jarvis.git
 cd jarvis
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and add your keys:

```env
GEMINI_API_KEY=your_gemini_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_voice_id
TAVILY_API_KEY=your_tavily_api_key
```

### 3. Start the Assistant Runtime

Run the required backend services for Jarvis.

### 4. Start the React UI

```bash
cd ui
npm install
npm run dev
```

Open the app in your browser and begin interacting with Jarvis.

---

## Project Structure

```text
jarvis/
├── ui/
│   └── src/
│       ├── components/
│       ├── App.jsx
│       └── main.jsx
├── assets/
├── .env.example
└── README.md
```

---

## Roadmap

* [ ] Long-term memory support
* [ ] Notion integration for notes and tasks
* [ ] Telegram access from mobile
* [ ] Wake word support
* [ ] Multi-language voice interaction
* [ ] Smarter tool routing and task planning
* [ ] Improved mobile-friendly layout

---

## Author

**Ahmad Javed**
Software Engineering Student · AI Systems Builder

[![LinkedIn](https://img.shields.io/badge/LinkedIn-ahmadjavedd-blue?style=flat\&logo=linkedin)](https://linkedin.com/in/ahmadjavedd/)
[![GitHub](https://img.shields.io/badge/GitHub-ahmadjaved18-black?style=flat\&logo=github)](https://github.com/ahmadjaved18)

---

## License

This project is for personal and educational use. Feel free to fork and build your own version.

---

<div align="center">
  <i>"Sometimes you gotta run before you can walk." — Tony Stark</i>
</div>
