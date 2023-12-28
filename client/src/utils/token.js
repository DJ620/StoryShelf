export default {
    getToken: function() {
        let token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            return token;
        } else {
            return null;
        };
    },

    getId: function() {
        const token = this.getToken();
        if (token) {
            return JSON.parse(atob(token.split(".")[1])).userId;
        } else {
            return null;
        };
        // const token = JSON.parse(atob(this.getToken().split(".")[1]));
        // if (token) {
        //     return token.userId;
        // };
    },

    getUsername: function() {
        // const token = JSON.parse(atob(this.getToken().split(".")[1]));
        // if (token) {
        //     return token.username;
        // };
        const token = this.getToken();
        if (token) {
            return JSON.parse(atob(token.split(".")[1])).username;
        } else {
            return null;
        };
    }

};