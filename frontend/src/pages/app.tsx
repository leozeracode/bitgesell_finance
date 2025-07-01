import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Layout } from 'antd'

import ItemDetail from './item-detail'
import { DataProvider } from 'state/data-context'
import Items from './item'

const { Header, Content } = Layout

const App: React.FC = () => {
  return (
    <DataProvider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <Link to="/">📦 Item List</Link>
        </Header>
        <Content style={{ padding: 24 }}>
          <Routes>
            <Route path="/" element={<Items />} />
            <Route path="/items/:id" element={<ItemDetail />} />
          </Routes>
        </Content>
      </Layout>
    </DataProvider>
  )
}

export default App
