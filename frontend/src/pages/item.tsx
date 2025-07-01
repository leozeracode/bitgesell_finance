import React, { useEffect, useState } from 'react'
import { Input, Spin, Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useData } from '../state/data-context'
import { Link } from 'react-router-dom'
import type { Item } from '../services/item-services'

const PAGE_SIZE = 10

const Items: React.FC = () => {
  const { items, fetchItemsData, loading } = useData()
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchItemsData({ q: query, page, limit: PAGE_SIZE, signal: controller.signal })
    return () => controller.abort()
  }, [query, page, fetchItemsData])

  const handleSearch = (value: string) => {
    setPage(1)
    setQuery(value)
  }

  const handlePaginationChange = (pagination: TablePaginationConfig) => {
    if (pagination.current) setPage(pagination.current)
  }

  const columns: ColumnsType<Item> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`/items/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    }
  ]

  return (
    <div style={{ padding: 24 }}>
      <Input.Search
        placeholder="Search items..."
        onSearch={handleSearch}
        enterButton
        allowClear
        style={{ marginBottom: 16, maxWidth: 400 }}
      />

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table<Item>
          rowKey="id"
          columns={columns}
          dataSource={items}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            onChange: setPage,
            total: 50 
          }}
          scroll={{ y: 400 }}
          onChange={handlePaginationChange}
        />
      )}
    </div>
  )
}

export default Items
