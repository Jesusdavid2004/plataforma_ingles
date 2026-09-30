export function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);

  const voices = speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang === "en-US");

  if (voice) utterance.voice = voice;

  utterance.rate = 0.9;
  utterance.pitch = 1.1;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}