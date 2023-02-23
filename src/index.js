document.addEventListener('DOMContentLoaded', () => {
  let table = document.querySelector("tbody");
  let formContainer = document.querySelector("form");
  let nameInput = document.querySelectorAll("input")[0];
  let breedInput = document.querySelectorAll("input")[1];
  let sexInput = document.querySelectorAll("input")[2];
  let submit = document.querySelectorAll("input")[3];

  getData();

  function getData() {
    fetch(`http://localhost:3000/dogs`)
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach((e) => {
          let tr = document.createElement("tr");
          tr.innerHTML = `<td>${e.name}</td>
          <td>${e.breed}</td>
          <td>${e.sex}</td>
          <td><button>Edit Info</button></td>`;
          let editBtn = tr.querySelector("button");

          function submitForm(form) {
            form.preventDefault();
            const dogData = {
              "name": nameInput.value,
              "breed": breedInput.value,
              "sex": sexInput.value
            }
            const dogObject = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
              },
              body: JSON.stringify(dogData)
            }
            fetch(`http://localhost:3000/dogs/${e.id}`, dogObject)
              .then((res) => res.json())
              .then((dat) => {
                table.innerHTML = "";
                formContainer.reset();
                getData();
                dat;
            })
          }

          editBtn.addEventListener("click", () => {
            nameInput.value = e.name;
            breedInput.value = e.breed;
            sexInput.value = e.sex;
            submit.addEventListener("click", submitForm);
          })
          table.appendChild(tr);
        })
      })
  }
})