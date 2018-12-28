<template>
  <div class="arrivals">
    <h1>Arrivals</h1>
    <ul>
      <li v-for="a in arrivals" :key="a.FlightNumber[0]">
        <Flight :flight="a"/>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../api";
import Flight from "@/components/Flight.vue";

export default {
  name: "arrivals",
  components: {
    Flight
  },
  data() {
    return {
      arrivals: []
    };
  },
  computed: {},
  async created() {
    this.arrivals = await api.getArrivals();
  }
};
</script>
