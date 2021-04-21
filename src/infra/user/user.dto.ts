import CreateAddressDto from './address.dto';

class CreateUserDto {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public address?: CreateAddressDto;
}

export default CreateUserDto;
