import request from "../apiRequester";

export interface Event {
    id?: string;
    title: string;
    description: string;
    type: string;
    responsible?: string;
    created_at?: string;
    buyer_id?: string;
}

export interface Events {
    events: Event[];
    total: number;
    total_filtered: number;
}

export interface EventsFilters {
    offset_min?: number;
    offset_max?: number;
    search?: string;
    type?: string;
    orderby?: string;
}

//GET EVENTS
export const getEvents = async (buyer_id:string, filters?:EventsFilters) => {
    return request<Events>(`/event/buyer/${buyer_id}/?search=${filters?.search ? filters.search : ''}&offset_min=${filters?.offset_min ? filters.offset_min : 0}&offset_max=${filters?.offset_max ? filters.offset_max : 10}&type=${filters?.type ? filters.type : ''}&orderby=${filters?.orderby ? filters.orderby : 'created_at'}`, 'GET');
}

//GET EVENT BY ID
export const getEvent = async (id: string) => {
    return request<Event>(`/event/${id}/`, 'GET');
}

//CREATE EVENT
export const createEvent = async (event: Event) => {
    return request<Event>('/event/', 'POST', event);
}

//GET LAST EVENT
export const getLastEvent = async () => {
    return request<Event>('/event/last/', 'GET');
}