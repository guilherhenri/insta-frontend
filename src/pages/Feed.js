import React, { Component } from 'react';
import { FiMoreHorizontal, FiSend } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import io from 'socket.io-client';

import api from '../services/api';

import './Feed.css';

class Feed extends Component {
  state = {
    feed: [],
  };

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get('/posts');

    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const socket = io('http://localhost:3333');

    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post => 
          post._id === likedPost._id ? likedPost : post  
        )
      })
    });
  }

  handleLike = async id => {
    await api.post(`/posts/${id}/like`);
  }

  render() {
    return (
      <section id="post-list">
        {this.state.feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>

              <FiMoreHorizontal size={23} color="#000" />
            </header>

            <img src={`http://localhost:3333/files/${post.image}`} alt={post.description} />
            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <AiOutlineHeart size={25} color="#000" />
                </button>
                <FaRegComment size={23} color="#000" />
                <FiSend size={23} color="#000" />
              </div>

              <strong>{post.likes} curtidas</strong>

              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    )
  }
}

export default Feed;