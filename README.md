<div align="center">

<img src="https://github.com/user-attachments/assets/889ea49a-ee51-4876-bf71-5c7afd4b7921" alt="Jarvis AI Assistant - Idle State" width="100%"/>

# J.A.R.V.I.S

### Just A Rather Very Intelligent System

**A voice-first AI assistant inspired by Iron Man — built to think, speak, search, and assist in real time.**

[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Engine-blue?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-Voice_Synthesis-purple?style=for-the-badge)](https://elevenlabs.io)
[![React](https://img.shields.io/badge/React-UI_Framework-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Whisper STT](https://img.shields.io/badge/Whisper-Speech_to_Text-green?style=for-the-badge)](https://github.com/openai/whisper)

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

Recently, Jarvis has been upgraded with a **speech-to-text voice input system using Whisper (faster-whisper + FastAPI)**. This allows users to speak directly into the assistant, where audio is converted into text and processed through the AI pipeline.

It can understand commands, answer naturally, search for information, keep track of context, and respond through realistic voice output. The interface is designed to feel alive, with smooth visual transitions and live feedback.

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

🎤 Whisper Speech Input  
Real-time speech-to-text conversion using local Whisper backend.

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

## Voice Intelligence System (NEW)

Jarvis now supports a complete **speech-to-text pipeline**.

### Flow:

🎤 Microphone Input  
↓  
🧠 Whisper (faster-whisper backend)  
↓  
💬 Text injected into chat  
↓  
🚀 Sent to AI system (Gemini via n8n)  
↓  
🔊 Response returned (ElevenLabs optional voice output)

### Features:

- Click-to-talk microphone input
- Real-time transcription
- Fast local processing (no cloud dependency)
- Automatic message injection into chat
- Seamless integration with existing AI pipeline

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

Jarvis exposes its internal activity in real time:

- Current execution state
- Tool usage
- Processing status
- Response generation flow
- Live system feedback

---

## Features

- Voice-Activated Interaction
- Whisper Speech-to-Text Input
- AI-Powered Responses (Gemini via n8n)
- ElevenLabs Voice Output
- Web Search Capability
- Calendar & Email Integration
- Context Awareness
- Custom Iron Man UI
- Real-Time Intelligence Panel
- Modular Tool-Based Architecture

---

## Tech Stack

| Layer            | Technology                     |
| ---------------- | ------------------------------ |
| Frontend         | React + Vite + Tailwind CSS    |
| AI / LLM         | Google Gemini (via n8n)        |
| Speech-to-Text   | Whisper (faster-whisper + FastAPI) |
| Voice Synthesis  | ElevenLabs API                 |
| Web Search       | Tavily API                     |
| Calendar & Email | Google APIs                   |
| Backend Layer    | n8n Workflow Engine           |
| Interface Design | Custom HUD-style UI           |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- API keys (Gemini, ElevenLabs, etc.)

---

### 1. Clone Repo

```bash
git clone https://github.com/ahmadjaved18/jarvis.git
cd jarvis
2. Setup Frontend
cd ui
npm install
npm run dev
3. Setup Whisper Backend
cd whisper_service
pip install -r requirements.txt

Run server:

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
Wake word ("Hey Jarvis")
Streaming transcription
Interruptible voice responses
Productivity
Notion integration
Task automation
Telegram/mobile sync
Author

Ahmad Javed
Software Engineering Student · AI Systems Builder

GitHub

License

For educational and personal use only.

<div align="center">

“Sometimes you gotta run before you can walk.” — Tony Stark

</div> ```
