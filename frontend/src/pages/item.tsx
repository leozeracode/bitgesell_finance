"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Input, Spin, Table, Modal, Form, Button, Col, Row } from "antd"
import type { ColumnsType, TablePaginationConfig } from "antd/es/table"
import { useData } from "../state/data-context"
import { Link } from "react-router-dom"
import { createItem, type Item } from "../services/item-services"
import { useKeywordFilter } from "hooks/use-keyword"

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
    <div style={{ padding: 24 }}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={16}>
          <Input.Search
            placeholder="Search items..."
            onChange={(e) => handleSearch(e.target.value)}
            enterButton
            allowClear
            style={{ maxWidth: 400 }}
          />
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={showModal}>
            Create New Item
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Spin size="large" />
      ) : (
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
      )}

      <Modal title="Create New Item" open={isModalOpen} onCancel={handleCancel} footer={null} width={600}>
        <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please input the item name!" },
                  { min: 2, message: "Name must be at least 2 characters long!" },
                ]}
              >
                <Input placeholder="Enter item name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please input the category!" }]}
              >
                <Input placeholder="Enter category" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please input the price!" },
                ]}
              >
                <Input type="number" placeholder="Enter price" step="0.01" min="0" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Create Item
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default Items
