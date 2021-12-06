<template lang="pug">
 div.mt-5
    v-row(justify="center" align="center")
      v-col.text-center(cols="12")
        h1.mb-0
          | Freeecker
        conveLogo
        p.my-1
          | 承認作業を瞬殺
      v-col.text-center(cols="6" md="4" xl="3")
        a.mt-1.font-weight-bold(color="primary" :href="authUrl") 承認作業をはじめる


    v-row(justify="center" align="center")
      v-col.mt-0.text-center(cols="12" md="8" xl="6")
        v-spacer
        v-img(src="track-field-cuate.png" min-height="225")

        p.mt-4.px-3
          | 経費申請たまっていませんか？
          br
          | 承認作業瞬殺で済ませましょう。
                      
</template>

<script>
export default {
  computed: {
    authUrl() {
      return `https://accounts.secure.freee.co.jp/public_api/authorize?client_id=${this.$config.FREEE_CRIENT_ID}&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fexpences&response_type=token`
    }
  },
}  
</script>