import { defineStore } from 'pinia'

const detectBrowser = () => {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('firefox')) return 'firefox'
  if (ua.includes('edg/')) return 'edge'
  if (ua.includes('chrome')) return 'chrome'
  if (ua.includes('safari')) return 'safari'
  return 'unknown'
}

export const useGlobalStore = defineStore('global', {
  state: () => ({
    userId: null,
    browser: null,
  }),
  getters: {
    isFirefox: s => s.browser === 'firefox',
  },
  actions: {
    _save() {
      localStorage.setItem('globalStore', JSON.stringify({
        userId: this.userId, browser: this.browser
      }))
    },
    init({ userId } = {}) {
      const saved = JSON.parse(localStorage.getItem('globalStore') || '{}')
      if (saved.userId) this.userId = saved.userId
      if (saved.browser) this.browser = saved.browser

      if (!this.browser) this.browser = detectBrowser()
      if (userId != null) this.userId = userId

      this._save()
    },
    setUserId(id) {
      this.userId = id
      this._save()
    },
    setBrowser(name) {
      this.browser = name
      this._save()
    }
  }
})
