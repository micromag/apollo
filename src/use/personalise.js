export const greet = () => {
    var myDate = new Date();
    let greet;
    var hrs = myDate.getHours();
    if (hrs < 12)
        greet =  "Good Morning 👋"
    else if (hrs >= 12 && hrs <= 17)
        greet =  "Good Afternoon ☀️"
    else if (hrs >= 17 && hrs <= 24)
        greet =  "Good Evening 🌙"
    return greet;
}
