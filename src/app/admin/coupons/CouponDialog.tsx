"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createCoupon, updateCoupon } from "./actions"
import { toast } from "sonner"
import { Coupon } from "@prisma/client"

interface CouponDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  coupon?: Coupon | null
  onSuccess: () => void
}

export function CouponDialog({
  open,
  onOpenChange,
  coupon,
  onSuccess,
}: CouponDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    code: "",
    discount: 0,
    description: "",
    isActive: true,
    validUntil: "",
    maxUses: "",
    minAmount: "",
  })

  // Reset form when dialog opens/closes or coupon changes
  useEffect(() => {
    if (open) {
      if (coupon) {
        setFormData({
          code: coupon.code || "",
          discount: coupon.discount || 0,
          description: coupon.description || "",
          isActive: coupon.isActive ?? true,
          validUntil: coupon.validUntil
            ? new Date(coupon.validUntil).toISOString().split("T")[0]
            : "",
          maxUses: coupon.maxUses?.toString() || "",
          minAmount: coupon.minAmount?.toString() || "",
        })
      } else {
        setFormData({
          code: "",
          discount: 0,
          description: "",
          isActive: true,
          validUntil: "",
          maxUses: "",
          minAmount: "",
        })
      }
    }
  }, [open, coupon])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.code.trim()) {
      toast.error("Coupon code is required")
      return
    }
    
    if (!formData.discount || formData.discount <= 0 || formData.discount > 100) {
      toast.error("Discount must be between 0 and 100")
      return
    }
    
    setLoading(true)

    try {
      const data = {
        code: formData.code.trim().toUpperCase(),
        discount: Number(formData.discount),
        description: formData.description.trim() || undefined,
        validUntil: formData.validUntil
          ? new Date(formData.validUntil)
          : undefined,
        maxUses: formData.maxUses ? Number(formData.maxUses) : undefined,
        minAmount: formData.minAmount
          ? Number(formData.minAmount)
          : undefined,
      }

      if (coupon) {
        await updateCoupon(coupon.id, {
          ...data,
          isActive: formData.isActive,
          validUntil: formData.validUntil
            ? new Date(formData.validUntil)
            : null,
          maxUses: formData.maxUses ? Number(formData.maxUses) : null,
          minAmount: formData.minAmount ? Number(formData.minAmount) : null,
        })
        toast.success("Coupon updated successfully")
      } else {
        await createCoupon(data)
        toast.success("Coupon created successfully")
      }

      onSuccess()
      onOpenChange(false)
    } catch (error: any) {
      toast.error(error.message || "Failed to save coupon")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {coupon ? "Edit Coupon" : "Create New Coupon"}
          </DialogTitle>
          <DialogDescription>
            {coupon
              ? "Update coupon details below"
              : "Create a new discount coupon for your customers"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Coupon Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                placeholder="SAVE10"
                required
                disabled={!!coupon}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%) *</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={formData.discount || ""}
                onChange={(e) =>
                  setFormData({ ...formData, discount: e.target.value ? Number(e.target.value) : 0 })
                }
                placeholder="10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="10% off on all orders"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={(e) =>
                  setFormData({ ...formData, validUntil: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxUses">Max Uses</Label>
              <Input
                id="maxUses"
                type="number"
                min="1"
                value={formData.maxUses}
                onChange={(e) =>
                  setFormData({ ...formData, maxUses: e.target.value })
                }
                placeholder="Unlimited"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minAmount">Minimum Order Amount</Label>
            <Input
              id="minAmount"
              type="number"
              min="0"
              step="0.01"
              value={formData.minAmount}
              onChange={(e) =>
                setFormData({ ...formData, minAmount: e.target.value })
              }
              placeholder="No minimum"
            />
          </div>

          {coupon && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="rounded border-gray-300"
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : coupon ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

