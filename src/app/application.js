// app 初始化文件

class App {
  constructor () {
    this.initCommon() // 初始化参数
    this.showStartScreen()
  }

  initCommon () {
    this.appState = 'init' // app state
    this.pages = [] // 存储页面
    this.currentPage = null // 当前页面
  }

  showStartScreen () {
    // 显示从App进来时的loading页面，在app加载完成时关闭
  }

  switchView () { }

  addPageView () { }

  getPageView (view) {
    return this.pages[this.pages.indexOf(view)] || null
  }

  createView () {

  }
}

module.exports = App
