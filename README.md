<h1 align="center">Spec Cookies</h1>

This project describes how http cookies works.

## Fundamental

[HTTP State Management Mechanism](https://tools.ietf.org/html/rfc6265)

- third-party cookies(cross-site cookies)

  Note that the [HSMM](https://tools.ietf.org/html/rfc6265#section-7.1) specification grants user agents wide latitude to experiment with third-party cookie policies that balance the privacy and compatibility needs of their users. However, **it does not endorse any particular third-party cookie policy**.

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
