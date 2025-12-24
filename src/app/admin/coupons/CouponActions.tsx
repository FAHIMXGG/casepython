"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { CouponDialog } from "./CouponDialog"
import { deleteCoupon } from "./actions"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Coupon } from "@prisma/client"

interface CouponActionsProps {
  coupon: Coupon
}

export function CouponActions({ coupon }: CouponActionsProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete coupon "${coupon.code}"? This action cannot be undone.`
      )
    ) {
      return
    }

    setLoading(true)
    try {
      await deleteCoupon(coupon.id)
      toast.success("Coupon deleted successfully")
      window.location.reload()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete coupon")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={loading}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CouponDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        coupon={coupon}
        onSuccess={() => window.location.reload()}
      />
    </>
  )
}

