import React, { useState, useEffect } from "react";
import "./Session.css";
import api from "../../utils/api";

const Session = ({ session, book, getBookInfo, reload, setReload, handleDelete, closeModal }) => {
  const [view, setView] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [lastChapter, setLastChapter] = useState(1);
  const [totalChapters, setTotalChapters] = useState(null);
  const [lastPercent, setLastPercent] = useState(1);
  const [totalPercent, setTotalPercent] = useState(null);
  const [lastLocation, setLastLocation] = useState(1);
  const [totalLocations, setTotalLocations] = useState(null);

  const deleteSession = () => {
    api.deleteSession(session._id).then(res => {
      if (book.sessions.length === 1) {
        api.updateBook({
          bookId: book._id,
          dataToUpdate: {status: "want to read"}
        }).then(response => {
          getBookInfo();
          setReload(!reload);
          closeModal();
        });
      } else {
        getBookInfo();
        setReload(!reload);
        closeModal();
      };
    });
  };

  useEffect(() => {
    let current = book.sessions.indexOf(session);
    if (current < book.sessions.length - 1) {
      if (session.page) {
          setLastPage(book.sessions[current + 1].page);
          setTotalPages(session.page - book.sessions[current + 1].page);
        } 
      if (session.chapter) {
        setLastChapter(book.sessions[current + 1].chapter);
        setTotalChapters(session.chapter - book.sessions[current + 1].chapter);
      };
      if (session.percent) {
          setLastPercent(book.sessions[current + 1].percent);
          setTotalPercent(session.percent - book.sessions[current + 1].percent);
        } 
      if (session.location) {
        setLastLocation(book.sessions[current + 1].location);
        setTotalLocations(session.location - book.sessions[current + 1].location);
      };
    } else {
      setTotalPages(session.page);
      setTotalChapters(session.chapter);
      setTotalPercent(session.percent);
      setTotalLocations(session.location);
    };
  }, []);

  const styles = {
    date: {
      fontSize: "20px",
      fontWeight: "bold"
    },
    highlight: {
      backgroundColor: "yellow",
      fontWeight: "bold"
    }
  }

  return (
    <div className="card shadow mb-2 pt-3 px-3">
      <p style={styles.date}><span className={view ? "fas fa-chevron-down" : "fas fa-chevron-right"} onClick={() => setView(!view)}/> {session.date}
      <span className="trash far fa-trash-alt float-right pt-1" onClick={() => handleDelete(deleteSession)}/>
      </p>
      {view ? <div>
     {session.duration ? <p>
        Time spent reading: <span style={styles.highlight}>{session.duration.hours} hours{" "}
        {session.duration.minutes} minutes</span>
      </p> : null}
      {session.chapter ? <p>Chapters read: <span style={styles.highlight}>{lastChapter} - {session.chapter}</span> {totalChapters ? <span>({totalChapters} chapters)</span>: null}</p> : null}
      {session.page ? <p>Pages read: <span style={styles.highlight}>{lastPage} - {session.page}</span> ({totalPages} pages)</p> : null}
      {session.percent ? (
        <p>Percentage read: <span style={styles.highlight}>{lastPercent}% - {session.percent}%</span> ({totalPercent}%)</p>
      ) : null}
      {session.location ? (
        <p>Locations Read: <span style={styles.highlight}>{lastLocation} - {session.location}</span> ({totalLocations} locations)</p>
      ) : null}
      {session.notes ? (
        <div>
          <p>Notes:</p>
          <ul>
            <li>{session.notes}</li>
          </ul>
        </div>
      ) : null}
      </div> : null}
    </div>
  );
};

export default Session;
