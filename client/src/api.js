import Axios from "axios";

const baseUrl = "http://localhost:3001/flights/";

export default {
    async getArrivals() {
        const response = await Axios.get(baseUrl + "arrivals?cache=1");
        return response.data.arrivals.sort((a, b) => a.EstimatedTime - b.EstimatedTime);
    },
    async getDepartures() {
        const response = await Axios.get(baseUrl + "departures?cache=1")
        return response.data.departures.sort((a, b) => a.EstimatedTime - b.EstimatedTime);
    }
}