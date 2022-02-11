const fronts = document.querySelectorAll('.front')
const backs = document.querySelectorAll('.back')
const n = fronts.length
const player = []

const keyframes = (num, n, isFront) => [
  {
    transform: isFront
      ? "rotateY(0deg)"
      : `rotateY(-120deg) translateX(${100 / n}%)`,
    transformOrigin: `${(100 / n) * (num + 1)}%`
  },
  {
    transform: isFront
      ? `rotateY(120deg) translateX(-${100 / n}%)`
      : "rotateY(0deg) ",
    transformOrigin: `${(100 / n) * num}%`
  }
];

const options = {
  duration: 1000,
  fill: 'both',
}

const playAll = () => {
  player.forEach(value => {
    value.play()
  })
}

for (let i = 0; i < n; i++) {
  fronts[i].style.clipPath = `inset(0% ${Math.floor(100 - (100 / n) * (i + 1))}% 0% ${Math.floor((100 / n) * i)}%)`
  backs[i].style.clipPath = `inset(0% ${Math.floor(100 - (100 / n) * (i + 1))}% 0% ${Math.floor((100 / n) * i)}%)`
  player.push(
    new Animation(
      new KeyframeEffect(fronts[i], keyframes(i, n, true), {
        ...options,
        iterations: 0.75,
        delay: (i < n / 2 ? n / 2 - 1 - i : i - n / 2) * 200,
      }),
    ),
  )
  player.push(
    new Animation(
      new KeyframeEffect(backs[i], keyframes(i, n, false), {
        ...options,
        delay: (i < n / 2 ? n / 2 - 1 - i : i - n / 2) * 200,
      }),
    ),
  )
}

playAll()
