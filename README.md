<div align="center">

<img src="https://github.com/user-attachments/assets/889ea49a-ee51-4876-bf71-5c7afd4b7921" alt="Jarvis AI Assistant - Idle State" width="100%"/>

# J.A.R.V.I.S
### Just A Rather Very Intelligent System

**A personal AI assistant inspired by Iron Man — voice-activated, context-aware, and always on.**

[![n8n](https://img.shields.io/badge/n8n-Workflow_Automation-orange?style=for-the-badge&logo=n8n)](https://n8n.io)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Engine-blue?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-Voice_Synthesis-purple?style=for-the-badge)](https://elevenlabs.io)
[![React](https://img.shields.io/badge/React-UI_Framework-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com)

</div>

---

## Overview

Jarvis is a fully local, voice-activated personal AI assistant built on **n8n automation workflows**, powered by **Google Gemini**, and wrapped in a custom **Iron Man-themed React UI**. It listens to your voice, thinks, searches the web, checks your calendar, reads your emails — and responds back in a natural human voice.

This is not a wrapper around an existing assistant. Every component is wired together from scratch: the webhook pipeline, the AI agent, the voice layer, and the real-time UI — all running on your own machine.

---

## Interface

<div align="center">

### Idle State
<img src="https://github.com/user-attachments/assets/889ea49a-ee51-4876-bf71-5c7afd4b7921" alt="Jarvis Idle State" width="90%"/>

*Arc reactor standby — Intelligence Panel monitoring all systems*

### Speaking State
<img src="https://github.com/user-attachments/assets/21c3205e-9bae-45b3-9b6b-f320c62fcc75" alt="Jarvis Speaking State" width="90%"/>

*Active response — voice synthesis engaged, real-time status updates*

</div>

---

## Features

- **Voice Activation** — Speak naturally; Jarvis captures, transcribes, and processes your input end-to-end
- **AI-Powered Responses** — Google Gemini drives the core reasoning with persistent conversation memory across your session
- **Web Search** — Tavily integration gives Jarvis access to real-time information from the web
- **Google Calendar Integration** — Query upcoming events, check your schedule, and get reminders by voice
- **Gmail Integration** — Read, summarize, and manage your inbox through natural language commands
- **ElevenLabs Voice Synthesis** — Responses are spoken back in a realistic, natural voice — not a robotic TTS
- **Real-Time Intelligence Panel** — Live sidebar showing system status, processing state, tool calls, and response activity as they happen
- **Iron Man Themed UI** — Custom React frontend with hexagonal arc reactor animation, dark HUD aesthetic, and animated state transitions (idle → listening → processing → speaking)
- **Session Memory** — Jarvis remembers context within a conversation, enabling follow-up questions and multi-turn dialogue
- **Fully Containerized** — Entire backend runs in Docker; no complex local environment setup required

---

## Architecture

```
User Voice Input
       │
       ▼
  React / Vite UI  ──────────────────────────────────────────────┐
  (Iron Man Theme)                                               │
       │                                                    Intelligence
       │  HTTP POST (text/audio)                              Panel
       ▼                                                  (Live Updates)
   ngrok Tunnel
       │
       ▼
  n8n Webhook Node
       │
       ▼
  AI Agent Node (Google Gemini)
  ┌────┴────────────────────────────────────┐
  │  Tools Available:                       │
  │  ├── Tavily Web Search                  │
  │  ├── Google Calendar (read/query)       │
  │  ├── Gmail (read/summarize)             │
  │  └── Simple Memory (session context)   │
  └────┬────────────────────────────────────┘
       │
       ▼
  Respond to Webhook
       │
       ▼
  ElevenLabs Voice Synthesis
       │
       ▼
  Audio Playback in UI
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Workflow Automation | [n8n](https://n8n.io) (self-hosted, Docker) |
| AI / LLM | Google Gemini (via n8n AI Agent node) |
| Voice Synthesis | ElevenLabs API |
| Web Search | Tavily Search API |
| Calendar & Email | Google Calendar API, Gmail API |
| Frontend | React + Vite + Tailwind CSS |
| Tunneling | ngrok (persistent free subdomain) |
| Containerization | Docker + Docker Compose (Windows) |

---

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [ngrok](https://ngrok.com) account with a free persistent subdomain
- API keys for: Google Gemini, ElevenLabs, Tavily
- Google Cloud project with Calendar and Gmail APIs enabled (OAuth 2.0)
- Node.js 18+ (for the React UI)

### 1. Clone the Repository

```bash
git clone https://github.com/ahmadjaved18/jarvis.git
cd jarvis
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# ElevenLabs
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_voice_id

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Tavily
TAVILY_API_KEY=your_tavily_api_key

# ngrok
NGROK_SUBDOMAIN=your-persistent-subdomain
```

> Google Calendar and Gmail credentials are configured directly inside n8n using OAuth 2.0.

### 3. Start n8n with Docker

```bash
docker-compose up -d
```

n8n will be available at `http://localhost:5678`

### 4. Import the Workflow

1. Open n8n at `http://localhost:5678`
2. Go to **Workflows → Import**
3. Import the `jarvis-workflow.json` file from this repo
4. Connect your credentials (Gemini, Tavily, Google Calendar, Gmail, ElevenLabs) inside the workflow nodes

### 5. Start the ngrok Tunnel

```bash
ngrok http --subdomain=your-subdomain 5678
```

Copy the generated HTTPS URL — this is your webhook base URL.

### 6. Start the React UI

```bash
cd ui
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

> Update the webhook URL in the UI config to point to your ngrok tunnel.

---

## n8n Workflow Overview

The core workflow follows a simple, powerful pipeline:

```
Webhook → AI Agent (Gemini + Tools) → Respond to Webhook
```

**Nodes:**

| Node | Purpose |
|---|---|
| Webhook | Entry point — receives text input from the UI |
| AI Agent | Gemini model with access to all tools and session memory |
| Simple Memory | Maintains conversation context within a session |
| Tavily Tool | Real-time web search |
| Google Calendar Tool | Schedule queries and event lookup |
| Gmail Tool | Email reading and summarization |
| Respond to Webhook | Returns the AI response back to the UI |

The UI then passes the response text to ElevenLabs for voice synthesis and plays the audio back — completing the full voice interaction loop.

---

## Project Structure

```
jarvis/
├── docker-compose.yml         # n8n Docker configuration
├── jarvis-workflow.json       # n8n workflow export
├── ui/                        # React frontend
│   ├── src/
│   │   ├── components/        # ArcReactor, IntelligencePanel, ChatWindow, etc.
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env.example               # Environment variable template
└── README.md
```

---

## Roadmap

- [ ] Cloud deployment on Oracle Cloud Always Free VM (permanent 24/7 uptime)
- [ ] Long-term memory via Google Sheets or Supabase
- [ ] Notion integration (notes, tasks, databases)
- [ ] Telegram mobile access (send commands from phone)
- [ ] Wake word detection ("Hey Jarvis")
- [ ] Multi-language voice support

---

## Known Issues

- ngrok free tier requires restarting the tunnel after system restarts (use a persistent subdomain to minimize this)
- ElevenLabs free tier has monthly character limits — monitor usage for heavy use sessions
- Google OAuth tokens expire periodically and need re-authorization inside n8n

---

## Author

**Ahmad Javed**
Software Engineering Student · AI Systems Builder

[![LinkedIn](https://img.shields.io/badge/LinkedIn-ahmadjavedd-blue?style=flat&logo=linkedin)](https://linkedin.com/in/ahmadjavedd/)
[![GitHub](https://img.shields.io/badge/GitHub-ahmadjaved18-black?style=flat&logo=github)](https://github.com/ahmadjaved18)

---

## License

This project is for personal and educational use. Feel free to fork and build your own version.

---

<div align="center">
  <i>"Sometimes you gotta run before you can walk." — Tony Stark</i>
</div>
