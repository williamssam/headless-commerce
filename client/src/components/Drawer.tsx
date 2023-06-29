import { X } from '@phosphor-icons/react'
import * as DrawerPrimitive from '@radix-ui/react-dialog'
import React from 'react'

const Drawer = DrawerPrimitive.Root
const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerTitle = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Title
		ref={ref}
		className={`text-xl font-bold text-white ${className}`}
		{...props}
	/>
))

const DrawerContent = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<DrawerPrimitive.Portal>
		<DrawerPrimitive.Overlay className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />

		<DrawerPrimitive.Content
			ref={ref}
			{...props}
			className={`fixed inset-y-0 right-0 z-50 h-full w-[350px] gap-4 overflow-auto bg-neutral-900 p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right data-[state=closed]:duration-300 data-[state=open]:duration-500 sm:max-w-sm ${className}`}
		>
			<DrawerTitle />

			{children}

			<DrawerPrimitive.Close asChild>
				<button
					className='absolute right-4 top-4 rounded-md text-white transition-opacity hover:opacity-90'
					aria-label='Close'
				>
					<X size={32} weight='fill' />
					<span className='sr-only'>Close</span>
				</button>
			</DrawerPrimitive.Close>
		</DrawerPrimitive.Content>
	</DrawerPrimitive.Portal>
))

export { Drawer, DrawerContent, DrawerTitle, DrawerTrigger }
