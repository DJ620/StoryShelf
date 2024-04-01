import React, { useState, useEffect } from "react";
import api from "../utils/api";
import BookInfo from "../components/BookInfo";
import google from "../images/google.png";

const Search = () => {
  const [title, setTitle] = useState("");
  const [currentSearch, setCurrentSearch] = useState(null);
  const [books, setBooks] = useState(null);
  const [paginate, setPaginate] = useState(null);
  const [searchPage, setSearchPage] = useState(0);

  const search = async (term) => {
    let search = term.split(" ").join("-");
    let data = await api.getBooks(search);
    let bookInfo = data.map((info) => info.volumeInfo);
    bookInfo.forEach((book, i) => {
      book.id = data[i].id;
    });
    // setBooks(bookInfo);
    const pagedBooks = [];
    let x = 0;
    while (x < bookInfo.length) {
      let page = bookInfo.slice(x, x + 10);
      pagedBooks.push(page);
      x += 10;
    }
    console.log(pagedBooks);
    setBooks(pagedBooks);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    search(title);
    setCurrentSearch(title);
    setTitle("");
  };

  const reloadSearch = async () => {
    search(currentSearch);
  };

  const handlePaginate = (i) => {
    setSearchPage(i);
    window.scrollTo(0, 0);
  };

  const styles = {
    image: {
      transform: "scale(.4)",
      marginTop: "-40px",
    },
    paginate: { 
      cursor: "pointer", 
      color: "blue", 
      border: "1px solid black",
      marginLeft: ".5px",
      backgroundColor: "white" 
    },
  };

  return (
    <div className="container pt-4">
      <form
        className="row d-flex justify-content-center align-items-center mb-4"
        onSubmit={handleSearch}
      >
        <label className="pt-2">Title/Author: </label>
        <input
          type="text"
          className="ml-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-dark ml-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
      <div className="row d-flex justify-content-center">
        <img src={google} alt="google logo" style={styles.image} />
      </div>
      {books
        ? books[searchPage].map((book, i) => (
            <BookInfo key={i} book={book} reloadSearch={reloadSearch} />
          ))
        : null}
      <div className="row d-flex justify-content-center mb-5 mt-4">
        {books
          ? books.map((bookSet, i) => (
              <p
                className={
                  "px-2 " + (searchPage === i ? "font-weight-bolder" : null)
                }
                style={styles.paginate}
                onClick={() => handlePaginate(i)}
              >
                {i + 1}
              </p>
            ))
          : null}
      </div>
    </div>
  );
};

export default Search;
