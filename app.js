const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const startTime = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#6495ED', '#8A2BE2', '#E6E6FA', '#FFB6C1', '#90EE90', '#F4A460', '#5F9EA0', '#2E8B57', '#6A5ACD', '#D8BFD8', '#EE82EE']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current) 
    }
}

function setTime(value) {
    startTime.innerHTML = `00:${value}`
} 

function finishGame() {
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
    startTime.parentNode.classList.add('hide')
}

function setColor(circle) {
    const color = getRandomColor()
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 40)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${x}px`
    circle.style.left = `${y}px`
    circle.style.background = getRandomColor()

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max-min) + min)
}