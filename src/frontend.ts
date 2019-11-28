const $ = document.querySelector.bind(document)
const ref = $('.ref')
const ORIGIN_TAG_TO_URL = {
  main: 'main.domain.com',
  sub: 'sub.domain.com'
}
const ORIGIN_URL_TO_TAG = Object.keys(ORIGIN_TAG_TO_URL).reduce(
  (result, tag) => {
    result[ORIGIN_TAG_TO_URL[tag as keyof typeof ORIGIN_TAG_TO_URL]] = tag
    return result
  },
  {} as Record<string, string>
)
const CROSS_SITE_EFFECT = {
  sub: 'https://main.domain.com:5000/set-cookie',
  main: 'https://sub.domain.com:5000/set-cookie'
}
const crossSiteButton = document.createElement('button')
const sameSiteButton = document.createElement('button')
function http(url: string, method = 'get') {
  const xml = new XMLHttpRequest()
  xml.withCredentials = true
  xml.open(method, url, true)
  xml.send()
}

if (new RegExp(ORIGIN_TAG_TO_URL.main).test(location.origin)) {
  crossSiteButton.innerText = CROSS_SITE_EFFECT.main
  crossSiteButton.onclick = () => http(CROSS_SITE_EFFECT.main)
} else if (new RegExp(ORIGIN_TAG_TO_URL.sub).test(location.origin)) {
  crossSiteButton.innerText = CROSS_SITE_EFFECT.sub
  crossSiteButton.onclick = () => http(CROSS_SITE_EFFECT.sub)
} else {
  crossSiteButton.innerText = CROSS_SITE_EFFECT.main
  crossSiteButton.onclick = () => http(CROSS_SITE_EFFECT.main)
}

sameSiteButton.innerText = `${location.origin}/set-cookie`
sameSiteButton.onclick = () => http(`${location.origin}/set-cookie`)

document.body.insertBefore(crossSiteButton, ref)
document.body.insertBefore(sameSiteButton, ref)
