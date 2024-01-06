import express from 'express'
import { config } from './config'
import assetsRoutes from './modules/admin/assets/assets.routes'
import categoryRoutes from './modules/admin/categories/category.routes'
import customerRoutes from './modules/admin/customers/customer.routes'
import discountsRoutes from './modules/admin/discounts/discounts.routes'
import orderRoutes from './modules/admin/orders/order.routes'
import productRoutes from './modules/admin/products/product.routes'
import userRoutes from './modules/admin/user/user.routes'
import variantRoutes from './modules/admin/variants/variant.routes'
import { verifyEmailMail } from './templates/verifyEmailMail'
import { sendMail } from './utils/mailer'

const router = express.Router()

export default (): express.Router => {
	router.get(`${config.routePrefix}/health-check`, (_, res) =>
		res.sendStatus(200)
	)

	userRoutes(router)
	productRoutes(router)
	variantRoutes(router)
	categoryRoutes(router)
	discountsRoutes(router)
	assetsRoutes(router)
	customerRoutes(router)
	orderRoutes(router)
	// websiteRoutes(router)

	router.get(`${config.routePrefix}/mail`, async (req, res) => {
		await sendMail({
			to: 'lia21@ethereal.email',
			from: 'Headless Commerce <admin@headlesscommerce.com>',
			subject: 'Re: Verify your email address',
			html: verifyEmailMail({ otp: '1234' }),
		})

		return res.status(200).json('Success')
	})

	return router
}
