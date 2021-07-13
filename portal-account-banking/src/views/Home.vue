<template>
  <div class="home">
    <ListUserAccount />
  </div>
</template>

<script>
import ListUserAccount from "@/components/ListUserAccount";
export default {
  name: "Home",
  components: {
    ListUserAccount,
  },
};
</script>

<style>
.home {
}
</style>
