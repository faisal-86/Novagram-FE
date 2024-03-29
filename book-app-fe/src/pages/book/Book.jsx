import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
export default function BookCard(props) {

  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(props.isAdmin); // Assuming you have a state for admin status
  useEffect(() => {
    axios.get('/book/index')
      .then(response => {
        setBooks(response.data.books);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);




  
  return (
    <>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingBottom: '200px' }}>
        {books.map(book => (
          <div key={book._id} style={{ width: '18rem', maxHeight: '100%' }}>
            <Card style={{ width: '100%', maxHeight: '100%' }}>
              <Link to={`/book/show/${book._id}`}>
                <img src={book.image[0]} alt={`Cover for ${book.title}`} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
              </Link>
              <div className="card-body" style={{ maxHeight: '50px' }}>
                <h5 className="card-title">{book.title}</h5>
              </div>
            </Card>
            
          </div>
          
        ))}
      </div>
      {isAdmin && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link className="btn btn-success" to="add">Add Book</Link>
        </div>
       
      )}
    </>
  );
}
