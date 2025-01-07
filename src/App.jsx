import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import data from './data/data'


function App() {
  const setObject = {
    id: 0, title: '', content: '', image: '', category: ''
  }
  const [post, setPost] = useState(data)
  const [newPost, setNewPost] = useState(setObject)
  //per aggiungere più campi inserire un nuovo state

  const sendPost = event => {
    event.preventDefault()
    //aggiungere il nuovo parametro ad un campo dentro l'oggetto sottostante
    setPost([...post, { id: Date.now(), title: newPost.title, content: newPost.content, image: newPost.image, category: newPost.category, published: newPost.published }])
    setNewPost(setObject)
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

          {/* Select per la categoria */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={newPost.category}
              onChange={handleInputData}
            >
              <option value="">Select a category</option>
              <option value="tech">Tech</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
            </select>
          </div>

          {/* Checkbox per stato di pubblicazione */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="published"
              id="published"
              className="form-check-input"
              checked={newPost.published}
              onChange={(e) => handleInputData({
                target: { name: 'published', value: e.target.checked }
              })}
            />
            <label htmlFor="published" className="form-check-label">Publish this post</label>
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
                  <p className="card-text">
                    <small className="text-muted">Category: {curPost.category}</small>
                  </p>
                  <p className="card-text">
                    <small className={`text-${curPost.published ? 'success' : 'danger'}`}>
                      {curPost.published ? 'Published' : 'Draft'}
                    </small>
                  </p>
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
