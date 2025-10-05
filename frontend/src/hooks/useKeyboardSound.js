const randomKeySounds = [
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3"),
];

export function useKeyboardSound() {
  const playRandomKeySound = () => {
    const randomSound =
      randomKeySounds[Math.floor(Math.random() * randomKeySounds.length)];

    randomSound.currentTime = 0; 
    randomSound
      .play()
      .catch((error) => console.log("Audio played failed: ", error));
  };

  return { playRandomKeySound };
}
