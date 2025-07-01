import type React from "react"
import { useEffect, useState } from "react"
import { Input, Spin, Table, Form, Button, Col, Row, Tooltip } from "antd"
import { ColumnsType, TablePaginationConfig } from "antd/es/table"
import { useData } from "../state/data-context"
import { Link } from "react-router-dom"
import { createItem, type Item } from "../services/item-services"
import { useKeywordFilter } from "hooks/use-keyword"
import { StatsCard } from "components/stats"

import { PlusOutlined } from "@ant-design/icons"
import ModalCreate from "components/modal-create"

const PAGE_SIZE = 10

interface CreateItemForm {
  name: string
  category: string
  price: number
}

const Items: React.FC = () => {
  const { data, fetchItemsData, loading } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm<CreateItemForm>()
  const [filter, setFilter] = useState({
    query: '',
    page: 1,
    limit: PAGE_SIZE
  })
  const { setSearchTerm } = useKeywordFilter({ setFilter })

  useEffect(() => {
    const controller = new AbortController()
    fetchItemsData(filter, controller.signal)
    return () => controller.abort()
  }, [filter, fetchItemsData])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handlePaginationChange = (pagination: TablePaginationConfig) => {
    if (pagination.current) {
      setFilter((prev) => ({
        ...prev,
        page: pagination.current ?? prev.page,
      }))
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleSubmit = async (values: CreateItemForm) => {
    try {
      const newItem: Omit<Item, "id"> = {
        name: values.name,
        category: values.category,
        price: values.price,
      }

      const result = await createItem(newItem)

      if (!result) {
        throw new Error("Failed to create item")
      }


      setIsModalOpen(false)
      form.resetFields()

      fetchItemsData(filter)
    } catch (error) {
      console.error("Error creating item:", error)
    }
  }

  const columns: ColumnsType<Item> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <Link to={`/items/${record.id}`}>{text}</Link>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
  ]

  return (
    <div>
      <Col span={24}>
        <Row gutter={16} justify='space-between' align='middle'>
          <Col>
            <Tooltip placement="right" title='Create New Item'>
              <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={showModal}/>
            </Tooltip>
          </Col>
          <Col>
            <Col><StatsCard /></Col>
          </Col>
        </Row>
      </Col>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Col span={24}>
          <Row gutter={[16, 16]} justify='start'>
            <Col>
              <Input.Search
                placeholder="Search items..."
                onChange={(e) => handleSearch(e.target.value)}
                enterButton
                allowClear
                style={{ maxWidth: 400 }}
              />
            </Col>
            <Col span={24}>
              <Table<Item>
                rowKey="id"
                columns={columns}
                dataSource={data.items}
                pagination={{
                  current: filter.page,
                  pageSize: PAGE_SIZE,
                  onChange: (page) => setFilter((prev) => ({ ...prev, page })),
                  total: data.total,
                }}
                scroll={{ y: 400 }}
                onChange={handlePaginationChange}
              />
            </Col>
          </Row>
        </Col>
      )}
      <ModalCreate 
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        form={form}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Items
