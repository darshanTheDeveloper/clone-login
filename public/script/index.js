const jsConfetti = new JSConfetti();

setInterval(() => {
  jsConfetti.addConfetti({
    emojis: ['🦄', '⚡️']
  })
}, 2500)