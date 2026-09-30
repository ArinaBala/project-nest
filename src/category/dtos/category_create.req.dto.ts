import {
  IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength, Length, IsOptional, Matches, IsInt, Min, ValidateIf,
} from 'class-validator';
 
export class CategoryCreateReqDto {

  @IsString({ message: 'Поле повинно бути строкою' })
  @Length(5, 20, { message: 'Довжина має бути від 5 до 20 символів (спосіб 1)' })
  @MinLength(5, { message: 'Мінімум 5 символів' })
  @MaxLength(20, { message: 'Максимум 20 символів' })
  title: string;
 
  @IsNotEmpty({ message: 'Поле повинно бути заповненим' })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
 
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: 'Slug може містити лише латинські літери, цифри, дефіс та підкреслення',
  })
  slug: string;
 
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Поле image не повинно бути порожнім' })
  image?: string;

  @IsOptional()
  description?: string;
 
  @IsBoolean({ message: 'Поле повинно бути або true або false' })
  is_show: boolean;
 
 
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  @IsInt({ message: 'Parent_id повинен бути цілим числом' })
  @Min(1, { message: 'Parent_id повинен бути більше 0' })
  parent_id: number | null;
}
 