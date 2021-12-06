import { Master } from './master'
import axios from 'axios'

export interface ExpenceInterface {
  id:           number // 経費申請ID
  company_id:   number // 事業所ID
  title:        string // 申請タイトル
  issue_date:   string // 申請日
  description:  string // 備考
  total_amount: number // 合計金額
  status:       string // 申請ステータス(draft:下書き, in_progress:申請中, approved:承認済, rejected:却下, feedback:差戻し)
  section_id:   number // 部門ID
  tag_ids:      Array<number> // メモタグID
  deal_id:              number // 取引ID
  deal_status:          string // 取引ステータス
  applicant_id:         number // 申請者のユーザーID
  application_number:   string // 申請No
  current_step_id:      number // 現在承認ステップID
  current_round:        number //在のround。差し戻し等により申請がstepの最初からやり直しになるとroundの値が増えます。
  expense_application_lines:  Array<ExpenceLine> // 項目行(詳細)
}

// 明細行
export interface ExpenceLineInterface {
  id:                number // 経費申請の項目行ID
  transaction_date:  string // 日付 (yyyy-mm-dd)
  description:       string // 内容 例：交通費：新幹線往復（東京〜大阪）
  amount:            number // 金額
  receipt_id:        number // 証憑ファイルID（ファイルボックスのファイルID）
  expense_application_line_template_id: number // 経費科目ID
}

// 経費クラス
export class Expence implements ExpenceInterface {
  id:           number
  company_id:   number
  title:        string
  issue_date:   string
  description:  string
  total_amount: number
  status:       string
  section_id:   number
  tag_ids:      Array<number>
  deal_id:              number
  deal_status:          string
  applicant_id:         number
  application_number:   string
  current_step_id:      number
  current_round:        number
  expense_application_lines: Array<ExpenceLine>
 
  constructor(data: ExpenceInterface) {
    this.id =           data.id
    this.company_id =   data.company_id
    this.title =        data.title
    this.issue_date =   data.issue_date
    this.description =  data.description
    this.total_amount = data.total_amount
    this.status =       data.status
    this.section_id =   data.section_id
    this.tag_ids =      data.tag_ids
    this.deal_id =      data.deal_id
    this.deal_status =          data.deal_status
    this.applicant_id =         data.applicant_id
    this.application_number =   data.application_number
    this.applicant_id =         data.applicant_id
    this.current_step_id =      data.current_step_id
    this.current_round =        data.current_round

    this.expense_application_lines =  data.expense_application_lines.map((expence_line: ExpenceLineInterface) => new ExpenceLine(expence_line))
  }

  // タグ名
  get tagNames(): any {
    if (this.tag_ids.length > 0) {
      return this.tag_ids.map(tag => Master.getByKeyword('tag', tag))
    } else {
      return []
    }
  }

  // 部門名
  get sectionName(): any {
    return Master.getByKeyword('section', this.section_id)
  }

  get applicantName(): any {
    return Master.getByKeyword('userName', this.applicant_id)
  }
  
  get applicantEmail(): any {
    return Master.getByKeyword('userEmail', this.applicant_id)
  }
}


// 経費の明細行クラス
export class ExpenceLine implements ExpenceLineInterface  {
  id:                number
  transaction_date:  string
  description:       string
  amount:            number
  receipt_id:        number
  expense_application_line_template_id: number

  constructor(data: ExpenceLineInterface) {
    this.id = data.id
    this.transaction_date = data.transaction_date
    this.description = data.description
    this.amount = data.amount
    this.receipt_id = data.receipt_id
    this.expense_application_line_template_id = data.expense_application_line_template_id
  }
}