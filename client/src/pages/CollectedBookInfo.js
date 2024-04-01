import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useHistory, useParams } from "react-router-dom";
import SessionModal from "../components/SessionModal";
import Session from "../components/Session/Session";
import QuoteModal from "../components/QuoteModal";
import Quote from "../components/Quote/Quote";
import SettingsModal from "../components/SettingsModal";
import Sidebar from "../components/Sidebar";
import DeleteModal from "../components/DeleteModal";
import { Tab, Tabs, Spinner } from "react-bootstrap";
 
const CollectedBookInfo = () => {
  const history = useHistory();
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [duration, setDuration] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [view, setView] = useState(false);
  const [done, setDone] = useState(false);
  const [reload, setReload] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFunction, setDeleteFunction] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleShowQuoteModal = () => setShowQuoteModal(true);
  const handleCloseQuoteModal = () => setShowQuoteModal(false);

  const handleShowSettings = () => setShowSettingsModal(true);
  const handleCloseSettings = () => setShowSettingsModal(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const hideDeleteModal = () => setShowDeleteModal(false);

  useEffect(() => {
    getBookInfo();
  }, [bookId]);

  const getBookInfo = () => {
    api.getSingleBook(bookId).then((res) => {
      setBook(res.data);
      setSessions(res.data.sessions.reverse());
      setQuotes(res.data.quotes);
      let totalDuration = { hours: 0, minutes: 0, seconds: 0 };
      res.data.sessions.forEach((session) => {
        totalDuration.hours += session.duration.hours;
        totalDuration.minutes += session.duration.minutes;
        totalDuration.seconds += session.duration.seconds;
      });
      if (totalDuration.seconds > 59) {
        let newMinutes = Math.floor(totalDuration.seconds / 60);
        totalDuration.minutes += newMinutes;
        totalDuration.seconds -= newMinutes * 60;
      }
      if (totalDuration.minutes > 59) {
        let newHours = Math.floor(totalDuration.minutes / 60);
        totalDuration.hours += newHours;
        totalDuration.minutes -= newHours * 60;
      }
      setDuration(totalDuration);
      if (res.data.status === "done reading") {
        setDone(true);
      } else {
        setDone(false);
      }
    });
  };

  useEffect(() => {
    if (sessions.length > 0) {
      if (sessions[0].percent == 100) {
        api.updateBook({
          bookId: book._id,
          dataToUpdate: { status: "done reading" },
        });
      } else if (sessions[0].percent > 0 && sessions[0].percent < 100) {
        if (book.status !== "currently reading") {
          api.updateBook({
            bookId: book._id,
            dataToUpdate: { status: "currently reading" },
          });
        }
      }
    }
  }, [sessions]);

  useEffect(() => {
    if (quotes.length === 0) {
      setView(false);
    }
  }, [quotes]);

  const addReadingSession = (session) => {
    api
      .addSession({
        session,
        bookId: book._id,
      })
      .then((res) => {
        if (sessions.length === 0) {
          api
            .updateBook({
              bookId: book._id,
              dataToUpdate: { status: "currently reading" },
            })
            .then((response) => {
              getBookInfo();
            });
        } else {
          getBookInfo();
        }
        setReload(!reload);
      });
  };

  const deleteBook = () => {
    api.deleteBook(book._id).then((result) => {
      history.push("/collection");
    });
    setReload(!reload);
    hideDeleteModal();
  };

  const handleDelete = (action) => {
    setDeleteFunction(() => action);
    handleShowDeleteModal();
  };

  if (!book || !duration) {
    return (
      <div className="row d-flex justify-content-center pt-5">
      <Spinner animation="border"/>
      </div>
      )
  }

  const styles = {
    page: {
      marginRight: "5vw",
    },
    delete: {
      zIndex: "5",
    },
    image: {
      boxShadow: "2px 2px 20px -5px black",
    },
    highlight: {
      backgroundColor: "yellow",
    },
    quote: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "white",
    },
  };

  return (
    <div className="mb-3 container">
      <SessionModal
        show={showModal}
        handleClose={handleClose}
        title={book.title}
        book={book}
        addReadingSession={addReadingSession}
      />
      <QuoteModal
        show={showQuoteModal}
        handleClose={handleCloseQuoteModal}
        book={book}
        getBookInfo={getBookInfo}
      />
      <SettingsModal
        show={showSettingsModal}
        handleClose={handleCloseSettings}
        book={book}
        getBookInfo={getBookInfo}
      />
      <DeleteModal
        show={showDeleteModal}
        close={hideDeleteModal}
        handleDelete={deleteFunction}
      />
      <div className="row d-flex justify-content-center">
        <div className="col-2 sidebar">
          <Sidebar reload={reload} currentId={bookId} />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="text-center mt-4">{book.title}</h1>
          <h2 className="text-center mt-2">{book.author}</h2>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-secondary mt-2"
              onClick={() => handleDelete(deleteBook)}
            >
              Delete book from collection
            </button>
          </div>
          <div className="row mt-4 mb-4 align-items-center">
            <div className="col-12 col-md-3">
              <div className="row d-flex justify-content-center justify-content-md-start">
                <a href={book.infoLink} target="_blank">
                  {" "}
                  <img src={book.image} alt="book cover" style={styles.image} />
                </a>
              </div>
              <div className="row d-flex justify-content-center justify-content-md-start">
                <button
                  className="btn btn-lg btn-dark mt-2 mb-2 mb-md-0 ml-1"
                  onClick={handleShowQuoteModal}
                >
                  Add quote
                </button>
              </div>
            </div>
            <div className="card shadow mb-3 col-12 col-md-9 text-center text-md-left">
              <h3 className="card-title">
                {done ? "Done reading!" : "Current progress:"}
                <span
                  className="cog fa fa-ellipsis-h float-right mt-1"
                  onClick={handleShowSettings}
                />
                <span
                  className="cog-lg float-right mt-1"
                  style={{fontSize: "16px"}}
                  onClick={handleShowSettings}
                >Settings</span>
              </h3>
              {sessions.length > 0 ? (
                <div>
                  {sessions[0].chapter ? (
                    <h5>
                      Chapters read:{" "}
                      <span style={styles.highlight}>
                        {sessions[0].chapter}
                      </span>
                    </h5>
                  ) : null}
                  {sessions[0].page ? (
                    <h5>
                      Pages read:{" "}
                      <span style={styles.highlight}>
                        {sessions[0].page}{" "}
                        {book.numPages > 0 ? `/ ${book.numPages}` : null}
                      </span>
                    </h5>
                  ) : null}
                  {sessions[0].location ? (
                    <h5>
                      Current location:{" "}
                      <span style={styles.highlight}>
                        {sessions[0].location}{" "}
                        {book.totalLocation > 0
                          ? `/ ${book.totalLocation}`
                          : null}
                      </span>
                    </h5>
                  ) : null}
                  {sessions[0].percent ? (
                    <h5>
                      Percentage read:{" "}
                      <span style={styles.highlight}>
                        {sessions[0].percent}%
                      </span>
                    </h5>
                  ) : null}
                  <h5>
                    Time read:{" "}
                    <span style={styles.highlight}>
                      {duration.hours} hours {duration.minutes} minutes
                    </span>
                  </h5>
                  <h6>
                    {done ? "Completed on:" : "Last read on:"}{" "}
                    {sessions[0].date}
                  </h6>
                  <h6>Total reading sessions: {sessions.length}</h6>
                </div>
              ) : (
                <p>No reading sessions recorded</p>
              )}
              <button
                className="btn btn-lg btn-maroon mb-3"
                onClick={handleShow}
              >
                Add reading session
              </button>
            </div>
          </div>
          <Tabs>
          <Tab eventKey="bookInfo" title="Description">
              <div className="card shadow pt-4 px-3 pb-2 mb-2">
                <p>{book.description}</p>
              </div>
            </Tab>
            <Tab eventKey="sessions" title="Sessions" disabled={sessions.length > 0 ? false : true}>
            {sessions.length > 0
            ? sessions.map((session) => (
                <Session
                  key={session._id}
                  session={session}
                  book={book}
                  getBookInfo={getBookInfo}
                  reload={reload}
                  setReload={setReload}
                  handleDelete={handleDelete}
                  closeModal={hideDeleteModal}
                />
              ))
            : null}
            </Tab>
            <Tab eventKey="quotes" title="Quotes" disabled={quotes.length > 0 ? false : true}>
            {quotes.length > 0 ? (
            <div className="card shadow bg-dark mb-2 pt-3 px-3">
              <p style={styles.quote}>
                <span
                  className={
                    view ? "fas fa-chevron-down" : "fas fa-chevron-right"
                  }
                  onClick={() => setView(!view)}
                />{" "}
                Quotes
              </p>
              {view
                ? quotes.map((quote) => (
                    <Quote
                      key={quote._id}
                      quote={quote}
                      getBookInfo={getBookInfo}
                      handleDelete={handleDelete}
                      closeModal={hideDeleteModal}
                    />
                  ))
                : null}
            </div>
          ) : null}
            </Tab>
          </Tabs>
          {/* {sessions.length > 0
            ? sessions.map((session) => (
                <Session
                  key={session._id}
                  session={session}
                  book={book}
                  getBookInfo={getBookInfo}
                  reload={reload}
                  setReload={setReload}
                  handleDelete={handleDelete}
                  closeModal={hideDeleteModal}
                />
              ))
            : null} */}
          {/* {quotes.length > 0 ? (
            <div className="card shadow bg-dark my-2 pt-3 px-3">
              <p style={styles.quote}>
                <span
                  className={
                    view ? "fas fa-chevron-down" : "fas fa-chevron-right"
                  }
                  onClick={() => setView(!view)}
                />{" "}
                Quotes
              </p>
              {view
                ? quotes.map((quote) => (
                    <Quote
                      key={quote._id}
                      quote={quote}
                      getBookInfo={getBookInfo}
                      handleDelete={handleDelete}
                      closeModal={hideDeleteModal}
                    />
                  ))
                : null}
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default CollectedBookInfo;
