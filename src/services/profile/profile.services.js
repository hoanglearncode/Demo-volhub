import axios from "axios";

export default {
    //update profile
    updateProfile: async ({ fullName, avatar, bio }) => {
        const token = localStorage.getItem("token");

        await axios.get(`http://localhost:8080/api/profiles/update`, {
            fullName,
            avatar,
            bio
        },{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            }
        }).then(() => {
            // trả ra thông báo th k có response
        }).catch((error) => console.log(error))
    },

    //getMyProfile
    getMyProfile: async () => {
        const token = localStorage.getItem("token");

        await axios.get(`http://localhost:8080/api/profiles/my-profile`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return response.data.result;
        }).catch((error) => console.log(error))
    },

    
};