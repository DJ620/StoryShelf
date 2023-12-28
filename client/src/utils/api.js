import axios from "axios";

export default {
    createUser: function(userData) {
        return axios.post("/api/user/register", userData);
    },

    login: function(userData) {
        return axios.post("/api/user/login", userData);
    },

    getBooks: async function(title) {
        let results = await axios.get(`https://www.googleapis.com/books/v1/volumes?maxResults=40&q=${title}`);
        console.log(results.data);
        return results.data.items;
    },

    addBook: function(bookData) {
        return axios.post("/api/book/add", bookData);
    },

    getUserBooks: function(userId) {
        return axios.get("/api/book/" + userId);
    },

    getSingleBook: function(bookId) {
        return axios.get("/api/book/individual/" + bookId);
    },

    updateBook: function(updateData) {
        return axios.put("/api/book/update", updateData);
    },

    deleteBook: function(bookId) {
        return axios.delete("/api/book/" + bookId);
    },

    addSession: function(sessionData) {
        return axios.post("/api/session/add", sessionData);
    },

    deleteSession: function(sessionId) {
        return axios.delete("/api/session/" + sessionId);
    },

    addQuote: function(quoteData) {
        return axios.post("/api/quote/add", quoteData);
    },

    deleteQuote: function(quoteId) {
        return axios.delete("/api/quote/" + quoteId);
    },

    verify: function(token) {
        return axios.get("/api/user/" + token);
    }
};