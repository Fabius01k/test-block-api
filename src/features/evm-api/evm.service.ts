import {Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EvmService {
    private readonly rpcUrl = 'https://haqq-evm.publicnode.com'
    private readonly logger = new Logger(EvmService.name)
    constructor() {}

    async getBlockByHeight(height: string) {
        this.logger.log(`Fetching block with height ${height}`);
        try {
            const response = await axios.post(this.rpcUrl, {
                jsonrpc: '2.0',
                method: 'eth_getBlockByNumber',
                params: [height, false],
                id: 1,
            });
            const block = response.data.result;

            return {
                height: block.number,
                hash: block.hash,
                parentHash: block.parentHash,
                gasLimit: block.gasLimit,
                gasUsed: block.gasUsed,
                size: block.size,
            };
        }
        catch (error) {
            throw new InternalServerErrorException('Error fetching block data');
        }
    }

    async getTransactionByHash(hash: string) {
        this.logger.log(`Fetching block with hash ${hash}`);
        try {
            const response = await axios.post(this.rpcUrl, {
                jsonrpc: '2.0',
                method: 'eth_getTransactionByHash',
                params: [hash],
                id: 1,
            });
            const transaction = response.data.result;

            return {
                hash: transaction.hash,
                to: transaction.to,
                from: transaction.from,
                value: transaction.value,
                input: transaction.input,
                maxFeePerGas: transaction.maxFeePerGas,
                maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
                gasPrice: transaction.gasPrice,
            };
        }
        catch (error) {
            throw new InternalServerErrorException('Error fetching block data');
        }
    }
}
