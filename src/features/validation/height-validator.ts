import { IsString, Matches } from 'class-validator';

export class HeightValidator {
    @IsString()
    @Matches(/^[0-9]+$/, { message: 'Height must be a number' })
    height: string;
}