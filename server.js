const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const posts = []

app.prepare().then(() => {
  const server = express()
  server.use(express.json())

  server.post('/api/guestbook', (req, res, next) => {
    // A POSTED REQUEST HERE
    const { body } = req

    const hasEmptyField = Object.values(body).filter(v => v.trim() === '')

    hasEmptyField.length > 0 ? res.status(400).end() 
    : posts.push(body)
      res.status(200).end()
    
  })

  server.get('/api/guestbook', (req, res, next) => {
    res.json({
      posts
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
