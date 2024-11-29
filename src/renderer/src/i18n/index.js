import { createI18n } from 'vue-i18n'
import en from './en'
import cn from './cn'

const messages = {
  en,
  cn
}
const i18n = createI18n({
  locale: 'cn', // 默认语言
  fallbackLocale: 'en', // 回退语言
  messages
})

export default i18n
