"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function PendingOrdersView() {
  const pendingOrders = useLiveQuery(
    () => db.orders.where("status").equals("PENDING_SYNC").toArray()
  )

  if (!pendingOrders) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Pending Sync</h2>
      {pendingOrders.length === 0 ? (
        <p className="text-muted-foreground">No orders pending synchronization.</p>
      ) : (
        <div className="grid gap-4">
          {pendingOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Order #{order.id.slice(0, 8)}
                </CardTitle>
                <Badge variant="secondary">{order.status}</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${order.total_amount.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.created_at).toLocaleString()}
                </p>
                <div className="mt-4">
                    <Button size="sm" variant="outline">Retry Sync</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
