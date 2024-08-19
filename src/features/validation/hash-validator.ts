import { IsString, Length, Matches } from 'class-validator';

export class HashValidator {
    @IsString()
    @Length(64, 64)
    @Matches(/^[0-9a-fA-F]+$/)
    hash: string;
}