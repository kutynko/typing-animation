import './style.css'

const container = document.querySelector('#app');
const words = ['bitcoin', 'tesla', 'READY?', 'GO']

function typingAnimation(settings) {
    const {words, typeDelay, wordDelay, el} = settings;
    const frames = splitAllWords(words);
    let frameIndex = 0;
    let nextTime = 0;

    function splitWord(word, reverse) {
        const result = [];
        let prev = '';
        for (const char of word) {
            prev += char
            result.push({text: prev, delay: typeDelay});
        }
        result[result.length - 1].delay = wordDelay;
        if (reverse)
            for (let i = result.length - 2; i >= 0; i--) result.push(result[i]);
        return result;
    }

    function splitAllWords(words) {
        return words.reduce((res, next, i, arr) => res.concat(splitWord(next, i < arr.length - 1)), [])
    }


    function render(time) {
        if (!nextTime) nextTime = time;

        if (nextTime - time <= 0) {
            el.innerHTML = frames[frameIndex].text;
            nextTime += frames[frameIndex++].delay
        }

        if (frameIndex < frames.length) window.requestAnimationFrame(render);
    }

    return render;
}

const renderTyping = typingAnimation({words, typeDelay: 200, wordDelay: 2000, el: container});
window.requestAnimationFrame(renderTyping);