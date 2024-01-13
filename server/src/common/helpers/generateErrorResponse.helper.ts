import { HttpException } from '@nestjs/common'
import { GraphQLError } from 'graphql'
import {STATUS_CODES} from 'http'

export function generateErrorResponse(
	err: any,
	{
		message = 'Something went wrong',
		description = 'server/internal-error',
		cause = 'Internal Error',
		status = 500
	}: {
		message?: string
		description?: string
		cause?: string
		status?: number
	} = {}
) {
	if (err instanceof HttpException) {
		let description

		if (typeof err.getResponse() === 'string') {
			description = err.getResponse()
		} else {
			const response = err.getResponse() as { error?: string }
			description = response?.error
		}
		throw new GraphQLError(err.message, {extensions: {status: err.getStatus(),code:  STATUS_CODES[err.getStatus()], cause:err.cause, description}, originalError:err},)

	}
	throw new GraphQLError(message, {extensions:{status, description, cause}})
}
