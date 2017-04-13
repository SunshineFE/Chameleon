import ReactDOM from 'react-dom'
import React from 'react'

class page {
  constructor (options) {
    super(options)
    this.options = options
    this.initialize()
    this.createElement()
    this.__beforeRender__()
    this.__render__()
    this.showPage()
  }

  initialize () {
    this.$el = this.options.$el;
  }

  // 生成redux的pageStore
  // this.reducers
  // this.actions
  createStore () {

  }

  showPage () {
    this.onShow && this.onShow()
  }

  show () {
    this.show()
  }

  hide () {
    this.hide()
  }

  __render__ () {
    this.__beforeRender__()
    this.onRender && this.onRender()
    ReactDOM.render(this.pageElement, this.$el)
  }

  __beforeRender__ () {
    this.onBeforeRender && this.onBeforeRender()
  }

  createElement () {
    this.onCreate && this.onCreate();
    this.pageElement = React.createElement(
      this.render()
    )
  }
}