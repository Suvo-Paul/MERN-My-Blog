import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

function IndexPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/post").then((response) => {
            response.json().then(posts => {
                // console.log(posts);
                setPosts(posts)
            })
        })
    }, []);
    
    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}
        </>
    )
}

export default IndexPage;