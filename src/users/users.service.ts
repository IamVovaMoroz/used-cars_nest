import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private repo: Repository<User>){

		
	}
	create(email: string, password: string) {
		const user = this.repo.create({ email, password });
		return this.repo.save(user)
	
	 }
// 	repo: Repository<User>
// constructor(repo: Repository<User>){
// 	this.repo = repo;

// }
    findOne(id: number){
		return this.repo.findOne({ where: { id } });
		// return this.repo.findOne({email: 'asd1@gmail.com'})
	}

	find(email: string) {
		return this.repo.find({ where: { email: email } })
	 }

	async update(id: number, attrs: Partial<User>) {

		const user = await this.findOne(id)
		if(!user){
			throw new NotFoundException('User not found')
		}
		Object.assign(user, attrs )
		return this.repo.save(user)
	 }

	async remove(id: number){
		const user = await this.findOne(id)
		if (!user) {
			throw new NotFoundException('User not found')
		}
		return this.repo.remove(user)
	}

}
