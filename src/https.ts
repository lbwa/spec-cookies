import https from 'https'
import http from 'http'
import fs from 'fs'
import path from 'path'

const PORT = process.env.PORT || 5000
const EXPIRED_COOKIE = 60 // seconds
const EXPIRED_STATIC = 10 * 60 // seconds
const handler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    const rs = fs.createReadStream(
      path.resolve(process.cwd(), './src/public/index.html')
    )
    rs.pipe(res)
    rs.on('end', () => res.end())
    return
  }

  if (req.url === '/frontend.js') {
    res.writeHead(200, {
      'Content-type': 'application/javascript'
    })
    return fs
      .createReadStream(path.resolve(__dirname, './frontend.js'))
      .pipe(res)
      .on('end', () => res.end())
  }

  if (req.url === '/favicon.ico') {
    res.writeHead(200, {
      'Content-Type': 'image/ico',
      'Cache-Control': `max-age=${EXPIRED_STATIC}`
    })
    return res.end(
      fs.readFileSync(path.resolve(process.cwd(), './src/public/favicon.ico'))
    )
  }

  if (req.url === '/set-cookie') {
    res.writeHead(200, {
      'Set-Cookie': [
        `auth=${Math.random()
          .toString(16)
          .slice(
            2
          )}; HttpOnly; Secure; SameSite=None; Max-Age=${EXPIRED_COOKIE}; Path=/; Domain=domain.com`
      ],
      'Access-Control-Allow-Origin': (req.headers.referer || '*').replace(
        /\.com(:\d+)?(\/.*)?/,
        (match, port) => {
          return '.com' + (port || '')
        }
      ),
      'Access-Control-Allow-Credentials': 'true'
    })
    return res.end(
      JSON.stringify({
        code: 200,
        data: 'done'
      })
    )
  }

  res.statusCode = 404
  res.end()
}

https
  .createServer(
    {
      key: fs.readFileSync(path.resolve(process.cwd(), './src/cert/key.pem')),
      cert: fs.readFileSync(path.resolve(process.cwd(), './src/cert/cert.pem'))
    },
    handler
  )
  .listen(PORT, () =>
    console.info(`[INFO]: Server is running at https:localhost:${PORT}`)
  )
