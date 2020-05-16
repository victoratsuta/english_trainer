module.exports = {
    space: (times = 4) => {
        for (let i = 0; i < times; i++) {
            console.info(' ')
        }
    },

    shuffle: (objects) => {
        return Array.prototype.slice.call(objects).sort(() => Math.random() - 0.5);
    }
}
