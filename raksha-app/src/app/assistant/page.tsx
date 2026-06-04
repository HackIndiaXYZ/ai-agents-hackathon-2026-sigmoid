"use client";
import { Mic, Waves, Globe2, StopCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AssistantPage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [language, setLanguage] = useState("EN");

  const SIMULATED_TRANSCRIPT_EN = "I need help. The water level is rising fast in my house.";
  const SIMULATED_RESPONSE_EN = "I understand you are in danger. Do not panic. Move immediately to the roof or highest point. I am notifying local rescue teams of your location now.";
  
  const SIMULATED_TRANSCRIPT_HI = "मुझे मदद की ज़रूरत है। मेरे घर में पानी का स्तर तेज़ी से बढ़ रहा है।";
  const SIMULATED_RESPONSE_HI = "मैं समझ रहा हूँ कि आप खतरे में हैं। घबराएं नहीं। तुरंत छत या सबसे ऊंचे स्थान पर जाएं। मैं अभी स्थानीय बचाव दलों को आपके स्थान की सूचना दे रहा हूँ।";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isListening) {
      setTranscript("");
      timeout = setTimeout(() => {
        setTranscript(language === 'EN' ? SIMULATED_TRANSCRIPT_EN : SIMULATED_TRANSCRIPT_HI);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isListening, language]);

  return (
    <div className="min-h-full flex flex-col relative overflow-hidden bg-void">
      <div className="aurora-bg">
        <div className={`aurora-1 transition-colors duration-1000 ${isListening ? 'bg-cyan-500/20' : 'bg-purple-500/10'}`} style={{ transform: 'scale(1.5)' }} />
      </div>

      <header className="p-4 md:p-8 flex justify-between items-center relative z-10 w-full max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <Globe2 className="w-6 h-6 text-cyan-400" />
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-white font-bold text-lg outline-none cursor-pointer"
          >
            <option value="EN" className="text-black">English (US)</option>
            <option value="HI" className="text-black">हिंदी (Hindi)</option>
          </select>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-2xl mx-auto -mt-20">
        
        {/* Voice Waveform Animation (Simulated) */}
        <div className="h-32 mb-12 flex items-center justify-center gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              animate={isListening ? {
                height: [20, Math.random() * 80 + 40, 20],
              } : { height: 4 }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`w-2 rounded-full ${isListening ? 'bg-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.8)]' : 'bg-zinc-600'}`}
            />
          ))}
        </div>

        {/* Transcript Area */}
        <div className="h-40 w-full text-center flex flex-col items-center justify-end mb-12">
          <AnimatePresence mode="wait">
            {!isListening && transcript ? (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <p className="text-zinc-400 text-lg">&quot;{transcript}&quot;</p>
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl">
                  <p className="text-white text-xl font-medium leading-relaxed">
                    {language === 'EN' ? SIMULATED_RESPONSE_EN : SIMULATED_RESPONSE_HI}
                  </p>
                </div>
              </motion.div>
            ) : isListening ? (
              <motion.div
                key="listening"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-cyan-400 text-2xl font-bold animate-pulse">
                  {transcript ? transcript : "Listening..."}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Mic Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsListening(!isListening)}
          className={`w-24 h-24 rounded-full flex items-center justify-center relative ${
            isListening ? 'bg-red-500 shadow-[0_0_30px_rgba(255,82,82,0.6)]' : 'bg-cyan-500 shadow-[0_0_30px_rgba(0,229,255,0.4)]'
          }`}
        >
          {isListening && (
            <motion.div
              className="absolute inset-0 border-2 border-red-500 rounded-full"
              animate={{ scale: [1, 1.5, 2], opacity: [1, 0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          {isListening ? (
            <StopCircle className="w-10 h-10 text-white" />
          ) : (
            <Mic className="w-10 h-10 text-white" />
          )}
        </motion.button>
        
        <p className="mt-6 text-zinc-500 text-sm">
          {isListening ? "Tap to stop" : "Tap to speak"}
        </p>
      </main>
    </div>
  );
}
