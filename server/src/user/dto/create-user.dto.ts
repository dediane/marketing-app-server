import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
    @IsString()
    readonly first_name: string;
    @IsString()
    readonly last_name: string;

    readonly avatar?: string;
}
