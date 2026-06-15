const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// 1. SUA TABELA DE RESPOSTAS MULTILÍNGUE
const respostas = {
    pt: {
        welcome: "Olá, mano! Bem-vindo ao suporte do Painel. Como posso te ajudar hoje?",
        howToBuy: "🔥 **COMO COMPRAR O VIP:** Acesse nossa loja automática na GGMAX ou abra um ticket usando o comando `!ticket`. O envio da Key é imediato após o Pix!",
        keyError: "❌ **ERRO DE CHAVE:** Se a sua key der inválida ou expirada, confere se você não copiou nenhum espaço em branco antes ou depois do código. Lembra que a chave grátis do Lootlabs dura só 24h!",
        helpMenu: "📚 **COMANDOS / COMMANDS:**\n!comprar - Como adquirir o painel VIP\n!key - Problemas com a chave\nEnglish, Español and Русский are supported automatically! Just type your question.*"
    },
    en: {
        welcome: "Hello! Welcome to the Support. How can I help you today?",
        howToBuy: "🔥 **HOW TO BUY PREMIUM:** Visit our official store or open a ticket using the command `!ticket`. Instant delivery after payment!",
        keyError: "❌ **KEY ERROR:** If your key is invalid or expired, make sure you didn't copy any blank spaces. Remember that the free Lootlabs key only lasts 24h!",
        helpMenu: "📚 **COMMANDS:**\n!buy - How to buy the VIP panel\n!key - Key issues"
    },
    es: {
        welcome: "¡Hola! Bienvenido al soporte. ¿Cómo puedo ayudarte hoy?",
        howToBuy: "🔥 **CÓMO COMPRAR:** Visita nuestra tienda oficial o abre un ticket con el comando `!ticket`. ¡Entrega inmediata después del pago!",
        keyError: "❌ **ERROR DE CLAVE:** Si tu clave es inválida, asegúrate de no haber copiado espacios en blanco. ¡La clave gratis de LootLabs dura solo 24 horas!",
        helpMenu: "📚 **COMANDOS:**\n!comprar - Cómo comprar el panel VIP\n!key - Problemas con la clave"
    },
    ru: {
        welcome: "Привет! Добро пожаловать в службу поддержки. Чем я могу помочь?",
        howToBuy: "🔥 **КАК КУПИТЬ ПРЕМИУМ:** Посетите наш официальный магазин или откройте тикет командой `!ticket`. Мгновенная доставка!",
        keyError: "❌ **ОШИБКА КЛЮЧА:** Если ваш ключ недействителен, убедитесь, что вы не скопировали пробелы. Бесплатный ключ LootLabs работает только 24 часа!",
        helpMenu: "📚 **КОМАНДЫ:**\n!buy - Как купить VIP-панель\n!key - Проблемы с ключом"
    }
};

// 2. DETECTOR DE IDIOMA AUTOMÁTICO
function detectarIdioma(texto) {
    const t = texto.toLowerCase();
    if (t.includes("привет") || t.includes("скрипт") || t.includes("ключ")) return "ru";
    if (t.includes("hola") || t.includes("script") || t.includes("comprar") || t.includes("gracias")) return "es";
    if (t.includes("hello") || t.includes("hi") || t.includes("buy") || t.includes("key")) return "en";
    return "pt";
}

client.on('ready', () => {
    console.log(`Bot conectado com sucesso como: ${client.user.tag}`);
});

// 3. LOGICA DE LEITURA E RESPOSTA DOS COMANDOS
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const idioma = detectarIdioma(message.content);
    const comando = message.content.toLowerCase();

    // Comando de Ajuda Geral
    if (comando === "!ajuda" || comando === "!help" || comando === "!commands") {
        return message.reply(respostas[idioma].helpMenu);
    }

    // Responder saudações automaticamente
    if (comando.includes("hello") || comando.includes("привет") || comando.includes("oi")) {
        return message.reply(respostas[idioma].welcome);
    }

    // Responder como comprar
    if (comando.includes("comprar") || comando.includes("buy") || comando.includes("купить") || comando === "!comprar") {
        return message.reply(respostas[idioma].howToBuy);
    }

    // Responder erro de chave
    if (comando.includes("error") || comando.includes("invalid") || comando.includes("ошибка") || 
        comando.includes("inválida") || comando === "!key") {
        return message.reply(respostas[idioma].keyError);
    }
});

// Coloque o Token do seu Bot do Discord Developer Portal aqui dentro das aspas
client.login('MTUxNjE5NjE2MDY0NDA1OTI2MA.GkiZ3C.hu5qEd-BTTbVPrgAtSW1KDwAiZv3BDKzYblf_o');
