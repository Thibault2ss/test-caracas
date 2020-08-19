<template>
  <div>
    <loader v-if="loading"/>
    <button class="plaid-link-btn" v-else @click="connectBank">Connect To Your Bank</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    linkToken: null,
    linkHandler: null
  }),

  methods: {
    async initPlaidLink () {
      this.loading = true
      await this.$axios.post('create_link_token', {})
        .then((resp) => {
          // console.log(resp)
          const data = resp.data
          if (!data.link_token) {
            console.error('could not retrieve link token')
          } else {
            this.linkToken = data.link_token
            localStorage.setItem('link_token', this.linkToken)
            this.setLinkHandler(this.linkToken)
            return this.linkToken
          }
        })
      this.loading = false
    },

    setLinkHandler (linkToken) {
      this.linkHandler = this.$plaid.create({
        token: linkToken,
        onSuccess: (publicToken) => {
          return this.$axios.post('set_access_token', {
            public_token: publicToken
          }).then((resp) => {
            console.log(resp)
            this.$emit('connected')
          })
        },
        onExit: async (err, metadata) => {
          if (err != null) {
            console.error(err, metadata)
          }
        },
        onEvent: function (eventName, metadata) {
          console.log('link event', eventName)
        }
      })
    },

    async connectBank () {
      if (!this.linkHandler) return
      this.linkHandler.open()
    }
  },

  created () {
    this.initPlaidLink()
  }
}
</script>

<style scoped>
.plaid-link-btn {
  color: #0a85ea !important;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  background: #ffffff;
  padding: 20px;
  border: 4px solid #0a85ea !important;
  display: inline-block;
  transition: all 0.4s ease 0s;
}
.plaid-link-btn:hover {
  color: #ffffff !important;
  background: #0a85ea;
  border-color: #0a85ea !important;
  transition: all 0.4s ease 0s;
}
</style>
