import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
// import { SerializeInterceptort } from './interceptors/serialize.interceptor';
import { Serialize } from './interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
	constructor(private usersService: UsersService, private authService: AuthService) { }


	// @Get('/colors/:color')
	// setColor(@Param('color') color: string, @Session() session: any) {
	// 	session.color = color;
	// }

	// @Get('/colors')
	// getColor(@Session() session: any) {
	// 	return session.color;
	// }


	@Post('/signup')
	createUser(@Body() body: CreateUserDto) {
		// this.usersService.create(body.email, body.password)
		return this.authService.signup(body.email, body.password)
	}

	@Post('/signin')
	signin(@Body() body: CreateUserDto) {

		return this.authService.signin(body.email, body.password)
	}
	// ........
	// @Get('/:id')
	// findUser(@Param('id') id: string) {
	// 	return this.usersService.findOne(parseInt(id))
	// }
	// @UseInterceptors(ClassSerializerInterceptor)

	// @UseInterceptors(new SerializeInterceptort(UserDto))
	// we use decorator for that - short code now
	// @Serialize(UserDto)
	@Get('/:id')
	async findUser(@Param('id') id: string) {
		console.log('handler is running')
		const user = await this.usersService.findOne(parseInt(id));
		if (!user) {
			throw new NotFoundException('user not found')
		}
		return user
	}

	@Get()
	findAllUser(@Query('email') email: string) {
		return this.usersService.find(email)
	}

	@Delete('/:id')
	removeUser(@Param('id') id: string) {
		return this.usersService.remove(parseInt(id))
	}

	@Patch('/:id')
	updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this.usersService.update(parseInt(id), body)
	}

}
