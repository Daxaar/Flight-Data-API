import Axios from "axios";

//const baseUrl = "http://localhost:3001/flights/";
const baseUrl = `${process.env.VUE_APP_API_URL}/flights/`;

export default {
    async getArrivals() {
        //console.log("baseUrl", baseUrl);
        const response = await Axios.get(baseUrl + "arrivals?cache=1");
        return response.data.arrivals.sort((a, b) => a.EstimatedTime - b.EstimatedTime);
    },
    async getDepartures() {
        const response = await Axios.get(baseUrl + "departures?cache=1")
        return response.data.departures.sort((a, b) => a.EstimatedTime - b.EstimatedTime);
    }
}