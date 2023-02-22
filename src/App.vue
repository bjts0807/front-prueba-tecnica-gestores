<template>
  <component :is="layout"></component>
</template>
<script>

import AppLayout from "./layouts/AppLayout";
import BlankLayout from "./layouts/BlankLayout";
import {  mapState } from "vuex";
import Loading from "./components/Loading";
export default {
  name: 'App',
  components: {
    AppLayout, BlankLayout,Loading
  },
  created() {
    this.$store.dispatch("currentUser");
  },
  watch : {
    is_logged : function(state){
      if(!state && this.$route.name !== 'signin') this.$router.push({name:'signin'});
    }
  },
  computed: {
    ...mapState(["is_logged", 'user','layout']),
  },
}

</script>
