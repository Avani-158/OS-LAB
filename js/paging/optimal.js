function optimal(referenceString, frameCount) {
    const frames = [];
    const steps = [];
    let pageFaults = 0;
    let pageHits = 0;

    referenceString.forEach((page, index) => {
        const hit = frames.includes(page);

        if (hit) {
            pageHits++;
        } else {
            pageFaults++;

            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                let replaceIndex = 0;
                let farthestUse = -1;

                frames.forEach((frame, frameIndex) => {
                    const nextUse = referenceString
                        .slice(index + 1)
                        .indexOf(frame);

                    if (nextUse === -1) {
                        replaceIndex = frameIndex;
                        farthestUse = Infinity;
                    } else if (nextUse > farthestUse) {
                        farthestUse = nextUse;
                        replaceIndex = frameIndex;
                    }
                });

                frames[replaceIndex] = page;
            }
        }

        steps.push({
            page,
            frames: [...frames],
            hit
        });
    });

    return {
        steps,
        pageFaults,
        pageHits
    };
}

export { optimal };