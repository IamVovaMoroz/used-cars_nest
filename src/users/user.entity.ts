import {
	AfterInsert,
	AfterRemove,
	AfterUpdate,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany
} from 'typeorm';
// import { Exclude } from 'class-transformer';
import { Report } from '../reports/report.entity';


@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	email: string;
	@Column()
	// @Exclude()
	password: string;
// user is going to be associated this something of type report. We have a contact with a report
	@OneToMany(() => Report, (report) => report.user )
	reports: Report[]

	@AfterInsert()
	logInsert() {
		console.log('Created User with id', this.id);
	}

	@AfterUpdate()
	logUpdate() {
		console.log('Updated User with id', this.id);
	}

	@AfterRemove()
	logRemove() {
		console.log('Removed User with id', this.id);
	}

}