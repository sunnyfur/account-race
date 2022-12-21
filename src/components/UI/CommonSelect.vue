<template>
  <select :value="modelValue" @change="changeOption">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "common-select",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
select {
  font-family: $text;
  width: 100%;
  border: solid 1px $color-border;
  border-radius: 3px;
  padding: 0.5em;
}
</style>
