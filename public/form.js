const formRef = document.querySelector("form");
const handleSubmit = (event) => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => onSuccess(myForm))
    .catch((error) => alert(error));
};

function onSuccess() {
  document.getElementById("emailInput").value = "";
  document.getElementById("messageInput").value = "";
  document.getElementById("formButton").innerHTML = "Message sent!";
  document.getElementById("formButton").style.backgroundColor =
    "rgb(34, 197, 94)";
    setTimeout(() => {
      document.getElementById("formButton").innerHTML = "send";
      document.getElementById("formButton").style.backgroundColor =
        "black";
    }, 2000);
}

formRef.addEventListener("submit", handleSubmit);
