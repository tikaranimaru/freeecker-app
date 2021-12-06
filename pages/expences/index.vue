<template lang="pug">
  div
    v-col
      client-only
        v-card(v-if="expenses.length == 0")
          v-row
            v-col
              p.mt-5.mb-0.text-center お疲れさまです
              p.text-center 申請は全て片付きました
          v-img(src="coffee-break-pana.png")
        div(else)
          vue-tinder.text-center.d-flex.justify-center(ref="tinder" key-name='id' :queue.sync='expenses' :offset-y='10' @submit='onSubmit')
            .card.tinder-card.text-left.pa-3(slot-scope='scope')
              v-row
                v-col(cols="6")
                  span 申請No.{{scope.data.application_number}}
                v-col.text-right(cols="6")
                  span 
                    small 申請日: 
                    | {{scope.data.issue_date}}
              h3.mb-1.mt-3.text-center {{scope.data.title}}
              p.text-h2.text-bold.mb-2.font-weight-bold.text-center.mb-4(style="margin-top: -4px !important;") ¥ {{scope.data.total_amount.toLocaleString()}}
              v-divider
              v-row.mt-1
                v-col
                  v-chip.ma-1(color="primary" outlined small v-show="scope.data.sectionName" ) {{ scope.data.sectionName }} 
                  v-chip.ma-1(color="deep-purple" outlined small v-for="tagName in scope.data.tagNames" :key="tagName") {{ tagName }}
              v-row
                v-col.py-0.text-letf(cols="6")
                  p.mb-0.caption 申請者：
                v-col.py-0.text-right(cols="6")
                  p.mb-0 {{scope.data.applicantName}}
              v-row
                v-col.py-0.text-letf(cols="6")
                v-col.py-0.text-right(cols="6")
                  p.mb-0 {{scope.data.applicantEmail}}

              v-row
                v-col.py-1.text-left(cols="12" v-if="(scope.data.description)")
                  p.my-1
                    | {{scope.data.description}}

              // ----------------------------------- 明細行 -----------------------------------
              v-row
                v-col.py-1(cols="4")
                  h4 明細：
              v-row(v-for="line in scope.data.expense_application_lines" :key="line.id")
                v-col.py-1(cols="6")
                  p.mb-0.caption {{line.transaction_date}}
                  p.mb-0 {{line.description}}
                v-col.py-1.text-right.pt-6(cols="6")
                  h4 ¥ {{line.amount.toLocaleString()}}
        
            img.text-left(slot='like' src='~/assets/good.png')
            img.text-left(slot='nope' src='~/assets/bad.png')

    // 承認メッセージ用スナックバー
    v-snackbar.freee-api-snack(v-model='approveSnackbar' :timeout="800" color="primary" outlined)
      v-icon(size='20px' color="primary")
        | mdi-hand-okay
      span.ml-3.font-weight-bold 承認しました。
      template(v-slot:action='{ attrs }')
 
    // 却下メッセージ用スナックバー
    v-snackbar.freee-api-snack(v-model='rejectSnackbar' :timeout="800" color="accent" outlined)
      v-icon(size='20px' color="accent")
        | mdi-hand-wave
      span.ml-3.font-weight-bold 却下しました。
      template(v-slot:action='{ attrs }')

    // 差し戻しメッセージ用スナックバー
    v-snackbar.freee-api-snack(v-model='feedbackSnackbar' :timeout="800" color="info" outlined)
      v-icon(size='20px' color="info")
        | mdi-hand-front-left
      span.ml-3.font-weight-bold 差し戻しました。
      template(v-slot:action='{ attrs }')

    // エラー発生メッセージ用スナックバー
    v-snackbar.freee-api-snack(v-model='errorSnackbar' :timeout="800" color="accent" outlined)
      v-icon(size='20px' color="accent")
        | mdi-alert-circle-outline
      span.ml-3.font-weight-bold エラーが発生しました。
      template(v-slot:action='{ attrs }')

    v-footer.py-0.px-0(fixed color="secondary")
      v-card.primary.lighten-1.text-center(flat tile width='100%')
        v-card-text
          v-row
            v-col.pa-0(cols=3)
              v-btn.mx-0.py-5(block depressed x-large text)
                v-icon(size='28px' color="white" @click="decide('nope')" :disabled="!canActions")
                  | mdi-hand-front-left
              p.white--text.my-0.caption(color="white") 差し戻し
            v-col.pa-0(cols=3)
              v-btn.mx-0.py-5(block depressed x-large text)
                v-icon(size='28px' color="white" @click="decide('super')" :disabled="!canActions")
                  | mdi-hand-wave
              p.white--text.my-0.caption(color="white") 却下
            v-col.pa-0(cols=3)
              v-btn.mx-0.py-5(block depressed x-large text)
                v-icon(size='34px' color="white" @click="decide('like')" :disabled="!canActions")
                  | mdi-hand-okay
              p.white--text.my-0.caption(color="white") 承認
            v-col.pa-0(cols=3)
              v-btn.mx-0.py-5(block depressed x-large text)
                v-icon(size='28px' color="white" @click="nolookApprove()" :disabled="!canActions")
                  | mdi-all-inclusive
              p.white--text.my-0.caption(color="white") 全部OK!

</template>

<script>
import VueTinder from 'vue-tinder'
import { Expence } from "@/models/expense"

export default {
  components: {
    VueTinder
  },
  data: () => ({
    expenses: [],
    apiHead: {},
    approveSnackbar: false,
    rejectSnackbar: false,
    feedbackSnackbar: false,
    errorSnackbar: false
  }),
  async created() {
    await this.createAuthHeadear()
    const res = await this.$axios.$get(`/api/1/expense_applications?company_id=${this.$config.FREEE_COMPANY_ID}&status=in_progress`, this.apiHead)
    this.expenses = (res.expense_applications).map((expence) => new Expence(expence))
  },
  computed: {
    canActions() {
      return this.expenses.length > 0
    }
  },
  methods: {
    // freeeアクセス用のヘッダーを作成
    createAuthHeadear() {
      this.apiHead = { 
        headers: {
          'Authorization': `Bearer ${this.accessTokenFromParams()}`,
          'X-Api-Version': "2020-06-15",
          'accept': "application/json"
        }
      }
    },
    // URLからアクセストークンを取得
    accessTokenFromParams() {
      const params = this.$route.hash
      const found = params.match(/access_token=(.*?)(&|$)/);
      if (found != null && found.length > 1) {
        return found[1]
      } else {
        return 0
      }
    },
    onSubmit({type, key, item}) {
      console.log(type)
      if (type=='like') {
        this.approve(item)
      } else if (type=='super') {
        // 却下
        this.reject(item)
      } else if (type=='nope') {
        // 差し戻し
        this.feedback(item)
      }
    },
    decide(choice) {
      this.$refs.tinder.decide(choice)
    },
    // 申請を全て承認
    nolookApprove() {
      let index = 0;
      let time;
      let that = this;

      time = setInterval(function(){
          that.decide('like')

          index++;
          if (index > that.length){
              // タイマーをクリア
              clearInterval(time);
          }
      }, 1100);
    },
    // 申請を承認
    approve(expense) {
      this.$axios.$post(
        `/api/1/expense_applications/${expense.id}/actions`,
        {
          'company_id': this.$config.FREEE_COMPANY_ID,
          'approval_action': 'approve',
          'target_step_id': expense.current_step_id,
          'target_round': expense.current_round,
        },
        this.apiHead
      ).then((response)=> {
        this.approveSnackbar = true
      }).catch((response)=> {
        this.errorSnackbar = true
      })
    },
    // 申請を却下
    reject(expense) {
      this.$axios.$post(
        `/api/1/expense_applications/${expense.id}/actions`,
        {
          'company_id': this.$config.FREEE_COMPANY_ID,
          'approval_action': 'reject',
          'target_step_id': expense.current_step_id,
          'target_round': expense.current_round,
        },
        this.apiHead
      ).then((response)=> {
        this.rejectSnackbar = true
      }).catch((response)=> {
        this.errorSnackbar = true
      })
    },
    // 申請を差し戻し
    feedback(expense) {
      this.$axios.$post(
        `/api/1/expense_applications/${expense.id}/actions`,
        {
          'company_id': this.$config.FREEE_COMPANY_ID,
          'approval_action': 'feedback',
          'target_step_id': expense.current_step_id,
          'target_round': expense.current_round,
        },
        this.apiHead
      ).then((response)=> {
        this.feedbackSnackbar = true
      }).catch((response)=> {
        this.errorSnackbar = true
      })
    },
  },
}
</script>

<style scoped>
.vue-tinder {
  width: 100%;
  min-height: 600px;
}
.tinder-card {
  height: 100%;
}
.freee-api-snack {
  margin-bottom: 76px
}
</style>