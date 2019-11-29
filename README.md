<h1 align="center">Spec Cookies</h1>

This project describes how http same-site/cross-site cookies works.

## Fundamental

[RFC6265 - HTTP State Management Mechanism](https://tools.ietf.org/html/rfc6265)

### third-party cookies(cross-site cookies)

#### Specification

Note that the [HSMM](https://tools.ietf.org/html/rfc6265#section-7.1) specification grants user agents wide latitude to experiment with third-party cookie policies that balance the privacy and compatibility needs of their users. However, **it does not endorse any particular third-party cookie policy**.

#### MDN

- [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials)

- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Requests_with_credentials)

By default, in cross-site XMLHttpRequest or Fetch invocations, browsers will not send credentials. A specific flag has to be set on the XMLHttpRequest object or the Request constructor when it is invoked.

```ts
// with XMLHttpRequest(omit unrelated code)
const http = new XMLHttpRequest()
http.open('GET', 'https://api.github.com', true)
http.withCredentials = true // set a flag used to send cross-site credentials.

// with browser fetch API(omit unrelated code)
fetch(url, {
  credentials: 'include'
})
```

Note that the response headers should include `Access-Control-Allow-Credentials` with `true` value and `Access-Control-Allow-Origin` with a **specific** origin domain, instead of the `*` wildcard.

## Prerequisites

1. Should run the following command to create local ssl certification which is used to https server.

   ```bash
   npm run setup
   ```

2. Modify your `/etc/host` file

   ```txt
   127.0.0.1 domain.com
   127.0.0.1 main.domain.com
   127.0.0.1 sub.domain.com
   ```

## Installation

- Start https server

  ```bash
  npm run start-https
  ```

- Browse web page

  ```bash
  https://domain.com:5000

  # or
  https://main.domain.com:5000

  # or
  https://sub.domain.com:5000
  ```

## License

MIT © [Bowen Liu](https://github.com/lbwa)
