import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt)


@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) { }

	async signup(email: string, password: string) {
		// we can see if email in use
		const users = await this.usersService.find(email)
		// if we will get 1 user with this email - throw error
		if (users.length) {
			throw new BadRequestException('email is already in use')
		}
		// hash the users password
		//a) generate salt
		const salt = randomBytes(8).toString('hex')
		// b) Hash the salt and the password together
		const hash = (await scrypt(password, salt, 32)) as Buffer
		// c) Join the hashed result and the salt together
		const result = salt + '.' + hash.toString('hex')
		// create new user + save it. This entire process occurs when calling
		const user = await this.usersService.create(email, result)
		// return the user
		return user
	}

	async signin(email: string, password: string) {
		const [user] = await this.usersService.find(email)
		if (!user) {
			throw new NotFoundException('user not found')
		}
		const [salt, storedHash] = user.password.split('.')

		const hash = (await scrypt(password, salt, 32)) as Buffer

		if (storedHash !== hash.toString('hex')) {
			throw new BadRequestException('bad password')

		}
		return user
	}

}