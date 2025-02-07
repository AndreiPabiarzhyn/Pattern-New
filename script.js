// Массив уровней (без изменений)
const levels = [
  // Уровень 1
  [
    { shape: 'square', color: 'red' },
    { shape: 'circle', color: 'blue' },
    { shape: 'triangle', color: 'green' },
    { shape: 'square', color: 'yellow' }
  ],
  // Уровень 2
  [
    { shape: 'circle', color: 'orange' },
    { shape: 'triangle', color: 'purple' },
    { shape: 'square', color: 'pink' },
    { shape: 'circle', color: 'brown' },
    { shape: 'triangle', color: 'gray' }
  ],
  // Уровень 3
  [
    { shape: 'triangle', color: 'black' },
    { shape: 'square', color: 'white' },
    { shape: 'circle', color: 'beige' },
    { shape: 'triangle', color: 'gold' },
    { shape: 'square', color: 'cyan' },
    { shape: 'circle', color: 'magenta' }
  ],
  // Уровень 4 – 7 элементов
  [
    { shape: 'square', color: 'red' },
    { shape: 'triangle', color: 'blue' },
    { shape: 'circle', color: 'green' },
    { shape: 'square', color: 'purple' },
    { shape: 'triangle', color: 'orange' },
    { shape: 'circle', color: 'yellow' },
    { shape: 'square', color: 'pink' }
  ],
  // Уровень 5 – 8 элементов
  [
    { shape: 'circle', color: 'magenta' },
    { shape: 'square', color: 'cyan' },
    { shape: 'triangle', color: 'lime' },
    { shape: 'circle', color: 'coral' },
    { shape: 'square', color: 'teal' },
    { shape: 'triangle', color: 'olive' },
    { shape: 'circle', color: 'navy' },
    { shape: 'square', color: 'maroon' }
  ],
  // Уровень 6 – 9 элементов
  [
    { shape: 'triangle', color: 'gold' },
    { shape: 'circle', color: 'silver' },
    { shape: 'square', color: '#cd7f32' }, // бронзовый
    { shape: 'triangle', color: 'violet' },
    { shape: 'circle', color: 'indigo' },
    { shape: 'square', color: 'crimson' },
    { shape: 'triangle', color: 'peru' },
    { shape: 'circle', color: 'slateblue' },
    { shape: 'square', color: 'darkgreen' }
  ],
  // Уровень 7 – 10 элементов
  [
    { shape: 'square', color: 'darkred' },
    { shape: 'circle', color: 'darkblue' },
    { shape: 'triangle', color: 'darkorange' },
    { shape: 'square', color: 'darkmagenta' },
    { shape: 'circle', color: 'darkcyan' },
    { shape: 'triangle', color: 'darkgoldenrod' },
    { shape: 'square', color: 'darkkhaki' },
    { shape: 'circle', color: 'darkolivegreen' },
    { shape: 'triangle', color: 'darkslategray' },
    { shape: 'square', color: 'darkviolet' }
  ],
  // Уровень 8 – 11 элементов
  [
    { shape: 'triangle', color: '#FF4500' },
    { shape: 'square', color: '#2E8B57' },
    { shape: 'circle', color: '#1E90FF' },
    { shape: 'triangle', color: '#DA70D6' },
    { shape: 'square', color: '#FFD700' },
    { shape: 'circle', color: '#00CED1' },
    { shape: 'triangle', color: '#8A2BE2' },
    { shape: 'square', color: '#FF69B4' },
    { shape: 'circle', color: '#7FFF00' },
    { shape: 'triangle', color: '#DC143C' },
    { shape: 'square', color: '#4B0082' }
  ]
];

let currentLevel = 0;
let maxUnlockedLevel = 1; // Номер самого высокого разблокированного уровня (начиная с 1)
let startTime;
let timerInterval;
let contrastMode = false; // Глобальный флаг режима контраста

// Карта для режима контраста (цвета, подобранные для лучшей различимости)
const contrastMapping = {
  "red": "#d7191c",
  "blue": "#2c7bb6",
  "green": "#1a9641",
  "yellow": "#fdae61",
  "orange": "#f46d43",
  "purple": "#542788",
  "pink": "#e7298a",
  "brown": "#a6611a",
  "gray": "#999999",
  "black": "#000000",
  "white": "#ffffff",
  "beige": "#fdae61",
  "gold": "#ffffbf",
  "cyan": "#80cdc1",
  "magenta": "#f46d43",
  "lime": "#a6d96a",
  "coral": "#e6ab02",
  "teal": "#008080",
  "olive": "#b8b8b8",
  "navy": "#000080",
  "maroon": "#800000",
  "silver": "#cccccc",
  "#cd7f32": "#8c510a",
  "violet": "#8c510a",
  "indigo": "#5e4fa2",
  "crimson": "#d53e4f",
  "peru": "#bf812d",
  "slateblue": "#3288bd",
  "darkgreen": "#1b7837",
  "darkred": "#b2182b",
  "darkblue": "#2166ac",
  "darkorange": "#e66101",
  "darkmagenta": "#8e0152",
  "darkcyan": "#35978f",
  "darkgoldenrod": "#fdb863",
  "darkkhaki": "#c7eae5",
  "darkolivegreen": "#80cdc1",
  "darkslategray": "#01665e",
  "darkviolet": "#5e3c99",
  "#FF4500": "#f46d43",
  "#2E8B57": "#1a9641",
  "#1E90FF": "#2c7bb6",
  "#DA70D6": "#d53e4f",
  "#FFD700": "#ffffbf",
  "#00CED1": "#80cdc1",
  "#8A2BE2": "#542788",
  "#FF69B4": "#e7298a",
  "#7FFF00": "#a6d96a",
  "#DC143C": "#b2182b",
  "#4B0082": "#5e4fa2"
};

// Функция для выбора цвета с учётом режима контраста
function getDisplayColor(originalColor) {
  if (!contrastMode) return originalColor;
  if (contrastMapping.hasOwnProperty(originalColor)) {
    return contrastMapping[originalColor];
  }
  return originalColor;
}

function updateLevelButtons() {
  for (let i = 1; i <= levels.length; i++) {
    const btn = document.getElementById(`level-${i}`);
    if (btn) {
      btn.disabled = i > maxUnlockedLevel;
    }
  }
}
updateLevelButtons();

function selectLevel(level) {
  if (level > maxUnlockedLevel) return; // Если уровень не разблокирован
  currentLevel = level - 1;
  loadLevel();
  startTimer();
}

function loadLevel() {
  const patternArea = document.getElementById('pattern');
  const workspace = document.getElementById('workspace');
  const piecesArea = document.getElementById('pieces');

  // Очистка предыдущих элементов
  patternArea.innerHTML = '';
  workspace.innerHTML = '';
  piecesArea.innerHTML = '';

  const levelData = levels[currentLevel];

  // Заполнение целевого паттерна
  for (let item of levelData) {
    const piece = createPiece(item);
    patternArea.appendChild(piece);
  }

  // Создаем перетаскиваемые элементы (перемешанные)
  const shuffledPieces = shuffleArray([...levelData]);
  for (let item of shuffledPieces) {
    const piece = createPiece(item);
    piece.setAttribute('draggable', true);
    piece.addEventListener('dragstart', dragStart);
    piecesArea.appendChild(piece);
  }

  // Устанавливаем обработчики drop (один раз)
  makeDroppable(workspace);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer() {
  clearInterval(timerInterval);
  let seconds = 0;
  startTime = Date.now();
  timerInterval = setInterval(() => {
    seconds++;
    document.getElementById('timer').textContent = `Время: ${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
  }, 1000);
}

function checkPattern() {
  const workspace = document.getElementById('workspace');
  const workspacePieces = Array.from(workspace.children).map(piece => ({
    shape: piece.dataset.shape,
    color: piece.dataset.color
  }));
  const levelData = levels[currentLevel];

  if (JSON.stringify(workspacePieces) === JSON.stringify(levelData)) {
    clearInterval(timerInterval);
    const elapsedTime = (Date.now() - startTime) / 1000;
    document.getElementById('final-time').textContent = `${Math.floor(elapsedTime / 60)}:${elapsedTime % 60 < 10 ? '0' : ''}${Math.floor(elapsedTime % 60)}`;
    document.getElementById('victory-screen').style.display = 'block';
  } else {
    alert('Неправильно! Попробуйте еще раз.');
  }
}

function resetLevel() {
  clearInterval(timerInterval);
  loadLevel();
  startTimer();
  document.getElementById('victory-screen').style.display = 'none';
}

function nextLevel() {
  // Скрываем окно победы перед переключением уровня
  document.getElementById('victory-screen').style.display = 'none';

  if (currentLevel < levels.length - 1) {
    if (maxUnlockedLevel < currentLevel + 2) {
      maxUnlockedLevel = currentLevel + 2;
      updateLevelButtons();
    }
    selectLevel(currentLevel + 2);
  } else {
    showFinalVictoryOverlay();
  }
}

function showFinalVictoryOverlay() {
  document.getElementById('final-victory-overlay').style.display = 'block';
}

function restartGame() {
  maxUnlockedLevel = 1;
  updateLevelButtons();
  document.getElementById('final-victory-overlay').style.display = 'none';
  selectLevel(1);
}

function dragStart(event) {
  const piece = event.target;
  event.dataTransfer.setData("shape", piece.dataset.shape);
  event.dataTransfer.setData("color", piece.dataset.color);
}

function makeDroppable(area) {
  if (area.getAttribute('data-droppable') === 'true') return;
  area.setAttribute('data-droppable', 'true');

  area.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  area.addEventListener('drop', function (event) {
    event.preventDefault();
    const shape = event.dataTransfer.getData("shape");
    const color = event.dataTransfer.getData("color");
    addPieceToWorkspace({ shape, color });
  });
}

function addPieceToWorkspace(item) {
  const piece = createPiece(item);
  piece.removeAttribute('draggable'); // Отключаем перетаскивание после помещения
  // Добавляем обработчик для удаления фигуры при клике (только для рабочей области)
  piece.addEventListener('click', function () {
    this.remove();
  });
  document.getElementById('workspace').appendChild(piece);
}

function createPiece(item) {
  const piece = document.createElement('div');
  piece.className = 'piece';
  piece.dataset.shape = item.shape;
  piece.dataset.color = item.color; // Сохраняем оригинальный цвет

  let displayColor = getDisplayColor(item.color);

  switch (item.shape) {
    case 'circle':
      piece.classList.add('shape-circle');
      piece.style.backgroundColor = displayColor;
      break;
    case 'triangle':
      piece.classList.add('shape-triangle');
      piece.style.borderBottomColor = displayColor;
      break;
    default:
      piece.classList.add('shape-square');
      piece.style.backgroundColor = displayColor;
  }
  return piece;
}

// Функция обновления цветов у всех фигур с учётом режима контраста
function updateContrastColors() {
  const allPieces = document.querySelectorAll('.piece');
  allPieces.forEach(piece => {
    const newColor = getDisplayColor(piece.dataset.color);
    if (piece.classList.contains('shape-triangle')) {
      piece.style.borderBottomColor = newColor;
    } else {
      piece.style.backgroundColor = newColor;
    }
  });
}

// Функция переключения режима контраста с подсветкой кнопки
function toggleContrastMode() {
  contrastMode = !contrastMode;
  updateContrastColors();
  
  const contrastBtn = document.getElementById('contrast-btn');
  if (contrastMode) {
    contrastBtn.classList.add('active');
  } else {
    contrastBtn.classList.remove('active');
  }
}

/* -------------- Функция автоматического масштабирования -------------- */
function scaleGameContainer() {
  const container = document.getElementById('game-container');
  if (!container) return;
  
  // Базовые размеры, для которых был рассчитан дизайн игры:
  const baseWidth = 1200;
  const baseHeight = 1000;
  
  // Получаем доступные размеры окна
  const availableWidth = window.innerWidth;
  const availableHeight = window.innerHeight;
  
  // Вычисляем масштаб так, чтобы контейнер полностью помещался в окно
  const scaleFactor = Math.min(availableWidth / baseWidth, availableHeight / baseHeight);
  
  container.style.transform = `scale(${scaleFactor})`;
  // При таком подходе лучше фиксировать верхнюю часть контейнера, чтобы он не «уходил» за пределы окна
  container.style.transformOrigin = 'top center';
}

// Вызываем функцию масштабирования при загрузке и изменении размеров окна
window.addEventListener('load', scaleGameContainer);
window.addEventListener('resize', scaleGameContainer);


