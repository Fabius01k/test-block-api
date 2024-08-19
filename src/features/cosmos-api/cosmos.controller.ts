import {Controller, Get, Param, UsePipes, ValidationPipe} from '@nestjs/common';
import { CosmosService } from './cosmos.service';
import {HeightValidator} from "../validation/height-validator";
import {HashValidator} from "../validation/hash-validator";

@Controller('cosmos')
export class CosmosController {
    constructor(private readonly cosmosService: CosmosService) {}

    @Get('block/:height')
    @UsePipes(new ValidationPipe({ transform: true }))
    getBlockByHeight(@Param() params: HeightValidator) {
        return this.cosmosService.getBlockByHeight(params.height);
    }

    @Get('transactions/:hash')
    @UsePipes(new ValidationPipe({ transform: true }))
    getTransactionByHash(@Param() params: HashValidator) {
        return this.cosmosService.getTransactionByHash(params.hash);
    }
}
