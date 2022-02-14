const fronts = document.querySelectorAll(".front");
const backs = document.querySelectorAll(".back");
const n = fronts.length;
const m = n / 2;
const player = [];

const keyframes = (num, n, isFront, isUp) => [
  {
    transform: isFront
      ? "rotateY(0deg) skewY(0deg)"
      : `rotateY(-120deg) skewY(${isUp ? "" : "-"}30deg) translateX(${
          100 / n
        }%)`,
    transformOrigin: `${(100 / n) * (num + 1)}%`
  },
  {
    transform: isFront
      ? `rotateY(120deg) skewY(${isUp ? "-" : ""}30deg) translateX(-${
          100 / n
        }%)`
      : "rotateY(0deg) skewY(0deg)",
    transformOrigin: `${(100 / n) * num}%`
  }
];

const options = {
  duration: 1000,
  fill: "both"
};

const playAll = () => {
  player.forEach((value) => {
    value.play();
  });
};

for (let i = 0; i < n; i++) {
  const j = Math.floor(i / 2);
  fronts[i].style.clipPath = `inset(${i % 2 == 0 ? "0%" : "50%"} ${Math.floor(
    100 - (100 / m) * (j + 1)
  )}% ${i % 2 != 0 ? "0%" : "50%"} ${Math.floor((100 / m) * j)}%)`;
  backs[i].style.clipPath = `inset(${i % 2 == 0 ? "0" : "50%"} ${Math.floor(
    100 - (100 / m) * (j + 1)
  )}% ${i % 2 != 0 ? "0%" : "50%"} ${Math.floor((100 / m) * j)}%)`;
  player.push(
    new Animation(
      new KeyframeEffect(fronts[i], keyframes(j, m, true, i % 2 == 0), {
        ...options,
        iterations: 0.75,
        delay: (j < m / 2 ? m / 2 - 1 - j : j - m / 2) * 200
      })
    )
  );
  player.push(
    new Animation(
      new KeyframeEffect(backs[i], keyframes(j, m, false, i % 2 == 0), {
        ...options,
        delay: (j < m / 2 ? m / 2 - 1 - j : j - m / 2) * 200
      })
    )
  );
}

playAll();
