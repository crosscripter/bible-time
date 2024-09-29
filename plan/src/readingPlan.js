const { log } = console
const { readFileSync, writeFileSync } = require('fs')

const words = text =>
  text
    .trim()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)

const readTime = text => Math.ceil(words(text).length / 300)
const base = 'C:/users/cross/oneDrive/documents/kjv'
const kjv = readFileSync(`${base}/KJV.txt`, 'utf8')
const verses = kjv.split(/\r\n/g).filter(Boolean)

const books = [...new Set(verses.map(v => v.replace(/^(.*) (\d+):(\d+) (.*)$/, '$1')))]

const readTimes = books.map(book => {
  const text = verses
    .filter(v => v.startsWith(book + ' '))
    .map(v => v.replace(/^.* \d+:\d+ /g, '').replace(/\[(.*?)\]/g, '$1'))
    .join('\n')

  const time = readTime(text)
  return { book, text, time, words: words(text).length }
})

const chapterCount = book => {
  const bookVerses = verses.filter(v => v.startsWith(`${book} `))
  const lastBookVerse = bookVerses.at(-1)
  const lastChapter = parseInt(lastBookVerse.replace(/^.* (\d+):\d+.*$/g, '$1'), 10)
  return lastChapter
}

const chapterText = (book, ch) => {
  const bookVerses = verses.filter(v => v.startsWith(`${book} `))
  const chapterText = bookVerses
    .filter(v => v.startsWith(`${book} ${ch}:`))
    .map(v => v.replace(/^.* \d+:(\d+) /g, '').replace(/\[(.*?)\]/g, '$1'))
    .join('\n')
  return chapterText
}

const chapterReadTimes = book => {
  const chapters = chapterCount(book)
  const chapterTimes = []
  for (let ch = 1; ch <= chapters; ch++) {
    const text = chapterText(book, ch)
    chapterTimes.push({ chapter: ch, words: words(text).length, time: readTime(text) })
  }
  return chapterTimes
}

log('Calculating reading plan...')
// readTimes.sort((a, b) => a.words - b.words)

console.log(`book, book chapters, book words, book time, chapter, chapter words, chapter time, day`)

let day = 1
let secs = 0
let dayNum = ''
const minsPerDay = 240
const dayText = {}

readTimes.map(({ book, words: bookWords, time: bookTime }) => {
  const chapters = chapterCount(book)
  const chapterTimes = chapterReadTimes(book)
  chapterTimes.forEach(({ chapter, words, time }) => {
    dayNum = `${day}`
    secs += time
    console.log(`${book}, ${chapters}, ${bookWords}, ${bookTime}, ${chapter}, ${words}, ${time}, ${dayNum}`)
    if (!dayText[day]) dayText[day] = ''
    dayText[day] += `<h1>${book} ${chapter}</h1><h4>${time} Minutes, ${words} words</h4>${chapterText(book, chapter)}`
    if (secs >= minsPerDay) {
      day++
      secs = 0
    }
  })
})

const style = readFileSync(`C:/users/cross/oneDrive/documents/kjv/daily/style.css`, 'utf8')
Object.entries(dayText).map(([key, value]) => {
  const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1" /><style>${style}</style></head><body>${value}</body></html>`
  writeFileSync(`C:/users/cross/oneDrive/documents/kjv/daily/Day${key}.html`, html, 'utf8')
})

return

const plan = readTimes.map(({ book, time, words }) => `${book}: ${words} words, ~${time}mins`).join('\n')

log(plan)
writeFileSync(`${base}/plan.txt`, plan)

log('Writing books...')
readTimes.map(({ book, time, words, text }) => {
  writeFileSync(
    `${base}/${book}.txt`,
    `${book} (${words} words) ~${time} minutes  (${(time / 60).toFixed(2)} hrs)\n\n${text}`
  )
})

log('Writing daily plan')
// const minsPerDay = 60

const kjvText = verses.map(v => v.replace(/^.* \d+:\d+ /g, '').replace(/\[(.*?)\]/g, '$1')).join('\n')

const kjvWords = words(kjvText)

// let day = 0

while (kjvWords.length > 0) {
  day++
  dayTime = 0
  dayWords = []

  while (dayTime < minsPerDay && kjvWords.length > 0) {
    // log(day, dayWords.length, dayTime, kjvWords.length);
    dayWords.push(kjvWords.shift())
    dayTime = readTime(dayWords.join(' '))
  }

  log(`day ${day} ${dayWords.length} words, ${dayTime} mins`)
  writeFileSync(
    `${base}/daily/day${day}.txt`,
    `Day ${day}, ${dayWords.length} words, ~${dayTime} minutes\n\n${dayWords.join(' ')}`
  )
}
