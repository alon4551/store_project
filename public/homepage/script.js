const signup = () => {
  window.location.href = "/signUp";
};
const validtion = async () => {
  let email = document.querySelector("#email"),
    password = document.querySelector("#password");
  if (email.value == "" || password == "") return false;
  let res = await fetch("/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  if (res.status == 200) {
    let customer = await fetch("/getUser", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    }).then((response) => response.json());
    localStorage.setItem("customer", JSON.stringify(customer));
    localStorage.setItem("cart", []);
    localStorage.setItem("total", 0);
    window.location.href = "/shop";
  } else alert("email or password are incorrect");
};