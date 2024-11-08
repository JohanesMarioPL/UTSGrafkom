"use strict"

const dateButton = document.getElementById("date")
const dateCanvas = document.getElementById("dateCanvas")
const datePicker = document.getElementById("datePicker")
const toggleDatePicker = document.getElementById("toggleDatePicker")
const ctx = dateCanvas.getContext("2d")

const earthSize = 15
const sunSize = 30
const horizontalRadius = 150
const verticalRadius = 73
const horizontalMargin = 25
const verticalMargin = 10

let isPressing = false
let today = new Date()
let year = today.getFullYear()
let start = new Date(today.getFullYear(), 0, 0)
let diff = today - start
const oneDay = 1000 * 60 * 60 * 24
let dayNumber = Math.floor(diff / oneDay)
let date = dateFromDay(dayNumber)
document.getElementById("dateDisplay").innerText = addZero(date.getDate()) + "/" + addZero(date.getMonth() + 1) + "/" + date.getFullYear()

let angle = 2 * Math.asin(((dayNumber - 1) / (182.5 + (isLeapyear() ? 0.5 : 0))) - 1)
let x = horizontalRadius * Math.cos(angle)
let y = verticalRadius * Math.sin(angle)

drawScene()

dateCanvas.addEventListener("mousedown", mousedown)
dateCanvas.addEventListener("touchstart", mousedown)

addEventListener("mousemove", mousemove)
addEventListener("touchmove", mousemove)

addEventListener("mouseup", mouseup)
addEventListener("touchend", mouseup)

document.addEventListener("click", function (e) {
  if (!datePicker.contains(e.target) && e.target !== dateButton && e.target !== toggleDatePicker) {
    toggleDatePicker.checked = false
  }
})

function drawScene() {
  ctx.clearRect(0, 0, dateCanvas.width, dateCanvas.height)

  ctx.beginPath()
  ctx.ellipse(horizontalRadius + horizontalMargin, verticalRadius + verticalMargin, horizontalRadius, verticalRadius, 0, 0, Math.PI * 2)
  ctx.strokeStyle = "yellow"
  ctx.lineWidth = 0.5
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(130, 83, sunSize / 2, 0, Math.PI * 2)
  ctx.fillStyle = "orange"
  ctx.fill()

  ctx.beginPath()
  ctx.arc(horizontalRadius + x - earthSize / 2 + horizontalMargin, verticalRadius - y - earthSize / 2 + verticalMargin, earthSize / 2, 0, Math.PI * 2)
  ctx.fillStyle = "blue"
  ctx.fill()
}

function mousedown(e) {
  isPressing = true
}

function mousemove(e) {
  if (!isPressing) return

  const { clientX, clientY } = e.touches != null ? e.touches[0] : e

  const rect = dateCanvas.getBoundingClientRect()
  const ellipseCenterX = rect.x + horizontalRadius + horizontalMargin
  const ellipseCenterY = rect.y + verticalRadius + verticalMargin

  angle = Math.atan2(ellipseCenterY - clientY, clientX - ellipseCenterX)
  x = horizontalRadius * Math.cos(angle)
  y = verticalRadius * Math.sin(angle)

  drawScene()

  let oldDate = date
  dayNumber = ((182.5 + (isLeapyear() ? 0.5 : 0)) * (Math.sin(angle / 2) + 1) + 1)
  date = dateFromDay(dayNumber)

  if (oldDate.getDate() === 1 && oldDate.getMonth() === 0 && date.getDate() === 31 && date.getMonth() === 11) {
    year--
  } else if (oldDate.getDate() === 31 && oldDate.getMonth() === 11 && date.getDate() === 1 && date.getMonth() === 0) {
    year++
  }

  if (date.getTime() > today.getTime()) {
    document.getElementById("dateDisplay").classList.add("future")
    document.getElementById("dateDisplay").innerText = "No time travel allowed!"
  } else {
    document.getElementById("dateDisplay").classList.remove("future")
    document.getElementById("dateDisplay").innerText = addZero(date.getDate()) + "/" + addZero(date.getMonth() + 1) + "/" + date.getFullYear()
  }
}

function displayDateOnCanvas(date) {
    ctx.clearRect(0, 0, dateCanvas.width, dateCanvas.height);
    ctx.fillStyle = "#859F3D";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Selected Date: ${date}`, canvas.width / 2, canvas.height / 2);
  }
  
  function onDatePicked(date) {
    const formattedDate = `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()}`;
    displayDateOnCanvas(formattedDate);
  }

function mouseup(e) {
  isPressing = false
}

function dateFromDay(day) {
  const date = new Date(year, 0)
  return new Date(date.setDate(day))
}

function addZero(num) {
  return num < 10 ? "0" + num : num
}

function isLeapyear() {
  return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
}

// Function to close the full-screen canvas
function closeCanvas() {
  toggleDatePicker.checked = false;
}
