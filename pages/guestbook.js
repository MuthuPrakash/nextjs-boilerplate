import 'isomorphic-fetch'
import Link from 'next/link'


const Guestbook = ({ posts }) => {
  return (
    <>
    <div className="App">

    <div className="App-header">
        <h1>Remedy Health Media App</h1>
    </div>

    <div className="guestbookData">
    <h2>Guestbook Data</h2>
        {posts && posts.length ? (
        <div>
          {posts.map((result, i) => {
            return (
              <div className="panel panel-default" key={i + 1}>
              <div className="postTitle">{result.name}</div>
              <br />
              <div className="postMessage">{result.message}</div>
              </div>
            ) 
            })}
        </div>
        ) : <div>No posts Yet.</div>
        }
        
        <div>
            <Link href="/" >
            <a style={{ fontSize: 20 }}>Enter Guestbook Data</a>
        </Link>
        </div>
    </div>
    
    <style jsx>{`
              body {margin: 0;padding: 0;font-family: sans-serif;}
              
          .guestbookData {
              width: 500px;
              margin: auto;
          }

          .App {
              text-align: center;
          }
          .App-header {
              background-color: #222;
              height: 115px;
              padding: 20px;
              color: white;
          }
          
          .App-intro {
              font-size: large;
          }
          


          h2{
              font-size: 30px;
              margin-top: 20px;
              margin-bottom: 10px;
              font-family: inherit;
              font-weight: bolder;
              line-height: 1.1;
              color: inherit;
              display: block;
              
          }

          .postTitle{
              font-weight:bold;
              font-size:20px;
          }
          .postMessage{
            font-style:italic;
          }
          *, :after, :before {
              box-sizing: border-box;
          }
          .panel {
              box-shadow: 0 1px 2px rgba(0,0,0,.05);
              margin-bottom: 20px;
              background-color: #fff;
              border: 1px solid transparent;
              border-radius: 4px;
          }
          .panel-default {
              border-color: #ddd;
          }
          
          .form-group {
              margin-bottom: 15px;
          }

          label {
              display: inline-block;
              max-width: 100%;
              margin-bottom: 5px;
              font-weight: 700;
          }

          .postMessage{
            overflow-wrap: break-word;
            padding: 0px 10px 10px 10px;
          }

          `}
          </style>

    </div>
      
    </>
  )
}

Guestbook.getInitialProps = async () => {
  const data = await fetch('http://localhost:3000/api/guestbook')
  const dataJson = await data.json()
  const { posts } = dataJson
  return {
    posts
  }
}

export default Guestbook
