"use client";
import "regenerator-runtime/runtime";
import React, { useState, ChangeEvent } from "react";
import {
  IconCopy,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
} from "@tabler/icons-react";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import TextArea from "@/components/Inputs/TextArea";
import FileUpload from "@/components/Inputs/FileUpload";
import LinkPaste from "@/components/Inputs/LinkPaste";
import LanguageSelector from "@/components/Inputs/LanguageSelector";
import useTranslate from "@/hooks/useTranslate";
import { rtfToText } from "@/utils/rtfToText";

import SvgDecorations from "@/components/SvgDecorations";
import CategoryLinks from "@/components/categoryLinks";

const Home: React.FC = () => {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
 const [languages] = useState<string[]>([
  "English", "Spanish", "French", "German", "Chinese", "Hindi", "Arabic", "Portuguese", 
  "Russian", "Japanese", "Korean", "Italian", "Dutch", "Turkish", "Swedish", "Greek", 
  "Hebrew", "Polish", "Thai", "Vietnamese", "Indonesian", "Danish", "Finnish", "Norwegian", 
  "Hungarian", "Czech", "Romanian", "Bengali", "Urdu", "Malay", "Tamil", "Telugu", "Marathi", 
  "Punjabi", "Gujarati", "Swahili", "Filipino", "Persian", "Ukrainian", "Serbian", "Slovak", 
  "Croatian", "Bulgarian", "Lithuanian", "Latvian", "Estonian", "Slovenian", "Catalan", 
  "Basque", "Maltese"
]);

  const [selectedLanguage, setSelectedLanguage] = useState<string>("Spanish");

  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLinkPaste = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    try {
      const response = await fetch(link);
      const data = await response.text();
      setSourceText(data);
    } catch (error) {
      console.error("Error fetching link content:", error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    // Implement like logic
  };

  const handleDislike = () => {
    // Implement dislike logic
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full bg-black bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="relative overflow-hidden h-screen">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
          <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-100 tracking-wide relative">
  Trans
  <span className="bg-gradient-to-r from-[#f87315] to-[#ffcc70] text-transparent bg-clip-text animate-pulse">
    Later
  </span>
</h1>

<p className="mt-4 text-lg sm:text-xl text-neutral-300 font-light tracking-wide italic opacity-95 leading-relaxed">
  🌍 <span className="font-semibold text-white drop-shadow-md">LinguaSpeak</span>: 
  <span className="text-[#f87315] font-medium transition-all duration-300 ease-in-out hover:text-[#ff8f40]">
    Bridging Voices
  </span>,  
  <span className="text-[#ffcc70] font-medium transition-all duration-300 ease-in-out hover:text-[#ffd589]">
    Connecting Worlds.
  </span>
</p>


            <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id="source-language"
                    value={sourceText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setSourceText(e.target.value)
                    }
                    placeholder="Source Language"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex space-x-2 flex-row">
                      <SpeechRecognitionComponent
                        setSourceText={setSourceText}
                      />
                      <IconVolume
                        size={22}
                        onClick={() => handleAudioPlayback(sourceText)}
                        className="text-white"
                      />
                      <FileUpload handleFileUpload={handleFileUpload} />
                      <LinkPaste handleLinkPaste={handleLinkPaste} />
                    </span>
                    <span className="text-sm pr-4 text-white">
                      {sourceText.length} / 2000
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id="target-language"
                    value={targetText}
                    onChange={() => {}}
                    placeholder="Target Language"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex items-center space-x-2 flex-row">
                      <LanguageSelector
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        languages={languages}
                      />
                      <IconVolume
                        size={22}
                        onClick={() => handleAudioPlayback(targetText)}
                        className="text-white"
                      />
                    </span>
                    <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                      <IconCopy size={22} onClick={handleCopyToClipboard} className="text-white" />
                      {copied && (
                        <span className="text-xs text-green-500">Copied!</span>
                      )}
                      <IconThumbUp size={22} onClick={handleLike} className="text-white" />
                      <IconThumbDown size={22} onClick={handleDislike} className="text-white" />
                      <IconStar
                        size={22}
                        onClick={handleFavorite}
                        className={favorite ? "text-yellow-500" : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>

              
            </div>

            <CategoryLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
