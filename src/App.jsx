import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const apiUrl = 'http://localhost:3000'

function App() {
  const setObject = {
    title: '', content: '', image: '',
  }
  const [post, setPost] = useState([])
  const [newPost, setNewPost] = useState(setObject)
  //per aggiungere più campi inserire un nuovo state

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    axios.get(`${apiUrl}/posts`).then(response => {
      console.log(response.data);
      setPost(response.data)
    })
  }


  const sendPost = event => {
    event.preventDefault()

    axios.post(`${apiUrl}/posts`, newPost).then(response => {

      //aggiungere il nuovo parametro ad un campo dentro l'oggetto sottostante
      setPost([...post, { title: newPost.title, content: newPost.content, image: newPost.image }])
      setNewPost(setObject)
    })
  }

  const deletePost = (postId) => {
    setPost(post.filter(post => post.id !== postId))
  }

  const handleInputData = e => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    })

  }

  return (
    <>
      <div className="container my-4">
        <form onSubmit={sendPost}>
          {/* Input per il titolo */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Post Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              value={newPost.title}
              onChange={handleInputData}
            />
          </div>

          {/* Input per il contenuto */}
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Post Content</label>
            <textarea
              name="content"
              id="content"
              className="form-control"
              rows="4"
              value={newPost.content}
              onChange={handleInputData}
            ></textarea>
          </div>

          {/* Input per immagine */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Post Image URL</label>
            <input
              type="text"
              name="image"
              id="image"
              className="form-control"
              value={newPost.image}
              onChange={handleInputData}
            />
          </div>

          {/* Pulsante di invio */}
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        {/* Post visualizzati */}
        <div className="mt-4">
          {post.length !== 0 ? (
            post.map(curPost => (
              <div key={curPost.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{curPost.title}</h5>
                  {curPost.image && (
                    <img src={curPost.image} alt={curPost.image} className="img-fluid mb-3" />
                  )}
                  <p className="card-text">{curPost.content}</p>
                  <button
                    onClick={() => deletePost(curPost.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">Senza nulla</p>
          )}
        </div>
      </div>

    </>
  )
}

export default App
