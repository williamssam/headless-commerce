import { config } from '../config'

type WelcomeEmailProps = {
	name: string
}

export const welcomeEmail = ({ name }: WelcomeEmailProps) => {
	return `
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<meta
					http-equiv="Content-Type"
					content="text/html; charset=utf-8"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>Welcome to Mailmeteor</title>
				<!--[if mso
					]><style type="text/css">
						body,
						table,
						td,
						a {
							font-family: Arial, Helvetica, sans-serif !important;
						}
					</style><!
				[endif]-->
			</head>

			<body
				style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;"
			>
				<table
					role="presentation"
					style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);"
				>
					<tbody>
						<tr>
							<td
								align="center"
								style="padding: 1rem 2rem; vertical-align: top; width: 100%;"
							>
								<table
									role="presentation"
									style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;"
								>
									<tbody>
										<tr>
											<td style="padding: 40px 0px 0px;">
												<div style="text-align: left;">
													<div style="padding-bottom: 20px;">
														<img
															src="${config.api_url}/assets/logo.png"
															alt="Company"
															style="width: 56px;"
														/>
													</div>
												</div>
												<div
													style="padding: 20px; background-color: rgb(255, 255, 255);"
												>
													<div
														style="color: rgb(0, 0, 0); text-align: left;"
													>
														<h2>Welcome to Headless Commerce</h2>
														<p style="padding-bottom: 16px">
															Hello ${name},
														</p>
														<p style="padding-bottom: 16px">
															Thank you for signing up to
															Headless Commerce. We're really
															happy to have you onboard! Click
															the link below to login to your
															account:
														</p>
														<p style="padding-bottom: 16px">
															<a
																href="${config.client_url}/login"
																target="_blank"
																style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;"
																>Login to your account</a
															>
														</p>
														<p style="padding-bottom: 16px">
															Best regards,<br />Headless
															Commerce team
														</p>
													</div>
												</div>
												<div
													style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;"
												>
													<p style="padding-bottom: 16px">
														<strong>Headless Commerce</strong>
													</p>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</body>
		</html>
	`
}
