// Função para enviar mensagem
function sendMessage() {
    const apiKey = 'substituir pelaCHAVE DE API'; // Substituir por uma solução segura
    const messageInput = document.getElementById('message-input');
    const status = document.getElementById('status');
    const btnSubmit = document.getElementById('btn-submit');

    if (!messageInput.value.trim()) {
        messageInput.style.border = '1px solid red';
        return;
    }

    messageInput.style.border = '1px solid #ddd';

    status.style.display = 'block';
    status.textContent = 'Carregando...';
    btnSubmit.disabled = true;
    btnSubmit.style.cursor = 'not-allowed';
    messageInput.disabled = true;

    fetch("substituir pelo ENDPOIT referente a rota especifica na API", {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "substituir pelo MODELO DE LINGUAGEM",
            messages: [
                { role: "user", content: messageInput.value }
            ],
            max_tokens: 2048,
            temperature: 0.5,
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        const reply = data.choices[0].message.content;
        status.style.display = 'none';
        showHistory(messageInput.value, reply);
    })
    .catch((error) => {
        console.error(`Error -> ${error}`);
        status.textContent = 'Erro, tente novamente mais tarde...';
    })
    .finally(() => {
        btnSubmit.disabled = false;
        btnSubmit.style.cursor = 'pointer';
        messageInput.disabled = false;
        messageInput.value = '';
    });
}

// Função para exibir histórico
function showHistory(message, response) {
    const historyBox = document.getElementById('history');

    // Mensagem do usuário
    const boxMyMessage = document.createElement('div');
    boxMyMessage.className = 'box-my-message';

    const myMessage = document.createElement('p');
    myMessage.className = 'my-message';
    myMessage.textContent = message; // Usar textContent para evitar XSS

    boxMyMessage.appendChild(myMessage);
    historyBox.appendChild(boxMyMessage);

    // Resposta da IA
    const boxResponseMessage = document.createElement('div');
    boxResponseMessage.className = 'box-response-message';

    const chatResponse = document.createElement('p');
    chatResponse.className = 'response-message';
    chatResponse.textContent = response; // Usar textContent para evitar XSS

    boxResponseMessage.appendChild(chatResponse);
    historyBox.appendChild(boxResponseMessage);

    // Levar scroll para o final
    historyBox.scrollTop = historyBox.scrollHeight;
}

// Adicionar evento ao botão
document.getElementById('btn-submit').addEventListener('click', sendMessage);

// Permitir envio com Enter
document.getElementById('message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
