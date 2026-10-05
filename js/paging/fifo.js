function fifo(referenceString, frameCount) {
    const frames = [];
    const steps = [];
    let pageFaults = 0;
    let pageHits = 0;
    let nextIndex = 0;

    referenceString.forEach(page => {
        const hit = frames.includes(page);

        if (hit) {
            pageHits++;
        } else {
            pageFaults++;

            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                frames[nextIndex] = page;
                nextIndex = (nextIndex + 1) % frameCount;
            }
        }

        steps.push({
            page,
            frames: [...frames],
            hit: hit
        });
    });

    return {
        steps,
        pageFaults,
        pageHits
    };
}

export { fifo };