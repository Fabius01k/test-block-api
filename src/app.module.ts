import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EvmController} from "./features/evm-api/evm.controller";
import {EvmService} from "./features/evm-api/evm.service";
import {CosmosController} from "./features/cosmos-api/cosmos.controller";
import {CosmosService} from "./features/cosmos-api/cosmos.service";

@Module({
  imports: [],
  controllers: [AppController,EvmController,CosmosController],
  providers: [AppService,EvmService, CosmosService],
})
export class AppModule {}
