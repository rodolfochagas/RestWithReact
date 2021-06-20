import React, { useEffect, useState } from 'react';
import './styles.css';
import logoImage from '../../assets/logo.svg'
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewBook() {
    const [id, setId] = useState(null);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [launchDate, setLaunchDate] = useState(''); 
    const [price, setPrice] = useState('');

    const history = useHistory();
    const { bookId } = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const titleAddOrUpdate = bookId === '0' ? 'Add' : 'Update';

    const authorization = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }

    useEffect(() => {
        if(bookId === '0') return;
        loadBook();
    }, bookId)

    async function loadBook() {
        try {
            const response = await api.get(`api/Book/v1/${bookId}`, authorization);

            const formattedDate = response.data.launchDate.split('T',10)[0];

            setId(response.data.id);
            setAuthor(response.data.author);
            setTitle(response.data.title);
            setLaunchDate(formattedDate);
            setPrice(response.data.price);
        } catch (error) {
            alert('Error recovering book! Please try again');
            history.push('/books');
        }
    }

    async function saveOrUpdateBook(event) {
        event.preventDefault();

        const data = {
            author,
            title,
            launchDate,
            price
        }
        try {
            if (bookId === '0') {
                await api.post('api/Book/v1', data, authorization);
            } else {
                data.id = id;
                await api.put('api/Book/v1', data, authorization);
            }
            history.push('/books');

        } catch (error) {
            alert('Could not record this book!')
        }
    }

    return (
        <div className="new-book-container">
            <div className="content">
                <section className="form">
                    <img src={logoImage} alt="logo"/>
                    <h1>{titleAddOrUpdate} Book</h1>
                    <p>Enter the book information and click on '{titleAddOrUpdate}'!</p>
                    <Link className="back-link" to="/books">
                        <FiArrowLeft size={16} color="#251FC5"/>
                        Back to books
                    </Link>
                </section>
                <form onSubmit={saveOrUpdateBook}>
                    <input placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input placeholder="Author"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                    <input type="date"
                        value={launchDate}
                        onChange={e => setLaunchDate(e.target.value)}
                    />
                    <input placeholder="Price"
                        value={price} 
                        onChange={e => setPrice(e.target.value)}
                    />       
                    <button className="button" type="submit">{titleAddOrUpdate}</button>
                </form>
            </div>
        </div>
    );
}