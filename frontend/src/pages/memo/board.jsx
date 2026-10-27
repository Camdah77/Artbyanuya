export const CARD_IMAGES = [
  { key: "1", label: "Eagle", src: "https://res.cloudinary.com/dj9sie6nl/image/upload/v1792529171/Anuya/memory/mem5_eeuvsu.jpg" },
  { key: "2", label: "Harmony", src: "https://res.cloudinary.com/dj9sie6nl/image/upload/v1792529168/Anuya/memory/Mem3_jfyxxn.jpg" },
  { key: "3", label: "Calm", src: "https://res.cloudinary.com/dj9sie6nl/image/upload/v1792529166/Anuya/memory/mem2_hycxbk.jpg" },
  { key: "4", label: "Quiet", src: "https://res.cloudinary.com/dj9sie6nl/image/upload/v1792529161/Anuya/memory/Mem9_guoevx.jpg" },
  { key: "5", label: "Yoga", src: "https://res.cloudinary.com/dj9sie6nl/image/upload/v1792529157/Anuya/memory/Mem7_bk3ls2.jpg" },
  { key: "6", label: "Disco", src: "https://res.cloudinary.com/dj9sie6nl/image/upload/v1792529159/Anuya/memory/mem6_bqypor.jpg" },
];

export function shuffle(items, random = Math.random) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

export function createDeck(random = Math.random) {
  const pairs = CARD_IMAGES.flatMap((card) => [0, 1].map((copy) => ({
    ...card,
    id: `${card.key}-${copy}`,
    matched: false,
  })));

  return shuffle(pairs, random);
}

export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function isBetterScore(candidate, currentBest) {
  if (!currentBest) return true;
  if (candidate.turns !== currentBest.turns) {
    return candidate.turns < currentBest.turns;
  }
  return candidate.seconds < currentBest.seconds;
}