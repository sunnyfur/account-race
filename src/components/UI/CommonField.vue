<template>
  <div class="form__input">
    <label :for="name" class="input__label">{{ label }}</label>
    <slot></slot>
    <div class="input__error" v-for="elem of error" :key="elem.id">
      <p>{{ elem.$message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "common-field",
  props: {
    name: { type: String, required: true },

    label: { type: String, required: true },
    error: { type: Array, required: false },
  },
  methods: {
    updateInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.form__input {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.input__label {
  align-self: flex-start;
}
.input__text {
  border: solid 1px $color-border;
  border-radius: 3px;
  padding: 0.5em;
}
.input__error {
  margin: 0;
  color: $color-error;
  align-self: flex-start;
  p {
    margin: 0;
  }
}
</style>
