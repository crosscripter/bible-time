const { log } = console
const { readFileSync } = require('fs')
const { createInterface } = require('readline')
const { stdin: input, stdout: output } = process

let index = -1
const text = readFileSync('C:/users/cross/oneDrive/documents/kjv/kjv.txt', 'utf8')

const verses = text
  .split(/\r?\n/g)
  .map(l => l.trim())
  .filter(Boolean)

const cli = createInterface({ input, output })
const ref = () => verses[index].split(' ', 2).join(' ')
const verse = () => verses[index].replace(ref(), '').trim()
const clean = text => text.toLowerCase().replace(/[^\s\w]/g, '')
const cmp = (a, b) => clean(a) === clean(b)

const color =
  (clr, b = 0) =>
  txt =>
    `\x1b[${b};${clr}m${txt}\x1b[0;0m`

const green = color(32)
const yellow = color(93)
const ulRed = color(31, 4)
const dimGreen = color(92, 2)
const boldGreen = color(92, 1)
const dimYellow = color(93, 2)

const dimPunc = w => w.replace(/([^\s\w])/g, dimGreen('$1'))
const answer = () =>
  log(
    dimGreen(ref() + ' '),
    verse()
      .split(' ')
      .map(w => boldGreen(dimPunc(w)))
      .join(' ')
  )

const setPrompt = () => {
  index++
  answer()
  cli.setPrompt(yellow(`${dimYellow(ref())}  `))
}
console.clear()
setPrompt()

const diff = (a, b) => {
  const diffs = []
  const words = b.split(' ')
  const awords = a.split(' ')

  words.forEach((w, i) => {
    const aword = awords?.[i] ?? ' '.repeat(w.length)
    const same = cmp(w, aword)
    const color = same ? green : ulRed
    diffs.push(color(dimPunc(aword)))
  })

  console.clear()
  answer()
  log(dimYellow(ref() + ' '), diffs.join(' ') + '\n')
}

cli.on('line', line => {
  answer()
  if (!line) return cli.prompt()
  diff(line, verse())
  if (cmp(line, verse())) setPrompt()
  cli.prompt()
})

cli.prompt()
