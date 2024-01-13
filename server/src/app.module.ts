import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import {APP_FILTER} from '@nestjs/core'
import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {CacheModule} from '@nestjs/cache-manager'
import {BullModule} from '@nestjs/bull'
import {MailerModule as MailerModulePrimary} from '@nestjs-modules/mailer'

import { PrismaModule } from './common/prisma/prisma.module'
import { UserModule } from './user/user.module'
import { DateScalar } from './shared/scalars'
import { bullConfig, cacheConfig, getMailerConfig } from './config'
import { AuthModule } from './auth/auth.module'
import GraphQLJSON from 'graphql-type-json'
import { StorageModule } from './common/storage/storage.module'
import { PostModule } from './post/post.module'
import { TagModule } from './tag/tag.module'
import { BadRequestExceptionFilter } from './common/filters'
import { ListsModule } from './lists/lists.module';
import {MailerModule} from './common/mailer/mailer.module'


@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
			driver: ApolloDriver,
			useGlobalPrefix: true,
			playground: false,
			resolvers: { JSON: GraphQLJSON },
			buildSchemaOptions: {
				dateScalarMode: 'isoDate'
			},
			plugins: [ApolloServerPluginLandingPageLocalDefault()]
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			// validate: (config) => envVariables.parse(config)
		}),
		CacheModule.register(cacheConfig),
		MailerModulePrimary.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMailerConfig,
		}),
		BullModule.forRoot(bullConfig),
		PrismaModule,
		UserModule,
		AuthModule,
		StorageModule,
		PostModule,
		TagModule,
		ListsModule,
		MailerModule
	],
	providers: [DateScalar, {
		provide:APP_FILTER,
		useClass:BadRequestExceptionFilter,
	}]
})
export class AppModule {}
