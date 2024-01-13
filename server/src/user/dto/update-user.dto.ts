import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'


@InputType()
export class UpdateUserInput {
	@IsString()
	@IsOptional()
	@Field({nullable:true})
	readonly username?: string

	@IsString()
	@IsOptional()
	@Field({nullable:true})
	readonly about?:string

	
}