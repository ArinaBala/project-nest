import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {message: "it`s not an email"})
    email:string;

    @IsString()
    @MinLength(5, {message: "min 5 symbols"})
    password:string;

    fullname:string;
    
    is_block?:boolean;
}
