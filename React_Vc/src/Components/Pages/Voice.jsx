import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { LampContainer } from "../Ace_Ui/LampDemo";

const API_KEY = "AIzaSyB5c85w5GX0lAuE-vVlCBznhqCrYiTmNpQ"; 
const genAI = new GoogleGenerativeAI(API_KEY);

const Voice = () => {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  // Load voices once component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
  }, []);

  const speakAi = (text) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    // Filter for high-quality English voices
    const premiumVoice = voices.find(v => 
      v.name.includes("Google US English") || 
      v.name.includes("Samantha") || 
      v.name.includes("Microsoft Aria")
    );

    if (premiumVoice) utterance.voice = premiumVoice;
    
    utterance.lang = "en-US";
    utterance.rate = 1.05; // Slightly faster for a modern feel
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Please use Chrome browser.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    
    recognition.onstart = () => {
      setIsListening(true);
      setRes(""); // Clear previous result for new interaction
    };
    
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      generateAIResponse(spokenText);
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const generateAIResponse = async (prompt) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      setRes(text);
      speakAi(text);
    } catch (error) {
      setRes("Error connecting to Nexa's core.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LampContainer />
      <div className="relative min-h-screen flex items-center justify-center -mt-[550px] px-4">
        
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] p-10 text-center transition-all duration-500 hover:border-cyan-500/30">
          
          {/* Status Indicator */}
          <div className="flex justify-center gap-1 mb-6 h-8 items-end">
            {(isListening || isSpeaking) ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className={`w-1 bg-cyan-400 rounded-full animate-bounce`} 
                     style={{ animationDelay: `${i * 0.1}s`, height: isSpeaking ? '100%' : '60%' }} />
              ))
            ) : (
              <div className="w-2 h-2 rounded-full bg-white/20" />
            )}
          </div>

          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Nexa</h1>
          <p className="text-cyan-400/80 text-sm font-medium uppercase tracking-widest mb-8">
            {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Ready to Assist"}
          </p>

          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={startListening}
              className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500 hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <div className="absolute inset-0 rounded-full animate-ping bg-cyan-500/20 group-hover:hidden" />
              <MicIcon />
            </button>
            
            <button
              onClick={() => window.speechSynthesis.cancel()}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <StopIcon />
            </button>
          </div>

          {/* Transcript Preview */}
          <div className="mb-6 min-h-[40px]">
            <p className="text-white/60 italic text-sm">
              {transcript ? `"${transcript}"` : "Try saying 'Who is the Prime Minister of India?'"}
            </p>
          </div>

          {/* AI Response Box */}
          {res && (
            <div className="mt-4 p-6 bg-black/40 border border-white/5 rounded-2xl text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-gray-200 leading-relaxed font-light">{res}</p>
            </div>
          )}
          
          {loading && (
            <div className="flex items-center justify-center gap-3 text-cyan-400 animate-pulse">
              <span className="text-sm">Accessing Neural Network...</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Simple Icons to avoid extra imports
const MicIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const StopIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
  </svg>
);

export default Voice;