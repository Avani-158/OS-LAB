function lru(referenceString, frameCount) {
    const frames = [];
    const steps = [];
    let pageFaults = 0;
    let pageHits = 0;

    referenceString.forEach(page => {
        const hit = frames.includes(page);

        if (hit) {
            pageHits++;

            const index = frames.indexOf(page);
            frames.splice(index, 1);
            frames.push(page);
        } else {
            pageFaults++;

            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                frames.shift();
                frames.push(page);
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

export { lru };