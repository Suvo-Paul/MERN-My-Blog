import React from 'react'
import { formatISO9075 } from "date-fns"
import { Link } from 'react-router-dom';

function Post({ _id, title, summary, cover, content, createdAt, author }) {
    // console.log("author", author);

    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={`http://localhost:5000/${cover}`} alt="img" />
                </Link>
            </div>

            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <a className="author">
                        {author?.username || 'Unknown Author'}
                    </a>
                    <time>{formatISO9075(new Date(createdAt))}</time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    )
}

export default Post;