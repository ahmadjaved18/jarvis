<div align="center">

<img src="https://github.com/user-attachments/assets/889ea49a-ee51-4876-bf71-5c7afd4b7921" alt="Jarvis AI Assistant - Idle State" width="100%"/>

# J.A.R.V.I.S

### Just A Rather Very Intelligent System

**A voice-first AI assistant inspired by Iron Man — built to think, speak, search, and assist in real time.**

[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Engine-blue?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-Voice_Synthesis-purple?style=for-the-badge)](https://elevenlabs.io)
[![React](https://img.shields.io/badge/React-UI_Framework-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Whisper](https://img.shields.io/badge/Speech_to_Text-Whisper-green?style=for-the-badge)](https://github.com/openai/whisper)

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

Users can interact with Jarvis both by typing and by speaking through a built-in microphone, where speech is converted into text and processed through the same AI pipeline.

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
Speak or type naturally and receive intelligent responses.

🧠 Context-Aware Conversations  
Maintains conversational context across interactions.

🎤 Voice Input Support  
Speak directly into Jarvis using microphone input.

🌐 Real-Time Information Access  
Searches and retrieves up-to-date information when needed.

📅 Calendar Assistance  
Check schedules and upcoming events through natural language.

📧 Email Assistance  
Read and summarize inbox content conversationally.

🎙️ Natural Voice Responses  
Human-like voice synthesis using ElevenLabs.

📡 Live Intelligence Panel  
Monitor execution state and system activity in real time.

🦾 Iron Man-Inspired Interface  
Custom HUD-style UI with animated state transitions.

---

## Interface

<div align="center">

### Idle State

<img src="https://github.com/user-attachments/assets/889ea49a-ee51-4876-bf71-5c7afd4b7921" width="90%"/>

### Speaking State

<img src="https://github.com/user-attachments/assets/21c3205e-9bae-45b3-9b6b-f320c62fcc75" width="90%"/>

</div>

---

## Intelligence Panel

One of Jarvis’ defining features is the **Intelligence Panel**.

Instead of behaving like a black box, Jarvis exposes its current activity in real time.

The panel displays:

- Current execution state
- Active tool usage
- Processing status
- Response generation progress
- System awareness indicators
- Live interaction feedback

---

## Features

- Voice-Activated Interaction (Typing + Voice Input)
- AI-Powered Responses (Gemini via n8n)
- Real-Time Intelligence Panel
- Web Search Capability
- Calendar Support
- Email Integration
- Natural Voice Output (ElevenLabs)
- Context Awareness
- Custom Iron Man UI
- Modular Assistant Design

---

## Tech Stack

| Layer            | Technology                     |
| ---------------- | ------------------------------ |
| Frontend         | React + Vite + Tailwind CSS    |
| AI / LLM         | Google Gemini                  |
| Voice Synthesis  | ElevenLabs API                 |
| Speech Input     | Whisper (faster-whisper + FastAPI) |
| Web Search       | Tavily Search API              |
| Calendar & Email | Google Calendar API, Gmail API |
| Interface Design | Custom animated HUD-style UI   |
| System Layer     | Self-hosted assistant runtime  |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- API keys for Gemini, ElevenLabs, and others

---

### 1. Clone the Repository

```bash
git clone https://github.com/ahmadjaved18/jarvis.git
cd jarvis
2. Start Frontend
cd ui
npm install
npm run dev
3. Start Whisper Backend
cd whisper_service
pip install -r requirements.txt
python -m uvicorn main:app --port 8000
4. Environment Variables
GEMINI_API_KEY=your_key
ELEVENLABS_API_KEY=your_key
ELEVENLABS_VOICE_ID=your_voice_id
TAVILY_API_KEY=your_key
Project Structure
jarvis/
├── ui/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
├── whisper_service/
│   ├── main.py
│   └── requirements.txt
├── assets/
└── README.md
Roadmap
Intelligence
Long-term memory system
Personalized assistant behavior
Persistent context across sessions
Voice
Wake word activation ("Hey Jarvis")
Streaming speech processing
Interruptible responses
Productivity
Notion integration
Task automation
Mobile sync (Telegram)
Author

Ahmad Javed
Software Engineering Student · AI Systems Builder

GitHub: https://github.com/ahmadjaved18

License

For educational and personal use only.

<div align="center">

“Sometimes you gotta run before you can walk.” — Tony Stark

</div> ```
