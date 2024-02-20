import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';


@Injectable()
export class AuthService{
	constructor(private usersService: UsersService){}

 async signup(email: string, password: string ){
// we can see if email in use
const users = await this.usersService.find(email)
// if we will get 1 user with this email - throw error
	 if (users.length){
		throw new BadRequestException('email is already in use')
	 }
// hash the users password

// create new user + save it

// return the user

	}

	signin() { }

}