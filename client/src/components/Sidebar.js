import React, { useState, useEffect } from "react";
import BookPreview from "../components/BookPreview";
import api from "../utils/api";
import token from "../utils/token";
import { ButtonGroup, ToggleButton, ListGroup } from "react-bootstrap";

const Sidebar = ({ reload, currentId }) => {
  const [books, setBooks] = useState([]);
  const [current, setCurrent] = useState([]);
  const [future, setFuture] = useState([]);
  const [done, setDone] = useState([]);
  const [view, setView] = useState([]);
  const [booksToView, setBooksToView] = useState("current");

  useEffect(() => {
    api.getUserBooks(token.getId()).then((res) => {
      setBooks(res.data.books);
    });
  }, [reload]);

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
    if (booksToView === "current" && current.length > 0) {
      return setView(current);
    } else if (booksToView === "future" && future.length > 0) {
      return setView(future);
    } else if (booksToView === "done" && done.length > 0) {
      return setView(done);
    } else {
      if (current.length > 0) {
        setBooksToView("current");
      } else if (future.length > 0) {
        setBooksToView("future");
      } else {
        setBooksToView("done");
      }
    }
  }, [current, future, done]);

  useEffect(() => {
    console.log("changed");
    switch (booksToView) {
      case "current":
        return setView(current);
      case "future":
        return setView(future);
      case "done":
        return setView(done);
      default:
        return;
    }
  }, [booksToView]);

  const handleView = (status) => {
    switch (status) {
      case "Current":
        if (current.length > 0) {
          setBooksToView("current");
        }
        break;
      case "Future":
        if (future.length > 0) {
          setBooksToView("future");
        }
        break;
      default:
        if (done.length > 0) {
          setBooksToView("done");
        }
    }
  };

  const styles = {
    sidebar: {
      background: "white",
      position: "fixed",
      top: "56px",
      left: "0",
      height: "100%",
      overflowY: "scroll",
      boxShadow: "1px 2px 10px black",
      maxWidth: "200px",
    },
    buttons: {
      position: "fixed",
      right: "0",
      left: "0",
      marginLeft: "auto",
      marginRight: "auto",
      width: "98.5%",
      zIndex: "3"
    },
    books: {
      margin: "0 auto",
      marginTop: "40px",
      marginBottom: "80px",
    },
  };

  return (
    <div style={styles.sidebar}>
      <div className="mt-1" style={styles.buttons}>
        <ButtonGroup size="sm" toggle>
          <ToggleButton
            type="radio"
            checked={view === current}
            className={current.length === 0 ? "toggle disabled" : "toggle"}
            onClick={() => handleView("Current")}
          >
            Current
          </ToggleButton>
          <ToggleButton
            type="radio"
            checked={view === future}
            className={future.length === 0 ? "toggle disabled" : "toggle"}
            onClick={() => handleView("Future")}
          >
            Future
          </ToggleButton>
          <ToggleButton
            type="radio"
            checked={view === done}
            className={done.length === 0 ? "toggle disabled" : "toggle"}
            onClick={() => handleView("Done")}
          >
            Done
          </ToggleButton>
        </ButtonGroup>
      </div>
      <ListGroup variant="flush" style={styles.books}>
        {view.map((book) => (
          <ListGroup.Item
            className={currentId === book._id ? "active" : null}
            key={book._id}
          >
            <div className="row d-flex justify-content-center mt-n4">
              <BookPreview book={book} />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Sidebar;
