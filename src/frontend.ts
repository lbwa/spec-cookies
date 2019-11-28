const $ = document.querySelector.bind(document)
const ref = $('.ref')
const ORIGIN_URL_REG = {
  main: /main\.domain\.com/,
  sub: /sub\.domain\.com/
}
const CROSS_SITE_EFFECT = {
  sub: 'https://main.domain.com:5000/set-cookie',
  main: 'https://sub.domain.com:5000/set-cookie'
}
const button = document.createElement('button')
function http(url: string, method = 'get') {
  const xml = new XMLHttpRequest()
  xml.open(method, url, true)
  xml.send()
}

if (ORIGIN_URL_REG.main.test(location.origin)) {
  button.innerText = CROSS_SITE_EFFECT.main
  button.onclick = () => http(CROSS_SITE_EFFECT.main)
} else if (ORIGIN_URL_REG.sub.test(location.origin)) {
  button.innerText = CROSS_SITE_EFFECT.sub
  button.onclick = () => http(CROSS_SITE_EFFECT.sub)
} else {
  button.innerText = CROSS_SITE_EFFECT.main
  button.onclick = () => http(CROSS_SITE_EFFECT.main)
}

document.body.insertBefore(button, ref)
