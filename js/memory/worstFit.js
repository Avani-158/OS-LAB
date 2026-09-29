function worstFit(blocks, processes) {
    const memoryBlocks = blocks.map(block => ({
        ...block,
        free: true,
        processId: null
    }));

    const results = [];

    processes.forEach(process => {
        let worstBlock = null;

        for (const block of memoryBlocks) {
            if (
                block.free &&
                block.size >= process.size
            ) {
                if (
                    worstBlock === null ||
                    block.size > worstBlock.size
                ) {
                    worstBlock = block;
                }
            }
        }

        if (worstBlock) {
            worstBlock.free = false;
            worstBlock.processId = process.pid;

            results.push({
                pid: process.pid,
                size: process.size,
                blockId: worstBlock.id,
                blockSize: worstBlock.size,
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

export { worstFit };