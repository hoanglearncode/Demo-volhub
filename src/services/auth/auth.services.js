export default {
    login : async () => {
        await axios.post(`http://localhost:8080/auth/token`, {
            email: email,
            password: password
        }, {
            "Content-type": "application/json"
        }).then((response) => {
            return response.data.result;
        }).catch((error) => console.log(error))
    },

    checkToken : async () => {
        const token = localStorage.getItem("token");

        await axios.post(`http://localhost:8080/auth/introspect`, {
            token
        }, {
            "Content-type": "application/json"
        }).then((response) => {
            return response.data.result;
        }).catch((error) => console.log(error))
    },

    logout : async () => {
        const token = localStorage.getItem("token");

        await axios.post(`http://localhost:8080/auth/logout`, {
            token
        }, {
            "Content-type": "application/json"
        }).then(() => {
            // thong bao th
        }).catch((error) => console.log(error))
    },

    refreshToken : async () => {
        const token = localStorage.getItem("token");

        await axios.post(`http://localhost:8080/auth/refresh`, {
            token
        }, {
            "Content-type": "application/json"
        }).then((response) => {
            return response.data.result;
        }).catch((error) => console.log(error))
    },
};