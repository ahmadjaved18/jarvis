from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import tempfile
import os
import subprocess

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None

def load_model():
    global model
    if model is None:
        from faster_whisper import WhisperModel
        model = WhisperModel("base", device="cpu", compute_type="int8")
    return model

def convert_audio(input_path: str, output_path: str):
    try:
        subprocess.run([
            "ffmpeg", "-i", input_path, "-acodec", "pcm_s16le",
            "-ar", "16000", "-y", output_path
        ], check=True, capture_output=True)
    except Exception:
        pass

@app.on_event("startup")
async def startup_event():
    load_model()

@app.post("/api/transcribe")
async def transcribe(audio: UploadFile = File(...)):
    try:
        with tempfile.NamedTemporaryFile(suffix=".webm", delete=False) as tmp:
            content = await audio.read()
            tmp.write(content)
            tmp_path = tmp.name

        wav_path = tmp_path.replace(".webm", ".wav")
        convert_audio(tmp_path, wav_path)
        
        model = load_model()
        transcribe_path = wav_path if os.path.exists(wav_path) else tmp_path
        segments, _ = model.transcribe(transcribe_path, language="en")
        text = " ".join([segment.text for segment in segments])

        os.unlink(tmp_path)
        if os.path.exists(wav_path):
            os.unlink(wav_path)

        return {"text": text.strip()}
    except Exception as e:
        return {"text": "", "error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)