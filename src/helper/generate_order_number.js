function generateOrderNumber(){
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let order_number = "";
    for (let i = 0; i < 9; i++){
        const random_index = Math.floor(Math.random() * characters.length);
        order_number+=characters[random_index];
    }

    return order_number
}

module.exports = generateOrderNumber;