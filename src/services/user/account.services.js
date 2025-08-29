import axios from 'axios';

export default {
    getAccount : () => {
        const account  = {
            id : 1,
            username : "user1",
            role : null // guest | user | btc | admin    
        }

        return account;
    },

    createAccount : async ({ email, password, fullName, role = "VOLUNTEER" }) => {
        await axios.post(`http://localhost:8080/api/users/create`, {
            email: email,
            password: password,
            fullName: fullName,
            role: role
        }, {
            "Content-type": "application/json"
        }).then((response) => {
            return response.data.result;
        }).catch((error) => console.log(error))
    },

    // hiện tại chỉ admin ms xem đc
    getListUser: async () => {
        //lấy ra token
        const token = localStorage.getItem("token");

        await axios.get(`http://localhost:8080/api/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return response.data.result;
        }).catch((error) => console.log(error))
    },

    // lấy ra info của bản thân
    getMyInfo: async () => {
        //lấy ra token
        const token = localStorage.getItem("token");

        await axios.get(`http://localhost:8080/api/users/my-info`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return response.data.result;
        }).catch((error) => console.log(error));
    },

    // chỉnh sửa quyền hạn check (ORGANIZER || VOLUNTEER)
    changeUserRole: async ({ email, newRole }) => {
        //lấy ra token
        const token = localStorage.getItem("token");

        await axios.post(`http://localhost:8080/api/users/change-role`,{
            email: email,
            newRole: newRole
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            // k trả về response - hiển thị text đã sửa,... 
        }).catch((error) => console.log(error))
    },

    // delete account: người dùng chính || admin mới có quyền xoá
    deleteAccount: async ({ email }) => {
        //lấy ra token
        const token = localStorage.getItem("token");

        await axios.delete(`http://localhost:8080/api/users/delete`,{
            email: email
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            // k trả về response - hiển thị text đã sửa,... 
        }).catch((error) => console.log(error))
    },
};