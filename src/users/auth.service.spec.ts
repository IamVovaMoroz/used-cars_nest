import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';


it('can create an instance of auth service', async () => {
	//create a fake copy of the users service.
	const fakeUsersService = {
		find: () => Promise.resolve([]),
		create: (email: string, password: string) =>
			Promise.resolve({ id: 1, email, password }),
	};

	const module = await Test.createTestingModule({
		//
		providers: [AuthService, // we check AuthService, with dependency of UsersService
			{
				provide: UsersService,  // if anyone will ask UsersService
				useValue: fakeUsersService // give them useValue - fakeUsersService, object
			},
		]
	}).compile();

	const service = module.get(AuthService) // create an instance of the auth service
	expect(service).toBeDefined();

})