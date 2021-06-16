import React from 'react';
import './styles.css';
import logoImage from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Books() {
    return (
        <div className="books-container">
            <header>
                <img src={logoImage} alt="logo"/>
                <span>Welcome, <strong>Fulano</strong>!</span>
                <Link className="button" to="books/new">Add new book</Link>
                <button type="button">
                    <FiPower size={18} color="#251FC5"></FiPower>
                </button>
            </header>

            <h1>Registered Books</h1>
            <ul>
                <li>
                    <strong>Title:</strong>
                    <p>Docker Deep Dive</p>
                    <strong>Author:</strong>
                    <p>Nigel Poulton</p>
                    <strong>Price:</strong>
                    <p>R$ 47,90</p>
                    <strong>Release Date:</strong>
                    <p>12/07/2017</p>

                    <button type="button">
                        <FiEdit size={20} color="#251FC5"></FiEdit>
                    </button>

                    <button type="button">
                        <FiTrash2 size={20} color="#251FC5"></FiTrash2>
                    </button>
                </li>

                <li>
                    <strong>Title:</strong>
                    <p>Docker Deep Dive</p>
                    <strong>Author:</strong>
                    <p>Nigel Poulton</p>
                    <strong>Price:</strong>
                    <p>R$ 47,90</p>
                    <strong>Release Date:</strong>
                    <p>12/07/2017</p>

                    <button type="button">
                        <FiEdit size={20} color="#251FC5"></FiEdit>
                    </button>
                    
                    <button type="button">
                        <FiTrash2 size={20} color="#251FC5"></FiTrash2>
                    </button>
                </li>
                <li>
                    <strong>Title:</strong>
                    <p>Docker Deep Dive</p>
                    <strong>Author:</strong>
                    <p>Nigel Poulton</p>
                    <strong>Price:</strong>
                    <p>R$ 47,90</p>
                    <strong>Release Date:</strong>
                    <p>12/07/2017</p>

                    <button type="button">
                        <FiEdit size={20} color="#251FC5"></FiEdit>
                    </button>
                    
                    <button type="button">
                        <FiTrash2 size={20} color="#251FC5"></FiTrash2>
                    </button>
                </li>
                <li>
                    <strong>Title:</strong>
                    <p>Docker Deep Dive</p>
                    <strong>Author:</strong>
                    <p>Nigel Poulton</p>
                    <strong>Price:</strong>
                    <p>R$ 47,90</p>
                    <strong>Release Date:</strong>
                    <p>12/07/2017</p>

                    <button type="button">
                        <FiEdit size={20} color="#251FC5"></FiEdit>
                    </button>
                    
                    <button type="button">
                        <FiTrash2 size={20} color="#251FC5"></FiTrash2>
                    </button>
                </li>
            </ul>
        </div>
    )
}