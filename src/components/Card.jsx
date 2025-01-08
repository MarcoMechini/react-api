export default function Card({ post, apiUrl, deletePost }) {
    return (
        <div key={post.id} className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                {post.image && (
                    <img src={`${apiUrl}/${post.image}`} alt={post.image} className="img-fluid mb-3" />
                )}
                <p className="card-text">{post.content}</p>
                <button
                    onClick={() => deletePost(post.id)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}