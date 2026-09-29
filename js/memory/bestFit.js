function bestFit(blocks, processes) {
    const memoryBlocks = blocks.map(block => ({
        ...block,
        free: true,
        processId: null
    }));

    const results = [];

    processes.forEach(process => {
        let bestBlock = null;

        for (const block of memoryBlocks) {
            if (
                block.free &&
                block.size >= process.size
            ) {
                if (
                    bestBlock === null ||
                    block.size < bestBlock.size
                ) {
                    bestBlock = block;
                }
            }
        }

        if (bestBlock) {
            bestBlock.free = false;
            bestBlock.processId = process.pid;

            results.push({
                pid: process.pid,
                size: process.size,
                blockId: bestBlock.id,
                blockSize: bestBlock.size,
                allocated: true
            });
        } else {
            results.push({
                pid: process.pid,
                size: process.size,
                blockId: null,
                blockSize: null,
                allocated: false
            });
        }
    });

    return {
        blocks: memoryBlocks,
        results
    };
}

export { bestFit };