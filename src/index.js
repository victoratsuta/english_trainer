const checkbox = require('./lib/checkbox');
const constants = require('./constants.js');
const words = require('./words');
const proceedBunche = require('./services/proceedBunche.js');
const util = require('./services/util.js');

process.setMaxListeners(0);

(async () => {
    let answer;

    answer = await checkbox({
        message: 'Выберите тип теста, ежедневный или спринт',
        name: 'Выбор типа теста',
        choices: [
            {
                name: constants.answerEveryday,
                value: constants.answerEveryday
            }, {
                name: constants.answerSprint,
                value: constants.answerSprint
            }
        ]
    });

    if (answer[0] === constants.answerEveryday) {

        const firstBunch = util.shuffle(words[0].words)
        const prevBunch = util.shuffle(words[1].words)

        console.info('TODAY BUNCHE TEST START')
        await proceed(firstBunch)
        console.info('TODAY BUNCHE TEST FINISHED')

        util.space()

        console.info('PREV BUNCHE TEST START')
        await proceed(prevBunch)
        console.info('PREV BUNCHE TEST FINISHED')

    }

    if (answer[0] === constants.answerSprint) {

        console.info('SPRINT BUNCHE TEST START')

        util.space()

        for (const word of util.shuffle(words)) {

            const bunch = util.shuffle(word.words)
            await proceed(bunch)

            console.info('NEXT BUNCHE')

        }

        util.space()

        console.info('SPRINT BUNCHE TEST FINISHED')
    }

})();


async function proceed(bunch) {

    await proceedBunche(bunch)

    util.space()
    console.info('а теперь с английского на руский')

    await proceedBunche(bunch, true)
}


