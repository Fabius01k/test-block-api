import { Controller, Get, Param } from '@nestjs/common';
import {EvmService} from "./evm.service";
import {HeightValidator} from "../validation/height-validator";
import {HashValidator} from "../validation/hash-validator";

@Controller('evm')
export class EvmController {
    constructor(private readonly evmService: EvmService) {}

    @Get('block/:height')
    getBlockByHeight(@Param() params: HeightValidator) {
        return this.evmService.getBlockByHeight(params.height);
    }

    @Get('transactions/:hash')
    getTransactionByHash(@Param() params: HashValidator) {
        return this.evmService.getTransactionByHash(params.hash);
    }
}
