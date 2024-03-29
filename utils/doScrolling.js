// element is a selector-string
// scroll window-based
function scrollWindowTo(element, duration, offset = 'center') {
  const startingY = window.pageYOffset
  if (offset === 'center') {
    offset = (window.innerHeight - element.clientHeight) / 2
  }
  const elementY = window.pageYOffset + element.getBoundingClientRect().top - offset
  const bodyHeight = document.documentElement.scrollHeight
  // If element is close to page's bottom then window will scroll only to some position above the element.
  const targetY = bodyHeight - elementY < window.innerHeight ? bodyHeight - window.innerHeight : elementY
  const diff = targetY - startingY
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  const easing = function (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }
  let start

  // position interfiers with router if we directly return
  // if (!diff) return

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // Elapsed miliseconds since start of scrolling.
    const time = timestamp - start
    // Get percent of completion in range [0, 1].
    let percent = Math.min(time / duration, 1)
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent)

    window.scrollTo(0, startingY + diff * percent)

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}
// scroll container based
// container and element are dom elements
// offset pixel offset to scroll to from top of container or centered
function scrollContainerTo(container, element, duration, offset = 'center', finishedCallback = null) {
  const startingY = container.scrollTop
  if (offset === 'center') {
    offset = (window.innerHeight - element.clientHeight) / 2
  }
  const elementY = element.offsetTop - offset
  const targetY = elementY
  const diff = targetY - startingY
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  const easing = function (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }
  let start

  if (!diff) return
  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // Elapsed miliseconds since start of scrolling.
    const time = timestamp - start
    // Get percent of completion in range [0, 1].
    let percent = Math.min(time / duration, 1)
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent)

    container.scrollTop = startingY + diff * percent

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    } else if (finishedCallback !== null) finishedCallback()
  })
}

export { scrollWindowTo, scrollContainerTo }
