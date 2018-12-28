<template>
  <div>
    <h1>Departures</h1>
    <ul>
      <li v-for="d in departures" :key="d.FlightNumber[0]">
        <Flight :flight="d"/>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../api";
import Flight from "@/components/Flight.vue";

export default {
  name: "departures",
  components: {
    Flight
  },
  data() {
    return {
      departures: []
    };
  },
  computed: {},
  async created() {
    this.departures = await api.getDepartures();
  }
};
</script>
