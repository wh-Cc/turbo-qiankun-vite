import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// vite-plugin-qiankun helper
import {
  renderWithQiankun,
  qiankunWindow,
  QiankunProps,
} from 'vite-plugin-qiankun/dist/helper'
let root: ReactDOM.Root | null = null

function render(props: QiankunProps) {
  const { container } = props
  const root = ReactDOM.createRoot(
    (container
      ? container.querySelector('#root')
      : document.getElementById('root')) as HTMLElement
  )
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  return root
}
renderWithQiankun({
  mount(props) {
    console.log('vite-react 上线了')
    root = render(props)
  },
  bootstrap() {
    console.log('bootstrap')
  },
  unmount(props) {
    console.log('vite-react 下线了', props)
    // const { container } = props
    root?.unmount()
  },
  update(props) {
    console.log('vite-react更新了', props)
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  root = render({})
}