import { Catch, HttpException, ExceptionFilter, BadRequestException } from "@nestjs/common";
import { GraphQLError } from "graphql";


@Catch(BadRequestException)
export class BadRequestExceptionFilter implements  ExceptionFilter {
    catch(exception: HttpException) {
        const status = exception.getStatus()
        const res = exception.getResponse()
        return new GraphQLError((res as any).message[0], {
            extensions: {
                status,
                ...exception
            }
        })
    }
}
