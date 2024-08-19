import {Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CosmosService {
    private readonly rpcUrl = 'https://api.cosmos.network'
    private readonly logger = new Logger(CosmosService.name)
    constructor() {}

    async getBlockByHeight(height: string) {
        this.logger.log(`Fetching block with height ${height}`);
        this.logger.log(`Fetching block from URL: ${this.rpcUrl}/blocks/${height}`);
        try {
            const response = await axios.get(`${this.rpcUrl}/blocks/${height}`);
            const block = response.data.block;

            return {
                height: block.header.height,
                time: block.header.time,
                hash: block.header.hash,
                proposedAddress: block.header.proposer_address,
            };
        }
        catch (error) {
            throw new InternalServerErrorException('Error fetching block data');
        }
    }

    async getTransactionByHash(hash: string) {
        this.logger.log(`Fetching block with hash ${hash}`);
        try {
            const response = await axios.get(`${this.rpcUrl}/txs/${hash}`);
            const tx = response.data.tx_response;

            return {
                hash: tx.txhash,
                height: tx.height,
                time: tx.timestamp,
                gasUsed: tx.gas_used,
                gasWanted: tx.gas_wanted,
                fee: tx.tx.auth_info.fee.amount,
                sender: tx.tx.body.messages[0].from_address,
            };
        }
        catch (error) {
            throw new InternalServerErrorException('Error fetching block data');
        }
    }
}
