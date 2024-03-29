import { DotsThree, Password } from '@phosphor-icons/react'
import * as Tabs from '@radix-ui/react-tabs'
import { PageHeader } from 'components/PageHeader'
import { ProfileForm } from 'components/ProfileForm'
import { UpdatePasswordForm } from 'components/UpdatePasswordForm'
import { Link, useLocation } from 'react-router-dom'

const tabs = [
	{
		id: 1,
		name: 'details',
		icon: <DotsThree size={16} weight='fill' />,
	},
	{
		id: 2,
		name: 'password',
		icon: <Password size={16} weight='fill' />,
	},
]

const tabs_content = {
	details: <ProfileForm />,
	password: <UpdatePasswordForm />,
}

export const Profile = () => {
	const { hash } = useLocation()

	return (
		<>
			<PageHeader breadcrumb='Home / Profile' title='Profile' />

			<section className='mx-auto max-w-6xl py-10'>
				<Tabs.Root
					defaultValue={hash ? hash.replace('#', '') : tabs[0].name}
					orientation='vertical'
					className='grid grid-cols-5 gap-6'
				>
					<Tabs.List
						className='col-span-1 flex h-max flex-col items-center gap-1 rounded-md bg-neutral-200 p-4'
						aria-label='Manage your account'
					>
						{tabs.map(tab => (
							<Tabs.Trigger key={tab.id} value={tab.name} asChild>
								<Link
									to={`#${tab.name}`}
									className='flex w-full cursor-pointer select-none items-center gap-2 rounded px-5 py-2 text-left text-sm capitalize leading-none outline-none transition-all hover:bg-neutral-50 data-[state=active]:bg-neutral-700 data-[state=active]:text-xs data-[state=active]:font-semibold data-[state=active]:uppercase data-[state=active]:tracking-wide data-[state=active]:text-white data-[state=active]:shadow-current data-[state=active]:focus-visible:relative data-[state=active]:focus-visible:shadow-[0_0_0_2px]'
								>
									{tab.icon}
									<span>{tab.name}</span>
								</Link>
							</Tabs.Trigger>
						))}
					</Tabs.List>

					<div className='col-span-4'>
						{tabs.map(tab => (
							<Tabs.Content key={tab.id} value={tab.name} asChild>
								{tabs_content[tab.name as keyof typeof tabs_content]}
							</Tabs.Content>
						))}
					</div>
				</Tabs.Root>
			</section>
		</>
	)
}
