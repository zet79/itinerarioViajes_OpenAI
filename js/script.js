
const CHATGPT_KEY = 'COLOCAR_KEY'

async function onClickSearch(){
    let busqueda=document.getElementById('txtSearch').value;
    let containerHtml=document.getElementById('searchResult');
    let prompt=getPrompt(busqueda);
    let response= await callToChatGpt(prompt);
    containerHtml.innerHTML=response;
}

async function callToChatGpt(prompt){
    const bodyRequest={
        model: 'gpt-4o-mini',
        max_tokens: 800,
        messages:[
            {role: 'user', content: prompt}
        ]
    }
    const request = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${CHATGPT_KEY}`
        },
        body: JSON.stringify(bodyRequest)
    }
    const response = await fetch('https://api.openai.com/v1/chat/completions',request)
    const json=await response.json();
    return json.choices[0].message.content;
}

function getPrompt(destino){
    return `Eres un guia turístico, necesito que me armes el itinerario de un viaje a ${destino}. El viaje va a durar una semana, hazme una lista de actividades, lugares a donde comer, etc... Es importante que no hagas ningun tipo de saludo ni nada por el estilo, simplemente muestra el itinerario. En cada día indica que cosas hacer y donde comer. Tienes que indicar el lugar preciso en donde comer y tambien que hotel.`
}