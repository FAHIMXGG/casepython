"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CouponDialog } from "./CouponDialog"
import { Coupon } from "@prisma/client"

interface CouponPageClientProps {
  coupons: Coupon[]
}

export function CouponPageClient({ coupons }: CouponPageClientProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-4xl font-bold tracking-tight lg:mt-16">
          Coupon Management
        </h1>
        <Button onClick={() => setDialogOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Coupon
        </Button>
      </div>

      <CouponDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={() => {
          setDialogOpen(false)
          window.location.reload()
        }}
      />
    </>
  )
}

