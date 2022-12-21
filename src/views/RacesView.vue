<template>
  <div class="container_table">
    <common-select
      :model-value="selectedSort"
      @update:model-value="setSelectedSort"
      :options="sortOptions"
    />
    <table-view :races="sortedRaces" />
  </div>
</template>

<script>
import TableView from "@/components/TableView.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "ParticipantsView",
  components: {
    TableView,
  },
  methods: {
    ...mapActions({
      loadRaces: "races/loadRaces",
    }),
    ...mapMutations({
      setSelectedSort: "races/setSelectedSort",
    }),
  },
  mounted() {
    this.loadRaces();
  },

  computed: {
    ...mapState({
      races: (state) => state.races.races,
      selectedSort: (state) => state.races.selectedSort,
      sortOptions: (state) => state.races.sortOptions,
    }),
    ...mapGetters({
      sortedRaces: "races/sortedRaces",
    }),
  },
};
</script>
<style lang="scss" scoped>
.container_table {
  width: $desktop;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: $desktop) {
    width: calc(100% - 60px);
  }
  @media screen and (max-width: $tablet) {
    width: calc(100% - 40px);
  }
  @media screen and (max-width: $mobile) {
    width: calc(100% - 20px);
  }
}
</style>
