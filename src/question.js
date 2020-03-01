export class Question {
    static create(question) {
        return fetch('https://auth-vanilla.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name
                return question;
            })
            .then(addToLC)
            .then(Question.renderList)
    }

    static renderList() {
        const questions = getQuestionsFromLC();
        
        const html = questions.length
            ? questions.map(toCart).join('')
            : `<div class="mui--text-headline">You didn't ask anything</div>`;

        const list = document.getElementById('list');

        list.innerHTML = html;
    }

    static fetch(token) {
        if (!token) {
            return Promise.resolve('<p class="error">You don\'t have token</p>')
        }
        return fetch(`https://auth-vanilla.firebaseio.com/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if(response && response.error) {
                    return `<p class="error">${response.error}</p>`;
                }

                return response
                    ? Object.keys(response).map(key => ({
                        ...response[key],
                        id: key
                    }))
                    : []
            })
    }

    static listToHTML(questions) {
        return questions.length
            ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join()}</ol>`
            : '<p>Questions empty</p>'
    }
}

function addToLC(question) {
    const all = getQuestionsFromLC();
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLC() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCart(question) {
    return `
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>${question.text}</div>
        <br>
    `;
}