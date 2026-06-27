<template>
  <div
    id="game"
    class="relative flex flex-col items-center min-h-screen text-white font-mono overflow-hidden"
  >
    <canvas ref="matrixRef" class="absolute inset-0 w-full h-full opacity-30 pointer-events-none" />
    <div class="relative z-10 flex flex-col items-center w-full gap-6 py-4">
      <h1 class="text-2xl font-bold text-purple-light tracking-widest mb-6">SNAKE.EXE</h1>

      <div
        class="flex gap-10 border border-purple-light/40 bg-black/50 backdrop-blur-sm rounded-md p-1"
      >
        <div class="text-center">
          <p class="text-[10px] text-purple-light/60 tracking-[3px]">SCORE</p>
          <p class="text-xl font-bold text-pink">{{ score }}</p>
        </div>
        <div class="text-center">
          <p class="text-[10px] text-purple-light/60 tracking-[3px]">LEVEL</p>
          <p class="text-xl font-bold text-pink">{{ level }}</p>
        </div>
        <div class="text-center">
          <p class="text-[10px] text-purple-light/60 tracking-[3px]">BEST</p>
          <p class="text-xl font-bold text-pink">{{ best }}</p>
        </div>
      </div>

      <canvas
        ref="canvasRef"
        :width="CANVAS_SIZE"
        :height="CANVAS_SIZE"
        class="border border-purple-light/10 shadow-[0_0_30px_rgba(125,72,201,0.2)]"
      />

      <p
        class="p-2 bg-black/50 backdrop-blur-sm mt-4 text-xs text-purple-light/50 tracking-[2px] min-h-4"
      >
        {{ message }}
      </p>

      <div
        class="flex flex-col items-center gap-2 bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-purple-light/10"
      >
        <button
          class="w-12 h-12 border border-purple-light/30 bg-purple/10 text-purple-light rounded-lg text-base cursor-pointer transition-all hover:bg-purple/30 hover:border-purple-light shadow-[0_0_10px_rgba(125,72,201,0.2)]"
          @click="setDir(0, -1)"
        >
          ↑
        </button>
        <div class="flex gap-2">
          <button class="ctrl-btn" @click="setDir(-1, 0)">←</button>
          <button class="ctrl-btn" @click="setDir(0, 1)">↓</button>
          <button class="ctrl-btn" @click="setDir(1, 0)">→</button>
        </div>
      </div>

      <!-- Botão iniciar -->
      <button
        class="mt-4 px-6 py-2 border border-purple-light/40 bg-black/50 backdrop-blur-sm text-purple-light text-xs tracking-[2px] rounded-lg cursor-pointer transition-all duration-300 hover:bg-purple/30 hover:border-purple-light shadow-[0_0_15px_rgba(125,72,201,0.2)] hover:shadow-[0_0_25px_rgba(125,72,201,0.4)]"
        @click="startGame"
      >
        ▸ START_GAME.EXE / REINICIAR
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Point {
  x: number
  y: number
}
const COLS = 20
const CANVAS_SIZE = 400
const CELL = CANVAS_SIZE / COLS

const canvasRef = ref<HTMLCanvasElement | null>(null)
const score = ref(0)
const level = ref(1)
const best = ref(0)
const message = ref('PRESSIONE ESPAÇO PARA INICIAR')

let snake: Point[] = []
let dir: Point = { x: 1, y: 0 }
let nextDir: Point = { x: 1, y: 0 }
let food: Point = { x: 5, y: 5 }
let running = false
let loop: ReturnType<typeof setInterval> | null = null
let tickSpeed = 160
let animFrame: number

function getCtx(): CanvasRenderingContext2D | null {
  return canvasRef.value?.getContext('2d') ?? null
}

function spawnFood(): Point {
  let f: Point
  do {
    f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * COLS) }
  } while (snake.some((s) => s.x === f.x && s.y === f.y))
  return f
}

function startGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]
  dir = { x: 1, y: 0 }
  nextDir = { x: 1, y: 0 }
  food = spawnFood()
  score.value = 0
  level.value = 1
  tickSpeed = 160
  running = true
  message.value = ''

  if (loop) clearInterval(loop)
  loop = setInterval(step, tickSpeed)

  cancelAnimationFrame(animFrame)
  drawFrame()
}
function step() {
  dir = { ...nextDir }
  const currentHead = snake[0]
  if (!currentHead) return

  const head = { x: currentHead.x + dir.x, y: currentHead.y + dir.y }

  if (
    head.x < 0 ||
    head.x >= COLS ||
    head.y < 0 ||
    head.y >= COLS ||
    snake.some((s) => s.x === head.x && s.y === head.y)
  ) {
    gameOver()
    return
  }

  snake.unshift(head)

  if (head.x === food.x && head.y === food.y) {
    score.value += level.value * 10
    if (score.value >= level.value * 50) {
      level.value++
      tickSpeed = Math.max(60, tickSpeed - 15)
      if (loop) clearInterval(loop)
      loop = setInterval(step, tickSpeed)
    }
    food = spawnFood()
  } else {
    snake.pop()
  }
}

function gameOver() {
  running = false
  if (loop) clearInterval(loop)
  best.value = Math.max(best.value, score.value)
  message.value = '// GAME OVER — REINICIAR? (espaço para reiniciar)'
}

function drawFrame() {
  if (!canvasRef.value) return
  const ctx = getCtx()
  if (!ctx) return

  const t = Date.now()

  ctx.fillStyle = '#0a0010'
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

  ctx.strokeStyle = 'rgba(125,72,201,0.05)'
  ctx.lineWidth = 0.5
  for (let i = 0; i <= COLS; i++) {
    ctx.beginPath()
    ctx.moveTo(i * CELL, 0)
    ctx.lineTo(i * CELL, CANVAS_SIZE)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i * CELL)
    ctx.lineTo(CANVAS_SIZE, i * CELL)
    ctx.stroke()
  }

  const pulse = 0.7 + 0.3 * Math.sin(t / 400)
  ctx.fillStyle = `rgba(236,72,153,${pulse})`
  ctx.shadowColor = '#ec4899'
  ctx.shadowBlur = 16 * pulse
  ctx.fillRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6)
  ctx.shadowBlur = 0

  snake.forEach((s, i) => {
    const alpha = 1 - (i / snake.length) * 0.5
    ctx.fillStyle = i === 0 ? `rgba(224,120,249,${alpha})` : `rgba(125,72,201,${alpha})`
    ctx.shadowColor = i === 0 ? '#e879f9' : '#7d48c9'
    ctx.shadowBlur = i === 0 ? 12 : 5
    ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2)
    ctx.shadowBlur = 0
    if (i === 0) {
      ctx.strokeStyle = '#c084fc'
      ctx.lineWidth = 1
      ctx.strokeRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2)
    }
  })

  if (!running && score.value > 0) {
    ctx.fillStyle = 'rgba(10,0,16,0.75)'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    ctx.fillStyle = '#e879f9'
    ctx.font = 'bold 16px Courier New'
    ctx.textAlign = 'center'
    ctx.shadowColor = '#e879f9'
    ctx.shadowBlur = 20
    ctx.fillText('// GAME OVER //', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 10)
    ctx.shadowBlur = 0
    ctx.fillStyle = '#7d48c9'
    ctx.font = '12px Courier New'
    ctx.fillText(`SCORE: ${score.value}`, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 14)
    ctx.textAlign = 'left'
  }

  animFrame = requestAnimationFrame(drawFrame)
}

function setDir(x: number, y: number) {
  if (!running) return
  if (x !== 0 && dir.x !== 0) return
  if (y !== 0 && dir.y !== 0) return
  nextDir = { x, y }
}

function onKey(e: KeyboardEvent) {
  if (e.code === 'Space') {
    startGame()
    return
  }
  if (!running) return

  const map: Record<string, [number, number]> = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
  }

  const coords = map[e.key]

  if (coords) {
    e.preventDefault()
    const [x, y] = coords
    setDir(x, y)
  }
}
onMounted(() => {
  window.addEventListener('keydown', onKey)
  drawFrame()
  startMatrix()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  if (loop) clearInterval(loop)
  cancelAnimationFrame(animFrame)
})
const matrixRef = ref<HTMLCanvasElement | null>(null)
let matrixAnim: number

function startMatrix() {
  const canvas = matrixRef.value!
  const ctx = canvas.getContext('2d')!

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const chars =
    'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>{}[]|/\\'.split('')
  const fontSize = 14
  let cols = Math.floor(canvas.width / fontSize)
  let drops = Array(cols).fill(1)

  function draw() {
    ctx.fillStyle = 'rgba(2, 6, 24, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    cols = Math.floor(canvas.width / fontSize)
    if (drops.length !== cols) drops = Array(cols).fill(1)

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)] || '0'

      ctx.fillStyle = `hsl(${270 + Math.random() * 40}, 80%, 85%)`
      ctx.font = `bold ${fontSize}px monospace`
      ctx.fillText(char, i * fontSize, y * fontSize)

      // Rastro em roxo/pink
      ctx.fillStyle = `hsl(${280 + Math.random() * 30}, 70%, 55%)`
      ctx.font = `${fontSize}px monospace`

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    })

    matrixAnim = requestAnimationFrame(draw)
  }

  draw()
}
</script>

<style scoped>
.ctrl-btn {
  width: 3rem;
  height: 3rem;
  border: 1px solid rgba(192, 132, 252, 0.3);
  background: rgba(125, 72, 201, 0.1);
  color: #c084fc;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.ctrl-btn:hover {
  background: rgba(125, 72, 201, 0.3);
  border-color: #c084fc;
}
</style>
