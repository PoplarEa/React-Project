import React, { Component } from 'react'

export default class images extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h1>商品图片库页面</h1>
        {/* component WillMount：组件挂载之前调用
          component DidMount：组件挂载之后调用
          component DidUpdate：组件被更新之后调用
          component WillUnmount：组件在销毁之前调用 */}
      </div>
    )
  }
}
