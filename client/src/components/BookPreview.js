import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import api from "../utils/api";

const BookPreview = ({ book, current = false }) => {
  const history = useHistory();

  const [title, setTitle] = useState(book.title);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    let bookTitle = book.title.split(" ");
    if (bookTitle.length > 4) {
      bookTitle.splice(4);
      setTitle(bookTitle.join(" ") + "...");
    };
    if (current) {
      api.getSingleBook(book._id).then(res => {
      if (res.data.sessions.length > 0) {
        if (res.data.sessions[res.data.sessions.length - 1].percent) {
          setProgress(res.data.sessions[res.data.sessions.length - 1].percent);
        };
      };
    });}
  }, [book]);

  const goToBook = () => {
    history.push("/" + book._id);
  };

  const styles = {
    book: {
      cursor: "pointer",
      marginRight: "auto",
      marginLeft: "auto",
      width: "150px",
      height: "240px",
      position: "relative"
    },
    title: {
      textShadow: "2px 2px 20px black",
    },
    image: {
      boxShadow: "2px 2px 20px -5px black",
      height: "192px",
      width: "auto",
      position: "absolute",
      bottom: "0"
    },
    progress: {
      width: "150px",
      margin: "0 auto"
    }
  };

  return (
    <div>
    <div className="mx-4 my-3" style={styles.book} onClick={goToBook}>
      <p className="text-center" style={styles.title}>
        {title}
      </p>
      <div className="row d-flex justify-content-center">
        <img src={book.image} alt="book cover" style={styles.image} />
      </div>
    </div>
    {progress ? <ProgressBar now={progress} label={`${progress}%`} style={styles.progress}/> : null}
    </div>
  );
};

export default BookPreview;
