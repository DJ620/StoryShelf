import React, { useState, useEffect } from "react";
import token from "../utils/token";
import api from "../utils/api";

const BookInfo = ({ book, reloadSearch }) => {
  const [description, setDescription] = useState(book.description);
  const [isInCollection, setIsInCollection] = useState(false);
  const [mongoBookId, setMongoBookId] = useState(null);

  useEffect(() => {
    if (book.description?.split(" ").length > 75) {
      let newDescription = book.description.split(" ");
      newDescription.splice(75);
      setDescription(newDescription.join(" ") + "...");
    }
    api.getUserBooks(token.getId()).then((books) => {
      let googleIds = books.data.books.map((book) => book.googleId);
      if (googleIds.includes(book.id)) {
        setIsInCollection(true);
        books.data.books.forEach((mongoBook) => {
          if (mongoBook.googleId === book.id) {
            setMongoBookId(mongoBook._id);
          }
        });
      }
    });
  }, [book]);

  const addBook = () => {
    const bookData = {
      title: book.title,
      author: book.authors ? book.authors[0] : null,
      image: book.imageLinks
        ? book.imageLinks.smallThumbnail
        : "https://bit.ly/31OKFsp",
      description: book.description
        ? book.description
        : "No description on file",
      infoLink: book.infoLink,
      googleId: book.id,
      numPages: book.pageCount,
    };
    api
      .addBook({ bookData, userId: token.getId() })
      .then((res) => reloadSearch());
  };

  const styles = {
    image: {
      boxShadow: "2px 2px 20px -5px black",
    },
  };

  return (
    <div className="card shadow p-3 mb-3">
      <div className="row my-4 align-items-center">
        <div className="col-12 col-md-4">
          <h2 className="text-center">{book.title}</h2>
          {book.authors ? (
            <h4 className="text-center">{book.authors[0]}</h4>
          ) : null}
          <div className="d-flex justify-content-center">
            <a href={book.infoLink} target="_blank">
              <img
                src={
                  book.imageLinks
                    ? book.imageLinks.smallThumbnail
                    : "https://bit.ly/31OKFsp"
                }
                alt="book image"
                style={styles.image}
              />
            </a>
          </div>
        </div>
        <div className="col-12 col-md-8 mt-3 mt-md-0">
          <p>{book.description ? description : "No description on file"}</p>
          <p className="text-center text-md-left">
            Number of pages: {book.pageCount}
          </p>
        </div>
      </div>
      <div className="row d-flex justify-content-center justify-content-md-end mr-md-3">
        {isInCollection ? (
          <a href={`/${mongoBookId}`}><button
            className="btn btn-lg btn-dark mt-md-n5"
          >
            Go to progress page
          </button></a>
        ) : (
          <button className="btn btn-lg btn-maroon mt-md-n5" onClick={addBook}>
            Add to collection
          </button>
        )}
      </div>
    </div>
  );
};

export default BookInfo;
