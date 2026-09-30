
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Назва повинна бути рядком' })
  @MinLength(3, { message: 'Мінімальна довжина назви — 3 символи' })
  title: string;

  @IsNumber({}, { message: 'Ціна повинна бути числом' })
  @Min(0, { message: 'Ціна не може бути від’ємною' })
  price: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Поле image не повинно бути порожнім' })
  image?: string;

  @IsBoolean({ message: 'Поле повинно бути boolean' })
  is_show: boolean;

  @IsNumber({}, { message: 'ID категорії повинен бути числом' })
  @Min(1, { message: 'ID категорії повинен бути більше 0' })
  category_id: number;
}