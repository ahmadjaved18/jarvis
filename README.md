<div align="center">

<img src="https://github.com/user-attachments/assets/889ea49a-ee51-4876-bf71-5c7afd4b7921" alt="Jarvis AI Assistant - Idle State" width="100%"/>

# J.A.R.V.I.S

### Just A Rather Very Intelligent System

**A voice-first AI assistant inspired by Iron Man — built to think, speak, search, and assist in real time.**

[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Engine-blue?style=for-the-badge\&logo=google)](https://deepmind.google/technologies/gemini/)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-Voice_Synthesis-purple?style=for-the-badge)](https://elevenlabs.io)
[![React](https://img.shields.io/badge/React-UI_Framework-61DAFB?style=for-the-badge\&logo=react)](https://react.dev)

</div>

---

## Demo

<div align="center">

🎥 **Demo Video:** 

https://github.com/user-attachments/assets/2f2d16a5-0dd9-4318-818a-7db260a8ca71

📸 **Screenshots:** Included below

</div>

---

## Overview

Jarvis is a personal AI assistant built to feel fast, intelligent, and responsive. It combines conversational AI, voice interaction, real-time information access, and a custom Iron Man-inspired interface into a single assistant experience.

It can understand commands, answer naturally, search for information, keep track of context, and respond through realistic voice output. The interface is designed to feel alive, with smooth visual transitions and live feedback that make every interaction feel purposeful.

---

## Why Jarvis?

Most assistants answer questions.

Jarvis was built to act.

It understands context, interacts through voice, accesses tools, and provides visibility into what it is doing as it works.

The goal is not just conversation.

The goal is assistance.

---

## Highlights

⚡ Voice-First Interaction  
Speak naturally and receive spoken responses.

🧠 Context-Aware Conversations  
Maintains conversational context across interactions.

🌐 Real-Time Information Access  
Searches and retrieves up-to-date information when needed.

📅 Calendar Assistance  
Check schedules and upcoming events through natural language.

📧 Email Assistance  
Read and summarize inbox content conversationally.

🎙️ Natural Voice Responses  
Human-like voice synthesis for a more immersive experience.

📡 Live Intelligence Panel  
Monitor Jarvis' activity, execution state, and system awareness in real time.

🦾 Iron Man-Inspired Interface  
Custom HUD-style UI with animated state transitions.

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

Instead of behaving like a black box, Jarvis exposes its current activity in real time.

The panel displays:

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

### Memory & Intelligence

* [ ] Long-term memory support
* [ ] Personalized user profiles
* [ ] Context persistence across sessions
* [ ] Smarter tool routing and task planning

### Productivity

* [ ] Notion integration for notes and tasks
* [ ] Telegram access from mobile
* [ ] Task management and reminders

### Accessibility

* [ ] Wake word support
* [ ] Multi-language voice interaction
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
