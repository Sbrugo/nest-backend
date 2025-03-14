import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@services/users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

    const mockUserModel = {
    save: jest.fn().mockImplementation(function () {
      return Promise.resolve({ ...this, id: '1' });
    }),
    findById: jest.fn().mockResolvedValue({ id: '1', username: 'testuser', email: 'test@example.com' }),
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: getModelToken(User), useValue: mockUserModel },],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user and return it', async () => {
    const dto: CreateUserDto = { username: 'testuser', email: 'test@example.com' };

    jest.spyOn(userModel, 'constructor').mockImplementation(() => mockUserModel);

    const result = await service.createUser(dto);

    expect(result).toEqual({
      ...dto,
      id: '1',
    });

    expect(mockUserModel.save).toHaveBeenCalled(); 
  });
});
