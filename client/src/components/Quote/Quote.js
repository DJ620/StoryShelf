import React from 'react';
import api from "../../utils/api";

const Quote = ({quote, getBookInfo, handleDelete, closeModal}) => {
    
    const deleteQuote = () => {
        api.deleteQuote(quote._id).then(res => {
            console.log(res);
            getBookInfo();
            closeModal();
        });
    };

    const styles = {
        format: {
            color: "white",
            width: "40vw",
            minWidth: "325px",
            paddingLeft: "50px",
            paddingRight: "50px",
            margin: "0 auto",
            textShadow: "5px 5px 15px black"
        },
        trash: {
            fontSize: "20px",
            fontWeight: "bold"
        },
        quotes: {
          fontSize: "50px",
          fontWeight: "bold"
        }
    };

    return (
        <div style={{borderTop: "3px dashed white"}}>
            <span style={styles.trash} className="trash q far fa-trash-alt float-right shadow pt-3" onClick={() => handleDelete(deleteQuote)}/>
        <div style={styles.format} className="my-3">
            <div className="row">
                <p style={styles.quotes}>"</p>
            </div>
            <p className="text-center">{quote.quote}</p>
            <div className="row d-flex justify-content-end">
                <p style={styles.quotes}>"</p>
            </div>
            {quote.character ? <div className="row d-flex justify-content-end">
                <p>Character: {quote.character}</p>
            </div> : null}
            {quote.page ? <div className="row d-flex justify-content-end">
                <p>Page: {quote.page}</p>
            </div> : null}
            {quote.location ? <div className="row d-flex justify-content-end">
                <p>Location: {quote.location}</p>
            </div> : null}
        </div>
        </div>
    )
}

export default Quote;
