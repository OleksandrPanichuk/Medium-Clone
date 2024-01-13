import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as CookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as passport from 'passport'
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config'
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'

import { AppModule } from '@/app.module'
import { helmetConfig, sessionConfig } from '@/config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		rawBody:true
	})

	const config = app.get(ConfigService)
	const PORT = config.get('PORT') ?? 8080

	app.use(helmet(helmetConfig))

	app.enableCors({
		origin: [config.get('CLIENT_URL')],
		credentials: true,	
	})
	
	app.setGlobalPrefix('api')

	app.use(CookieParser())

	app.use(session(sessionConfig))

	app.use(passport.initialize())
	app.use(passport.session())

	app.use(
		'/api/graphql',
		graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 1 })
	)

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

	await app.listen(PORT, () => {
		console.log('Server started at port:', PORT)
	})
}
bootstrap()
