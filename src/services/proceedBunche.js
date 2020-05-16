const checkbox = require('./../lib/checkbox');
const constants = require('./../constants.js');
const util = require('./util.js');

const proceed = async (bunch, reverse = false) => {

    let unknownWords = [];

    for (const word of bunch) {

        const ruWord = word.ru.join(', ')
        const enWord = Array.isArray(word.en) ? word.en.join(', ') : word.en;
        const messageWord = reverse ? enWord : ruWord

        const answer = await checkbox({
            message: word.topic ? `TOPIC - ${word.topic}. ${messageWord}` : `${messageWord}`,
            name: 'Выбор типа теста',
            choices: [
                {
                    name: constants.answerYes,
                    value: constants.answerYes
                }, {
                    name: constants.answerNo,
                    value: constants.answerNo
                }
            ]
        });

        if (answer[0] === constants.answerNo) {
            unknownWords.push(word)
        }

        console.log(`${ruWord} => ${enWord}`)
        util.space()

    }

    if (unknownWords.length) {
        util.space()
        console.info('WORDS WITH ERRORS')
        await proceed(util.shuffle(unknownWords))
    }

}

module.exports = proceed
