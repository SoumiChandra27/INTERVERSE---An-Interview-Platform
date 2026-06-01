import {
  useState
} from "react";
const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;
export default function useSpeechRecognition(
  onFinalTranscript
) {
  const [transcript, setTranscript] =
    useState("");
  const recognition =
    new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.onresult = (event) => {
    const text =
      event.results[0][0].transcript;
    setTranscript(text);
  };
  recognition.onend = () => {
    if (transcript) {
      onFinalTranscript(transcript);
    }
  };
  const startListening = () => {
    recognition.start();
  };
  return {
    transcript,
    startListening
  };
}