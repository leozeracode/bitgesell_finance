import React from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleSubmit: (values: {
    name: string;
    category: string;
    price: number;
  }) => void;
  form: any;
}

const ModalCreate: React.FC<Props> = ({ isModalOpen, handleCancel, handleSubmit, form }) => {
  return (

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
  )
}

export default ModalCreate