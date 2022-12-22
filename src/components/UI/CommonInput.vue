<template>
  <input
    class="input__text"
    :name="name"
    :id="name"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    @input="updateInput"
  />
</template>

<script>
export default {
  name: "common-input",
  props: {
    type: { type: String, default: "text" },
    name: { type: String, required: true },
    placeholder: { type: String },
    modelValue: [String, Number, Date],
  },
  methods: {
    updateInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.input__text {
  font-family: $text;
  border: solid 1px $color-border;
  border-radius: 3px;
  padding: 0.5em;
}
</style>
