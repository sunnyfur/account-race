<template>
  <table class="table">
    <thead class="table__head">
      <tr class="table__row">
        <th>ФИО</th>
        <th>Дата заявки</th>
        <th>E-mail</th>
        <th>Длительность</th>
        <th>Сумма взноса</th>
      </tr>
    </thead>
    <tbody>
      <tr class="table__row" v-for="race in races" :key="race.id">
        <td class="table__data" data-label="ФИО">{{ race.name }}</td>
        <td class="table__data" data-label="Дата заявки">{{ race.date }}</td>
        <td class="table__data" data-label="E-mail">{{ race.email }}</td>
        <td class="table__data" data-label="Длительность">
          {{ race.distance }}
        </td>
        <td class="table__data" data-label="Сумма взноса">
          {{ race.payment }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    races: {
      type: Array,
    },
  },
};
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
  background-color: $light-gray;
  border-radius: 0.5rem;
  display: table;
  line-height: 2rem;
  width: 100%;
  transition: 0.5s ease ease-in-out;
  text-align: center;
  th {
    height: 100px;
  }
}

.table__row:nth-child(even) {
  background-color: $mid-gray;
}

.table__head {
  background-color: $mid-gray;
}

@media screen and (max-width: $tablet) {
  .table {
    width: 100%;
  }
  .table__head {
    display: none;
  }

  .race {
    width: 100%;
  }

  .data_hide {
    display: none;
  }
  .table__row {
    display: flex;
    flex-direction: column;
  }
  .table__data {
    border-bottom: dashed 0.1px $dark-gray;
    display: flex;
    gap: 1rem;
    &::before {
      content: attr(data-label);
      font-weight: bold;
    }
  }
}
</style>
