export default function speak(text) {
  const utterance =
    new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(
    utterance
  );
}