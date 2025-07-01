import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Spin } from 'antd'
import { fetchItem, Item } from '../services/item-services'

const ItemDetail: React.FC = () => {
  const { id } = useParams()
  const [item, setItem] = useState<Item | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
        console.log("🚀 ~ useEffect ~ id:", id)

    const controller = new AbortController()
    fetchItem(id!, controller.signal)
      .then(setItem)
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Error fetching item:', err)
          navigate('/')
        }
      })

    return () => controller.abort()
  }, [id, navigate])

  if (!item) return <Spin size="large" />

  return (
    <Card title={item.name} style={{ margin: 24 }}>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
    </Card>
  )
}

export default ItemDetail
