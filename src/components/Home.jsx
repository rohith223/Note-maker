import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notemaker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CheckLoginComponent } from '../Service/SecurityService';
import Popup from './Popup'; // Import the Popup component
import { env } from '../env';

const NoteMaker = () => {
  const [dataFromBackend, setDataFromBackend] = useState([]);
  const [newCard, setNewCard] = useState({ title: '', note: '', data: '' });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [noteId, setNoteId] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const characterLimit = 200;
  const [noteText, setNoteText] = useState('');
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let email = sessionStorage.getItem("email");
      const response = await axios.get(`${env.REACT_APP_API}/notes/getNoteByEmail/${email}`);

      if (response.status === 400) {
        setDataFromBackend([]);
      } else {
        setDataFromBackend(response.data);
      }
    } catch (error) {
      console.error("Error fetching data from the backend:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Check if adding more characters would exceed the character limit
    if (characterLimit - value.length >= 0) {
      setNewCard({
        ...newCard,
        [name]: value,
      });
      setNoteText(value); // Update the noteText state
    }
  };

  const handleAddCard = async () => {
    try {
      let createNote = await axios.post(`${env.REACT_APP_API}/notes/createNote`, {
        note: newCard.note,
        title: newCard.title,
        category: newCard.data,
        userEmail: sessionStorage.getItem("email")
      });

      fetchData();
      setNewCard({ title: '', note: '', data: '' });
    } catch (error) {
      console.error("Error creating a new card:", error);
    }
  };

  const handleEditCard = (note_id) => {
    setNoteId(note_id);
    const cardToEdit = dataFromBackend.find((item) => item.id === note_id);
    setSelectedCard(cardToEdit);
    setShowPopup(true);
  };

  const handleSaveCard = async (editedCard) => {
    try {
      // Update the card on the server (if needed)
     

      const updatedData = dataFromBackend.map((item) =>
        item.id === editedCard.id ? editedCard : item
      );
      setDataFromBackend(updatedData);
      setShowPopup(false);
    } catch (error) {
      console.error("Error saving the card:", error);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      console.log("Delete icon clicked for ID:", id);
      // Perform the soft delete on the server
      await axios.post(`${env.REACT_APP_API}/notes/deleteNote`, { id });

      // Update the deleted flag locally
      const updatedData = dataFromBackend.map((item) => {
        if (item.id === id) {
          return { ...item, deleted: true };
        }
        return item;
      });

      setDataFromBackend(updatedData);
    } catch (error) {
      console.error("Error soft deleting the card:", error);
    }
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleTitleFilterChange = (event) => {
    setTitleFilter(event.target.value);
  };

  const handleReadMoreClick = (noteId) => {
    setExpandedCardId(noteId);
  };

  return (
    <>
      <CheckLoginComponent />
      <div className='main1'>
        <h1 className='head'>Note Maker</h1>
        {/* Title Filter Input */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Filter by Title"
            value={titleFilter}
            onChange={handleTitleFilterChange}
          />
        </div>

        {/* Category Filter Input */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Filter by Category"
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
          />
        </div>

        <div className="card-form">
          <label className='create'>Create your Own Notes Buddy!!</label>
          <br />
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={newCard.title}
            onChange={handleInputChange}
          />
          <textarea
            placeholder="Note"
            name="note"
            value={newCard.note}
            onChange={handleInputChange}
          ></textarea><small>{characterLimit - newCard.note.length} words Remaining</small><br />
          <input
            type="text"
            placeholder="Category"
            name="data"
            value={newCard.data}
            onChange={handleInputChange}
          />

          <button onClick={handleAddCard}>Add Card</button>
        </div>

        <div className="card-list">
          {dataFromBackend.length !== 0 ? dataFromBackend
            .filter((item) =>
              (categoryFilter ? item.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true) &&
              (titleFilter ? item.title.toLowerCase().includes(titleFilter.toLowerCase()) : true) &&
              !item.deleted // Exclude deleted items
            )
            .map((item) => (
              <div key={item.id} className={`card ${item.id === expandedCardId ? 'expanded' : ''}`}>
                <h2 className='title'>{item.title}</h2>
                <p className="note-text">{item.note}</p>
                
                <p className="note-text">Category: {item.category}</p>
                <div className="card-icons">
                  <span>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => handleEditCard(item.id)}
                      className="edit-icon"
                    />
                  </span>
                  <span>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDeleteCard(item.id)}
                      className="delete-icon"
                    />
                  </span>
                </div>
              </div>
            )) : ""}
        </div>

        {showPopup && (
          <Popup
            noteId={noteId}
            fetchData={fetchData}
            cardData={selectedCard}
            onSave={handleSaveCard}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </>
  );
};

export default NoteMaker;
