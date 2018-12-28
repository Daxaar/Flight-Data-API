<template>
  <div class="arrivals">
    <h1>Arrivals</h1>
    <ul>
      <li
        v-for="a in arrivals"
        :key="a.FlightNumber[0]"
      >{{a.FlightNumber.join(",")}} | {{a.Airport}} | {{a.Airline.join(",")}} | {{a.Status}} | {{a.StatusTimeText}}</li>
    </ul>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: "arrivals",
  data() {
    return {
      arrivals: []
    };
  },
  computed: {
  },
  async created() {
    this.arrivals = await api.getArrivals();
  }
};
</script>
