// Type definitions
interface Player {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: Direction;
}

interface Direction {
  x: number;
  y: number;
}

interface Lollipop {
  x: number;
  y: number;
  size: number;
  color: string;
}

// Game
function load() {}

function start() {
  console.log('Start');
  // Game setup
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

  if (!canvas) {
    console.warn('Unable to attach to canvas');
    return;
  }

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const scoreElement = document.getElementById('score') as HTMLElement;

  if (!ctx || !scoreElement) {
    console.warn('Unable to find context or score elements.');
    return;
  }

  // Game state
  let score = 0;
  const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 40,
    color: '#5f9ea0',
    speed: 5,
    direction: { x: 0, y: 0 },
  };

  const lollipops: Lollipop[] = [];
  const lollipopCount = 5;
  const lollipopSize = 30;

  // Key press tracking
  const keys = {};

  // Initialize lollipops
  function createLollipops() {
    for (let i = 0; i < lollipopCount; i++) {
      spawnLollipop();
    }
  }

  function spawnLollipop() {
    // Ensure lollipops don't spawn too close to edges
    const margin = lollipopSize * 2;
    const lollipop = {
      x: margin + Math.random() * (canvas.width - margin * 2),
      y: margin + Math.random() * (canvas.height - margin * 2),
      size: lollipopSize,
      color: getRandomColor(),
    };
    lollipops.push(lollipop);
  }

  function getRandomColor() {
    const colors = ['#ff69b4', '#ff6347', '#32cd32', '#ffa500', '#9370db'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Draw functions
  function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(player.x - 8, player.y - 5, 6, 0, Math.PI * 2);
    ctx.arc(player.x + 8, player.y - 5, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(player.x - 8, player.y - 5, 3, 0, Math.PI * 2);
    ctx.arc(player.x + 8, player.y - 5, 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw smile
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(player.x, player.y + 5, 10, 0, Math.PI);
    ctx.stroke();
  }

  function drawLollipops() {
    lollipops.forEach((lollipop) => {
      // Draw stick
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(lollipop.x - 2, lollipop.y, 4, lollipop.size);

      // Draw candy part
      ctx.fillStyle = lollipop.color;
      ctx.beginPath();
      ctx.arc(lollipop.x, lollipop.y, lollipop.size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw swirl pattern
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(lollipop.x, lollipop.y, lollipop.size / 3, 0, Math.PI);
      ctx.stroke();
    });
  }

  // Game update logic
  function update() {
    // Move player based on key presses
    player.x += player.direction.x * player.speed;
    player.y += player.direction.y * player.speed;

    // Keep player within bounds
    if (player.x < player.size / 2) player.x = player.size / 2;
    if (player.x > canvas.width - player.size / 2)
      player.x = canvas.width - player.size / 2;
    if (player.y < player.size / 2) player.y = player.size / 2;
    if (player.y > canvas.height - player.size / 2)
      player.y = canvas.height - player.size / 2;

    // Check for lollipop collection
    checkLollipopCollection();
  }

  function checkLollipopCollection() {
    for (let i = lollipops.length - 1; i >= 0; i--) {
      const lollipop = lollipops[i];
      const distance = Math.sqrt(
        Math.pow(player.x - lollipop.x, 2) + Math.pow(player.y - lollipop.y, 2)
      );

      if (distance < player.size / 2 + lollipop.size / 2) {
        // Collect lollipop
        lollipops.splice(i, 1);
        score++;
        scoreElement.textContent = score.toString();

        // Spawn a new lollipop
        spawnLollipop();
      }
    }
  }

  // Game loop
  function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    update();
    drawLollipops();
    drawPlayer();

    requestAnimationFrame(gameLoop);
  }

  // Handle keyboard input
  window.addEventListener('keydown', (e) => {
    // @ts-ignore
    keys[e.key] = true;
    updateDirection();
  });

  window.addEventListener('keyup', (e) => {
    // @ts-ignore
    keys[e.key] = false;
    updateDirection();
  });

  function updateDirection() {
    player.direction = { x: 0, y: 0 };

    // @ts-ignore
    if (keys['ArrowUp'] || keys['w']) player.direction.y = -1;
    // @ts-ignore
    if (keys['ArrowDown'] || keys['s']) player.direction.y = 1;
    // @ts-ignore
    if (keys['ArrowLeft'] || keys['a']) player.direction.x = -1;
    // @ts-ignore
    if (keys['ArrowRight'] || keys['d']) player.direction.x = 1;
  }

  // Initialize and start game
  createLollipops();
  gameLoop();
}
