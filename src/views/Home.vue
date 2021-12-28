<template>
  <div>home</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BlogList from "@/components/BlogList";

export default {
  name: "Home",
  components: { BlogList },
  computed: {
    ...mapGetters("user", ["user"]),
  },
  methods: {
    ...mapActions("blog", ["getBlogEntries"]),
  },
  async created() {
    if (this.user.isloggedIn) {
      await this.getBlogEntries(this.user.id);
    }
  },
};
</script>
