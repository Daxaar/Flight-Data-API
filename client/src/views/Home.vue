<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <WelcomeMessage msg="Welcome to Flight API"/>
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomeMessage from "@/components/WelcomeMessage.vue";

export default {
  name: "home",
  components: {
    WelcomeMessage
  }
};
</script>
