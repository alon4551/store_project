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
    });
    if (res.status == 200) {
      localStorage.setItem("customer", await fetch("/login"));
      window.location.href = "/shop";
    } else alert("email or password are incorrect");
  };