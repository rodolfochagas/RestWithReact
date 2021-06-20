import React, { useEffect, useState } from 'react';
import './styles.css';
import logoImage from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Books() {

    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);

    const userName = localStorage.getItem('userName');
    const accessToken = localStorage.getItem('accessToken');
    const authorization = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };
    const history = useHistory();

    useEffect(() => {
        fetchMoreBooks();
    }, [accessToken]);

    async function fetchMoreBooks() {
        const response = await api.get(`api/Book/v1/asc/4/${page}`, authorization);
        setBooks([...books, ...response.data.list]);
        setPage(page + 1);
    }

    async function deleteBook(id) {
        try {
            await api.delete(`api/Book/v1/${id}`, authorization);
            setBooks(books.filter(book => book.id !== id))

        } catch (error) {
            alert("Delete failed! Please try again.");
        }
    }

    async function logout() {
        try {
            await api.get('api/auth/v1/revoke', authorization);

            history.push('/');
            localStorage.clear();
            
        } catch (error) {
            alert("Logout failed! Please try again.")
        }
    }

    function editBook(id) {
        try {
            history.push(`/book/new/${id}`);
        } catch (error) {
            alert("Edit failed! Please try again.");
        }
    }

    return (
        <div className="books-container">
            <header>
                <img src={logoImage} alt="logo"/>
                <span>Welcome, <strong>{userName}</strong>!</span>
                <Link className="button" to="book/new/0">Add new book</Link>
                <button type="button">
                    <FiPower size={18} color="#251FC5" onClick={logout}></FiPower>
                </button>
            </header>

            <h1>Registered Books</h1>
            <ul>
                {books.map(book => {
                    return (
                        <li key={book.id}>
                            <strong>Title:</strong>
                            <p>{book.title}</p>
                            <strong>Author:</strong>
                            <p>{book.author}</p>
                            <strong>Price:</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                            <strong>Release Date:</strong>
                            <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>

                            <button type="button">
                                <FiEdit size={20} color="#251FC5" onClick={() => editBook(book.id)}></FiEdit>
                            </button>

                            <button type="button" onClick={() => deleteBook(book.id)}>
                                <FiTrash2 size={20} color="#251FC5"></FiTrash2>
                            </button>
                        </li>
                    );
                })}
            </ul>
            <button className="button" type="button" onClick={fetchMoreBooks}>
                Load more
            </button>
        </div>
    )
}