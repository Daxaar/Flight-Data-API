import Axios from "axios";

const baseUrl = "http://localhost:3001/flights/";

export default {
    async getArrivals() {
        const response = await Axios.get(baseUrl + "arrivals?cache=1");
        return response.data.arrivals;
    },
    getDepartures() {
        Axios.get(baseUrl + "departures?cache=1")
            .then(data => data);
    }
}