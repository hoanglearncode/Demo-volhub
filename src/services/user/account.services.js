export default {
    getAccount : () => {
        const account  = {
            id : 1,
            username : "user1",
            role : null // guest | user | btc | admin    
        }

        return account;
    }
};