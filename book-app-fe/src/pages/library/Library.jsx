

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';

export default function Library() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const { id } = useParams();
  

  useEffect(() => {
    const fetchUserLibrary = async () => {
      try {
        const response = await axios.get(`/user/library?id=${id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('response', response);
        setBooks(response.data.books);
      } catch (err) {
        console.error(err);
        setError("Failed to load books.");
      }
    };

    fetchUserLibrary();
  }, [id]); 

  return (
    <>

    <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  gap: '10px',}}>My Books</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '10px', paddingBottom: '200px' }}>
        {books && books.map(book => (
          <div key={book._id}>
            <Card style={{ width: '18rem', maxHeight: '100%' }}>
              <Link to={`/book/show/${book._id}`}>
                <img src={book.image[0]} alt={`Cover for ${book.title}`} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
              </Link>
              <div className="card-body" style={{ maxHeight: '50px' }}>
                <h5 className="card-title">{book.title}</h5>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

