function firstFit(blocks, processes) {
    const memoryBlocks = blocks.map(block => ({
        ...block,
        free: true,
        processId: null
    }));

    const results = [];

    processes.forEach(process => {
        let allocated = false;

        for (const block of memoryBlocks) {
            if (block.free && block.size >= process.size) {
                block.free = false;
                block.processId = process.pid;

                results.push({
                    pid: process.pid,
                    size: process.size,
                    blockId: block.id,
                    blockSize: block.size,
                    allocated: true
                });

                allocated = true;
                break;
            }
        }

        if (!allocated) {
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

export { firstFit };