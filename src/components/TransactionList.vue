<template>
  <div class="transaction-list" v-if="transactions && transactions.length > 0">
    <h2>Latest Transactions</h2>
    <div class="tx" v-for="t in transactions" :key="t.transaction_id">
      <div class="tx-name">{{t.name}}</div>
      <!-- <div class="tx=-date">{{t.date}}</div> -->
      <div class="tx-amount" :class="{positive: t.amount > 0, negative: t.amount < 0}">
        {{t.amount}}<span class="tx-currency">{{t.iso_currency_code}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    transactions: Array
  }
}
</script>

<style scoped>
.positive {
  color: green;
}
.negative {
  color: red;
}
.tx {
  display: flex;
  text-align: left;
  max-width: 500px;
  margin: 10px auto;
  padding: 15px 30px;
  border-radius: 18px 18px 18px 18px;
  border-radius: 18px 18px 18px 18px;
  -moz-border-radius: 18px 18px 18px 18px;
  -webkit-border-radius: 18px 18px 18px 18px;
  border: 1px solid #f0f0f0;
}
.tx:hover {
  -webkit-box-shadow: 0px 0px 62px 0px rgba(209,209,209,0.6);
  -moz-box-shadow: 0px 0px 62px 0px rgba(209,209,209,0.6);
  box-shadow: 0px 0px 62px 0px rgba(209,209,209,0.6);
}
.tx-amount {
  flex: 0 1 0;
  font-size: 1.5em;
  width: 400px;
}
.tx-currency {
  font-size: 0.5em;
}
.tx-name {
  flex: 1 0 auto;
}
</style>
