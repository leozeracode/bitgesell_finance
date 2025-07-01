import { useState, useEffect } from "react"
import { Card, Skeleton } from "antd"

async function fetchStats(signal: AbortSignal): Promise<{ total: number; averagePrice: number }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (signal.aborted) {
        return reject(new Error("Aborted"))
      }
      const randomTotal = Math.floor(Math.random() * 100) + 10 
      const randomAveragePrice = Math.random() * 50 + 5 
      resolve({ total: randomTotal, averagePrice: randomAveragePrice })
    }, 500)
  })
}

export const StatsCard = () => {
  const [stats, setStats] = useState<{ total: number; averagePrice: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchStats(controller.signal)
      .then(setStats)
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch stats:", err)
        }
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return (
    <Card
      title="Stats"
      size="small"
      style={{
        width: "100%",
        minWidth: 300,
        minHeight: 120,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {loading ? (
        <div style={{ padding: "8px 0" }}>
          <Skeleton active paragraph={{ rows: 2, width: ["60%", "70%"] }} title={false} />
        </div>
      ) : stats ? (
        <div style={{ lineHeight: "1.8" }}>
          <div style={{ marginBottom: 8 }}>
            <strong>Total Items:</strong>
            <span style={{ marginLeft: 8, fontSize: "16px", color: "#1890ff" }}>{stats.total}</span>
          </div>
          <div>
            <strong>Average Price:</strong>
            <span style={{ marginLeft: 8, fontSize: "16px", color: "#52c41a" }}>${stats.averagePrice.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <p style={{ color: "#ff4d4f", textAlign: "center" }}>Error loading stats.</p>
      )}
    </Card>
  )
}
