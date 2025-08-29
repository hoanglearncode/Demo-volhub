import axios from 'axios';

export default {
    applyEvent : async (id, event) => {
        const res = await axios.post('http://localhost:8080/api/event/apply', {
            id,
            event
        });

        return res.status;
    }
}