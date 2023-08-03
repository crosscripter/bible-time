const { log } = console
const { readFileSync } = require('fs')


const bookOrder = ['3Jo', '2Jo', 'Phm', 'Ob', 'Jude', 'Hag', 'Jon', 'Tit', 
'2Th', 'Na', 'Hab', 'Zep', 'Mal', '2Pe', 
'Joe', '2Ti', '1Th', 'Col', 'Ru',
'Song', 'Php', 'Jas', '1Ti', 'Mic',
'1Jo', '1Pe', 'La', 'Eph',
'Ga', 'Am', 'Ho',
'Ec', 'Es', 'Zec',
'2Co', 'Ezr',
'Heb', '1Co',
'Ro', 'Da', 'Ne', 'Re', 'Pr', 'Mr', 'Jg', 'Job', 'Jos', 'Joh', '2Sa', '1Ch',
'2Ki', 'Le', '1Sa', '1Ki', 'Ac', '2Ch', 'Mt', 'Lu', 'De', 'Nu', 'Ex', 'Isa',
'Eze', 'Jer', 'Ge', 'Ps'
]

const bookNames = {
    Ac: 'Acts of the Apostles',
    Am: 'The Book of the Prophet Amos',
    Song: 'The Song of Songs',
    '1Ch': 'The First book of Chronicles',
    '2Ch': 'The Second book of Chronicles',
    Col: 'The Epistle of Paul the Apostle to the Colossians',
    '1Co': 'The First epistle of Paul the Apostle to the Corinthians',
    '2Co': 'The Second epistle of Paul the Apostle to the Corinthians',
    Da: 'The Book of the Prophet Daniel',
    De: 'The Fifth Book of Moses Called Deuteronomy',
    Ec:	'The Book of Ecclesiastes',
    Eph: 'The Epistle of Paul the Apostle to the Ephesians',
    Es: 'The Book of Esther',
    Ex: 'The Second Book of Moses Called Exodus',
    Eze: 'The Book of the Prophet Ezekiel',
    Ezr: 'The Book of the Prophet Ezra',
    Ga: 'The Epistle of Paul the Apostle to the Galatians',
    Ge: 'The First Book of Moses Called Genesis',
    Hab: 'The Book of the Prophet Habakkuk',
    Hag: 'The Book of the Prophet Haggai',
    Heb: 'The Epistle of Paul the Apostle to the Hebrews',
    Ho: 'The Book of the Prophet Hosea',
    Isa: 'The Book of the Prophet Isaiah',
    Jas: 'The Epistle General of James',
    Jer: 'The Book of the Prophet Jeremiah',
    Joh: 'The Gospel According to John',
    '1Jo': 'The First Epistle General of John',
    '2Jo': 'The Second Epistle General of John',
    '3Jo': 'The Third Epistle General of John',
    Job: 'The Book of Job',
    Joe: 'The Book of the Prophet Joel',
    Jon: 'The Book of the Prophet Jonah',
    Jos: 'Joshua',
    Jude: 'The Epistle General of Jude',
    Jg:	'Judges',
    '1Ki':	'The First Book of Kings',
    '2Ki':	'The Second Book of Kings',
    La:	'The Book of the Lamentations of the Prophet Jeremiah',
    Le:	'The Third Book of Moses Called Leviticus',
    Lu: 'The Gospel According to Luke',
    Mal: 'The Book of the Prophet Malachi',
    Mr: 'The Gospel According to Mark',
    Mt:	'The Gospel According to Matthew',
    Mic: 'The Book of the Prophet Micah',
    Na:	'The Book of the Prophet Nahum',
    Ne:	'The Book of the Prophet Nehemiah',
    Nu:	'The Fourth Book of Moses Called Numbers',	
    Ob: 'The Book of the Prophet Obadiah',
    '1Pe': 'The First Epistle General of Peter',
    '2Pe': 'The Second Epistle General of Peter',
    Phm: 'The Epistle of Paul to Philemon',
    Php: 'The Epistle of Paul the Apostle to the Philippians',
    Pr:	'The Book of Proverbs',
    Ps:	'The Book of Psalms', 
    Re: 'The Book of the Revelation of Jesus Christ According to John', 
    Ro:	 'The Epistle of Paul the Apostle to the Romans',
    Ru: 'The Book of Ruth',
    '1Sa': 'The First Book of the Prophet Samuel',
    '2Sa': 'The Second Book of the Prophet Samuel',
    '1Th': 'The First Epistle of Paul the Apostle to the Thessalonians',
    '2Th': 'The Second Epistle of Paul the Apostle to the Thessalonians',
    '1Ti': 'The First Epistle of Paul the Apostle to Timothy',
    '2Ti': 'The Second Epistle of Paul the Apostle to Timothy',
    Tit: 'The Epistle of Paul to Titus',
    Zec: 'The Book of the Prophet Zechariah',
    Zep: 'The Book of the Prophet Zephaniah',
}

const days = [
    0, 8, 14, 19, 24, 28, 31, 34, 36, 38, 39, 40, 41, 
    42, 43, 44, -44, 45, -45, 46, -46, 47, -47, 48, -48, 
    49, -49, 50, -50, 51, -51, 52, -52, 53, -53, 54, -54,
    55, -55, 56, -56, 57, -57, 58, -58, 59, -59, 60, -60,
    61, -61, 62, -62, 63, -63, 64, -64, 65
]

let day = 0
const bibleTime = []
const kjv = readFileSync('kjv.txt', 'utf8')
const verses = kjv.split(/\r\n|\r|\n/g).filter(Boolean)
const pushDay = (day) => bibleTime.push(`\n<h3>DAY ${day}</h3>`)
const pushVerses = verses => bibleTime.push(...verses)

bibleTime.push(`
<style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merriweather+Sans&display=swap');

body {
    color: #111;
    background: eee;
    margin: 0 auto;
    width: 50%;
    line-height: 1.75;
    font-size: 0.9rem;
    text-align: justify;
    text-rendering: optimizeLegibility;
    font-family: 'Merriweather Sans', sans-serif;
    background: #222;
    color: #dadada;
}
span { font-weight: normal; }
h1 { 
    font-size: 1.5rem;
    text-align: center;
    letter-spacing: 0.5px;
    font-variant: small-caps;
    font-family: Merriweather, georgia;
    margin-top: 2rem;
}
ul { 
    list-style-type: none;
    padding: none;
}
sup {
    font-size: 0.5rem;
    position: relative;
    top: -10px;
    display: inline-block;
    margin: 0;
    margin-left: -0.5rem;
    left: 10px;
    opacity: 0.3;
}
</style>
`)

bookOrder.forEach((book, i) => {
    bibleTime.push(`</p><p>`)
    let bookVerses = verses.filter(verse => verse.startsWith(book))
    bookVerses = bookVerses.map(v => v.replace(/<<(.*?)>>/g, '<i>$1</i>'))
    bookVerses = bookVerses.map(v => v.replace(/^(\w+) (\d+):(\d+) (.*)$/, '<span><sup>$2:$3</sup>$4</span>').trim())
    bookVerses = bookVerses.map(v => v.replace(/\[(.*?)\]/g, '<i>$1</i>'))

    if (days.includes(i)) {
        day = days.indexOf(i) + 1
        pushDay(day)
    }

    const bookName = bookNames[book]
    if (!bookName) throw book
    bibleTime.push(`\n<h1>${bookName}</h1>\n`)

    if (i > 0 && days.includes(-i)) {
        const halfIndex = Math.round(bookVerses.length / 2)
        pushVerses(bookVerses.slice(0, halfIndex))
        pushDay(day + 1)
        pushVerses(bookVerses.slice(halfIndex))
    } else if (book === 'Ps') {
        const oneThirdIndex = Math.round(bookVerses.length / 3)
        const twoThirdIndex = oneThirdIndex * 2
        pushVerses(bookVerses.slice(0, oneThirdIndex))
        pushDay(day + 1)
        pushVerses(bookVerses.slice(oneThirdIndex, twoThirdIndex))
        pushDay(day + 2)
        pushVerses(bookVerses.slice(twoThirdIndex))
    } else {
        pushVerses(bookVerses)
    }
})

log(bibleTime.join('\n'))