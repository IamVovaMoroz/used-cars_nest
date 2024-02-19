import { NestInterceptor, UseInterceptors, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToInstance } from 'class-transformer';


interface ClassConstructor{
	new (...args: any[]) : {}
}

export function Serialize(dto: ClassConstructor) {
	return UseInterceptors(new SerializeInterceptort(dto))
}



export class SerializeInterceptort implements NestInterceptor {
	constructor(private dto: any) { }
	intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {

		// run something before a request is handled
		//by the request handler

		return handler.handle().pipe(
			map((data: any) => {
				// run something before the response is sent out
				return plainToInstance(this.dto, data, {
					excludeExtraneousValues: true
				});
			})
		);
	}
}