const amqp = require("amqplib");
const exchangeName = "logs";
async function sendMsg() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'fanout');
    channel.publish(exchangeName, '', Buffer.from("data from fanout type"))
    setTimeout(() => {
        connection.close();
        process.exit(0)
    })
}
sendMsg()