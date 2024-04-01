import React, { useState, useEffect } from "react";
import BookPreview from "../../components/BookPreview";
import api from "../../utils/api";
import token from "../../utils/token";
import "./BookCollection.css";
import { Tab, Tabs } from "react-bootstrap";

const BookCollection = () => {
  const [books, setBooks] = useState([]);
  const [current, setCurrent] = useState([]);
  const [future, setFuture] = useState([]);
  const [done, setDone] = useState([]);

  const getCollection = () => {
    api.getUserBooks(token.getId()).then((res) => {
      console.log(res);
      setBooks(res.data.books);
    });
  };

  useEffect(() => {
    getCollection();
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      setCurrent(
        books
          .filter((book) => book.status === "currently reading")
          .sort((a, b) => a.title.localeCompare(b.title))
      );
      setFuture(
        books
          .filter((book) => book.status === "want to read")
          .sort((a, b) => a.title.localeCompare(b.title))
      );
      setDone(
        books
          .filter((book) => book.status === "done reading")
          .sort((a, b) => a.title.localeCompare(b.title))
      );
    }
  }, [books]);

  useEffect(() => {
    done.forEach(book => console.log(book.sessions))
  }, [done])

  const styles = {
    top: {
      textShadow: "2px 2px 40px black",
    },
    card: {
      height: "80vh",
      overflowY: "scroll",
      position: "relative",
    },
    cardSm: {
      overflowY: "scroll",
      position: "relative",
      height: "78vh",
      width: "80vw"
    },
    header: {
      zIndex: "4",
      backgroundColor: "rgba(213, 213, 213, 0.899)",
    },
  };

  return (
    <div className="container-fluid pt-3">
      <h1 className="text-center" style={styles.top}>
        Book Collection
      </h1>
      {books.length > 0 ? (
        <div>
          <div className="row d-flex justify-content-center mt-3 collection-bg">
            {current.length > 0 ? (
              <div className="col card shadow mx-2" style={styles.card}>
                <div className="row d-flex justify-content-center mb-2">
                  <h5
                    className="text-center card-header shadow mt-2 position-fixed"
                    style={styles.header}
                  >
                    Currently reading
                  </h5>
                </div>
                <div className="row d-flex justify-content-center my-5">
                  {current.map((book) => (
                    <BookPreview key={book._id} book={book} current={true} />
                  ))}
                </div>
              </div>
            ) : null}
            {future.length > 0 ? (
              <div className="col card shadow mx-2" style={styles.card}>
                <div className="row d-flex justify-content-center mb-2">
                  <h5
                    className="text-center card-header shadow mb-n2 mt-2 position-fixed"
                    style={styles.header}
                  >
                    Books I plan to read
                  </h5>
                </div>
                <div className="row d-flex justify-content-center my-5">
                  {future.map((book) => (
                    <BookPreview key={book._id} book={book} />
                  ))}
                </div>
              </div>
            ) : null}
            {done.length > 0 ? (
              <div className="col card shadow mx-2" style={styles.card}>
                <div className="row d-flex justify-content-center mb-2">
                  <h5
                    className="text-center card-header shadow mb-n2 mt-2 position-fixed"
                    style={styles.header}
                  >
                    Books I've read
                  </h5>
                </div>
                <div className="row d-flex justify-content-center my-5">
                  {done.map((book) => (
                    <BookPreview key={book._id} book={book} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="collection-sm row d-flex justify-content-center">
            <Tabs>
              <Tab
                eventKey="current"
                title="Current"
                disabled={current.length > 0 ? false : true}
              >
                {/* <div className="row"> */}
                {current.length > 0 ? (
              <div className="col card shadow" style={styles.cardSm}>
                {/* <div className="row d-flex justify-content-center mb-2">
                  <h5
                    className="text-center card-header shadow mt-2 position-fixed"
                    style={styles.header}
                  >
                    Currently reading
                  </h5>
                </div> */}
                <div className="row d-flex justify-content-center mb-5">
                  {current.map((book) => (
                    <BookPreview key={book._id} book={book} current={true} />
                  ))}
                </div>
              </div>
            ) : null}
            {/* </div> */}
              </Tab>
              <Tab
                eventKey="future"
                title="Future"
                disabled={future.length > 0 ? false : true}
              >
                {future.length > 0 ? (
              <div className="col card shadow" style={styles.cardSm}>
                {/* <div className="row d-flex justify-content-center mb-2">
                  <h5
                    className="text-center card-header shadow mb-n2 mt-2 position-fixed"
                    style={styles.header}
                  >
                    Books I plan to read
                  </h5>
                </div> */}
                <div className="row d-flex justify-content-center mb-5">
                  {future.map((book) => (
                    <BookPreview key={book._id} book={book} />
                  ))}
                </div>
              </div>
            ) : null}
              </Tab>
              <Tab
                eventKey="done"
                title="Done"
                disabled={done.length > 0 ? false : true}
              >
                {done.length > 0 ? (
              <div className="col card shadow" style={styles.cardSm}>
                {/* <div className="row d-flex justify-content-center mb-2">
                  <h5
                    className="text-center card-header shadow mb-n2 mt-2 position-fixed"
                    style={styles.header}
                  >
                    Books I've read
                  </h5>
                </div> */}
                <div className="row d-flex justify-content-center mb-5">
                  {done.map((book) => (
                    <BookPreview key={book._id} book={book} />
                  ))}
                </div>
              </div>
            ) : null}
              </Tab>
            </Tabs>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-center my-3">No books added to your collection</p>
          <div className="d-flex justify-content-center">
            <a href="/search">
              <button className="btn btn-lg btn-info">Search for books</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCollection;
