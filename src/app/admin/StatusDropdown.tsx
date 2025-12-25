'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { OrderStatus } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { changeOrderStatus } from "./actions"

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
    awaiting_shipment: 'Awaiting Shipment',
    fulfilled: 'Fulfilled',
    shipped: 'Shipped',
  }

const StatusDropdown = ({
    id,
    orderStatus,
  }: {
    id: string
    orderStatus: OrderStatus
  }) => {
    const router = useRouter()
    const queryClient = useQueryClient()
  
    const { mutate, isPending } = useMutation({
      mutationKey: ['change-order-status'],
      mutationFn: changeOrderStatus,
      onSuccess: (_, variables) => {
        // Invalidate orders queries to refetch data
        queryClient.invalidateQueries({ queryKey: ['orders'] })
        // Also refresh router for server components
        router.refresh()
        // Show success toast
        toast.success(`Order status updated to ${LABEL_MAP[variables.newStatus]}`)
      },
      onError: (error) => {
        // Show error toast
        toast.error(error.message || "Failed to update order status")
      },
    })
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='w-52 flex justify-between items-center'
            disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin mr-2' />
                Updating...
              </>
            ) : (
              <>
                {LABEL_MAP[orderStatus]}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-0'>
          {Object.keys(OrderStatus).map((status) => (
            <DropdownMenuItem
              key={status}
              className={cn(
                'flex text-sm gap-1 items-center p-2.5 cursor-default',
                {
                  'bg-accent': orderStatus === status,
                  'opacity-50 cursor-not-allowed': isPending,
                }
              )}
              onClick={() => !isPending && mutate({ id, newStatus: status as OrderStatus })}
              disabled={isPending}>
              <Check
                className={cn(
                  'mr-2 h-4 w-4 text-primary',
                  orderStatus === status ? 'opacity-100' : 'opacity-0'
                )}
              />
              {LABEL_MAP[status as OrderStatus]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  
  export default StatusDropdown