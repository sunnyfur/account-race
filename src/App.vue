<template>
  <nav class="nav">
    <router-link class="router-link" to="/">Заявка</router-link>
    <router-link class="router-link" to="/participants">Участники</router-link>
    <router-link class="router-link" to="/profile">Профиль</router-link>
  </nav>
  <main class="main">
    <router-view />
  </main>
</template>

<style lang="scss">
body {
  background-color: $black;
}
#app {
  font-family: $text;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-text;
}

.nav {
  display: flex;
  gap: 2rem;
  padding: 30px;
  justify-content: center;
  .router-link {
    font-size: 1.5rem;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      color: rgba($color-success, 0.5);
    }
  }
  @media (max-width: $mobile) {
    flex-direction: column;
    gap: 1rem;
    .router-link {
      font-size: 1.2rem;
    }
  }
  a {
    color: $color-text;

    &.router-link-exact-active {
      color: $color-success;
    }
  }
}
.main {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}
</style>
