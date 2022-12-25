#!/usr/bin/env node

let calc = require('./calc')

let rates = []

let decimal = 2

for (let i = 2; i < process.argv.length; i++) {
  let arg = process.argv[i]

  if (arg == '--decimal') {
    i++
    arg = process.argv[i]
    decimal = +arg
    if (Number.isNaN(decimal)) {
      console.error('invalid decimal place:', arg)
    }
    continue
  }

  let rate = +arg
  if (!rate) {
    console.error('invalid rate:', rate)
    process.exit(1)
  }
  rates.push(rate)
}

if (rates.length == 0) {
  console.error('missing rates in argument')
  process.exit(1)
}

let max = Math.max(...rates)
if (max >= 1) {
  rates = rates.map(rate => rate / 100)
}

let res = calc(rates, decimal)
let { n, votes } = res

console.log(`Total ${n} votes`)
votes.forEach(({ rate, vote }, i) => {
  let idx = i + 1
  let percentage = (rate * 100).toFixed(decimal - 2) + '%'
  console.log(`#${idx} ${percentage} ${vote}/${n}`)
})
