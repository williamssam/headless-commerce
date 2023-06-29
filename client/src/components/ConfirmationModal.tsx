import * as AlertDialog from '@radix-ui/react-alert-dialog'
import React from 'react'

type ConfirmationModalProsp = {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConfirmationModal = ({
	open,
	setOpen,
}: ConfirmationModalProsp) => (
	<AlertDialog.Root open={open} onOpenChange={setOpen}>
		<AlertDialog.Portal>
			<AlertDialog.Overlay className='fixed inset-0 bg-neutral-950/90 backdrop-blur-sm data-[state=open]:animate-overlayShow' />
			<AlertDialog.Content className='fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow'>
				<AlertDialog.Title className='m-0 text-xl font-medium text-neutral-800'>
					Are you absolutely sure?
				</AlertDialog.Title>
				<AlertDialog.Description className='mb-5 mt-4 text-[15px] leading-normal text-neutral-500'>
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</AlertDialog.Description>
				<div className='flex justify-end gap-[25px]'>
					<AlertDialog.Cancel asChild>
						<button
							type='button'
							className='inline-flex items-center justify-center rounded-md bg-neutral-200 px-10 py-2 font-medium outline-none transition-colors hover:bg-neutral-300'
						>
							Cancel
						</button>
					</AlertDialog.Cancel>
					<AlertDialog.Action asChild>
						<button
							type='button'
							className='inline-flex items-center justify-center rounded-md bg-red-100 px-8 py-2 font-medium text-red-600 outline-none transition-colors hover:bg-red-200'
						>
							Yes, delete account
						</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
)
