import {alphabet, symbols} from "../Login/LoginStatic"

export function GenerateNewEmployee(
  setPassword: (e: string) => void,
  setGeneratedPassword: (e: string) => void,
) {

  let password: string[] = [];

  for (let i = 0; i <= 5; i++) {
    if (i !== 5) {
      const random = Math.floor(Math.random() * 26);
      password.push(alphabet[random]);
    } else {
      const randomIndex = Math.floor(Math.random() * 4);
      password[randomIndex] = password[randomIndex].toUpperCase();
    }
  }


  const randomizeOrder = Math.floor(Math.random() * 3);

  if (!randomizeOrder) {
    const randomNumber = Math.floor(Math.random() * 100);
    password.push(randomNumber.toString());
    const randomIndex = Math.floor(Math.random() * 32);
    password.push(symbols[randomIndex]);
    const randomNumber2 = Math.floor(Math.random() * 10);
    password.push(randomNumber2.toString());
  } else if (randomizeOrder === 1) {
    const randomIndex = Math.floor(Math.random() * 32);
    password.push(symbols[randomIndex]);
    const randomNumber = Math.floor(Math.random() * 100);
    password.push(randomNumber.toString());
    const randomNumber2 = Math.floor(Math.random() * 10);
    password.push(randomNumber2.toString());
  } else {
    const randomNumber = Math.floor(Math.random() * 10);
    password.push(randomNumber.toString());
    const randomIndex = Math.floor(Math.random() * 32);
    password.push(symbols[randomIndex]);
    const randomNumber2 = Math.floor(Math.random() * 10);
    password.push(randomNumber2.toString());
  }

  setGeneratedPassword(password.join(""));
  setPassword(password.join(""));

  //each password should have 4 characters randomly distributed, where one of them is capitalized
  //duplicates can occur
  //the password should also have a minimum of 2 numbers
  //the password should also have a special symbol
  //the order should be characters, then symbols and numbers can be intertwined in their order
  //example: "Melt@24"
  //example: "bOb5&1"
  //example: "zERO11$"
}
