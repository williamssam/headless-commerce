import { CaretUpDown, Checks } from '@phosphor-icons/react'
import * as SelectPrimitive from '@radix-ui/react-select'
import React from 'react'

const Select = SelectPrimitive.Root
const SelectValue = SelectPrimitive.Value

// const SelectValue = React.forwardRef<
// 	React.ElementRef<typeof SelectPrimitive.Value>,
// 	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
// >(({ className, children, ...props }, ref) => (
// 	<SelectPrimitive.Value
// 		ref={ref}
// 		className={`absolute left-3 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-neutral-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 ${className}`}
// 		{...props}
// 	>
// 		{children}
// 	</SelectPrimitive.Value>
// ))

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={`peer relative flex items-center justify-between gap-3 rounded border-b-2 border-b-neutral-300 bg-neutral-50 px-3 pb-2.5 pt-5 data-[placeholder]:text-neutral-500 ${className}`}
		{...props}
	>
		<label className='absolute left-3 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-neutral-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'>
			Currency (required)
		</label>
		{children}
		<SelectPrimitive.Icon asChild>
			<CaretUpDown size={16} weight='fill' />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
))

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={`flex cursor-pointer items-center justify-between gap-2 rounded px-4 py-2 text-sm outline-none hover:bg-neutral-100 data-[state=checked]:bg-neutral-200 ${className}`}
		{...props}
	>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		<SelectPrimitive.ItemIndicator>
			<Checks size={16} weight='fill' />
		</SelectPrimitive.ItemIndicator>
	</SelectPrimitive.Item>
))

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={`relative z-50 max-h-96 overflow-y-visible rounded-md border bg-white text-neutral-800 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
			position='popper'
			{...props}
		>
			<SelectPrimitive.Viewport className='p-1'>
				{children}
			</SelectPrimitive.Viewport>
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
))

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }

