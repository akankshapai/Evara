const fs = require("fs");

function makeWav(filename) {
  const sampleRate = 44100;
  const duration = 1; // seconds
  const frequency = 440; // A4 beep tone

  // Total samples
  const samples = sampleRate * duration;
  const buffer = Buffer.alloc(samples * 2); // 16-bit PCM

  for (let i = 0; i < samples; i++) {
    const t = i / sampleRate;
    const sample = Math.sin(2 * Math.PI * frequency * t);
    const intSample = Math.floor(sample * 32767); // convert to int16
    buffer.writeInt16LE(intSample, i * 2);
  }

  // WAV HEADER
  const header = Buffer.alloc(44);

  header.write("RIFF", 0);
  header.writeUInt32LE(36 + buffer.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);    // PCM
  header.writeUInt16LE(1, 20);     // Audio format
  header.writeUInt16LE(1, 22);     // Mono
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28); // byte rate
  header.writeUInt16LE(2, 32);     // block align
  header.writeUInt16LE(16, 34);    // bits per sample
  header.write("data", 36);
  header.writeUInt32LE(buffer.length, 40);

  const wav = Buffer.concat([header, buffer]);
  fs.writeFileSync(filename, wav);
}

const files = [
  "tabla1.wav","tabla2.wav","tabla3.wav",
  "flute1.wav","flute2.wav","flute3.wav",
  "veena1.wav","veena2.wav","veena3.wav",
  "violin1.wav","violin2.wav","violin3.wav"
];

if (!fs.existsSync("public/audio")) {
  fs.mkdirSync("public/audio", { recursive: true });
}

files.forEach(f => {
  makeWav(`public/audio/${f}`);
  console.log("Created:", f);
});

console.log("All audio files generated!");
