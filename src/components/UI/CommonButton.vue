<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "common-button",
};
</script>

<style lang="scss" scoped>
.btn {
  font-family: $text;
  padding: 0.7rem;
  border-radius: 7px;
  background-color: $color-success;
  color: $color-text-btn;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: rgba($color-success, 0.5);
  }
  &:disabled {
    background-color: grey;
    cursor: auto;
  }
}
</style>
