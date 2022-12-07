<template>
  <form>
    <input type="text" />
    {{ message }}
  </form>
</template>

<script>
export default {
  name: "FormView",
  data() {
    return {
      message: "fghjkl",
    };
  },
};
</script>
