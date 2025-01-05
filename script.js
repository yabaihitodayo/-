const redSlider = document.getElementById('red');
const greenSlider = document.getElementById('green');
const blueSlider = document.getElementById('blue');
const randomButton = document.getElementById('randomButton');

// スライダーの値を元に背景色を更新する関数
function updateBackgroundColor() {
  const red = redSlider.value;
  const green = greenSlider.value;
  const blue = blueSlider.value;
  document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

// スライダーが動いたときに背景色を変更
redSlider.addEventListener('input', updateBackgroundColor);
greenSlider.addEventListener('input', updateBackgroundColor);
blueSlider.addEventListener('input', updateBackgroundColor);

// ランダムな背景色にするボタンの動作
randomButton.addEventListener('click', () => {
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);

  redSlider.value = randomRed;
  greenSlider.value = randomGreen;
  blueSlider.value = randomBlue;

  updateBackgroundColor();
});