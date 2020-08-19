<template>
  <div class="home">
    <PlaidLinkButton @connected="getTransactions()"/>
    <TransactionList v-if="transactions" :transactions="transactions"/>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import PlaidLinkButton from '@/components/PlaidLinkButton.vue'
import TransactionList from '@/components/TransactionList.vue'

export default {
  components: {
    PlaidLinkButton,
    TransactionList
  },

  data: () => ({
    transactions: [],
    error: null
  }),

  methods: {
    getTransactions () {
      this.$axios.get('transactions')
        .then(resp => {
          const data = resp.data
          console.log(data)
          if (data.error != null) {
            this.error = data.error
            return
          }
          this.transactions = data.transactions
        })
    }
  }
}
</script>
