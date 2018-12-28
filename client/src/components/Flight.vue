<template>
  <div>
    {{this.flight.FlightNumber.join(",")}} |
    {{this.flight.Airport}} |
    {{this.flight.Airline.join(",")}} |
    {{this.flight.Status}} |
    {{estimatedTime}} |
    {{this.flight.StatusTimeText}}
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Flight",
  props: ["flight"],
  data() {
    return {};
  },
  computed: {
    estimatedTime() {
      return moment(this.flight.EstimatedTime).format("DD-MM-YYYY");
    }
  }
};
</script>
