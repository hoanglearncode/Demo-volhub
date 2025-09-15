import { createContext, useContext, useId, useState } from "react";

const EventContext = createContext(null);

const useEvent = () => useContext(EventContext);
class EventManagement {
    constructor(){
        this.eventList = [];
    }

    getEventList() {
        return [...this.eventList];
    }

    getEventList(prams) {
        const result = this.eventList;
        return result;
    }

    getEventByID (id) {
        const result = this.eventList.find((i)=> i.id === id);
        return result;
    }

    addNewEvents (value) {
        const id = this.eventList.length + 1;
        const userId = 1;
        value.id = id;
        value.userId = userId;
        this.eventList.push(value);
    }
}
function EventProvider({ children }) {
  const event = new EventManagement();
  const contextValue = {event : event};
  return <EventContext.Provider value={contextValue}>{children}</EventContext.Provider>;
}

export { EventProvider, useEvent };
export default EventProvider;
