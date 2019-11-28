import https from 'https'
import http from 'http'
import fs from 'fs'
import path from 'path'

const PORT = process.env.PORT || 5000
const handler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  })
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    const rs = fs.createReadStream(
      path.resolve(process.cwd(), './src/public/index.html')
    )
    rs.pipe(res)
    rs.on('end', () => res.end())
  }
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
