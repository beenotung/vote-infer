function calc(rates, decimal) {
  let n = 0
  main: for (;;) {
    n++
    let line = `calculating (n = ${n.toLocaleString()}) ...`
    process.stdout.write('\r' + line)
    let votes = []
    for (let rate of rates) {
      // rate = vote / n
      // vote = rate * n
      let vote = Math.round(rate * n)
      if ((vote / n).toFixed(decimal) != rate.toFixed(decimal)) {
        continue main
      }
      votes.push({ rate, vote })
    }
    process.stdout.write('\r' + ' '.repeat(line.length) + '\r')
    return { n, votes }
  }
}

module.exports = calc
