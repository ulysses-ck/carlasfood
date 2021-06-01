const btnAdd = document.getElementsByClassName("btn-add");

let curValue, curValueSel, prize, strProd;


function initLogic() {
	for (let i = 0; i < btnAdd.length; i++) {
		btnAdd[i].addEventListener("click", () => {
			curValue = btnAdd[i].value
			btnAdd[i].textContent = 'Añadido'
			curValueSel = document.getElementsByClassName('btn-cantidad')[i].value
			sepVal(curValue)
		})
	}
}

function sepVal(value) {
	let strOld = ''
	strProd = ''
	prize = 0
	strOld = value.split(' ')
	console.log(strOld)
	for (let i = 0; i < strOld.length; i++) {
		if (strOld[i] !== strOld[strOld.length - 1]) {
			strProd += `${strOld[i]} `
		} else {
			prize = strOld[i]
		}
	}
	console.log(`Precio : ${prize}
producto : ${strProd}
cant: ${curValueSel}`)
	axios.post('http://localhost:4000/data', null, {
			headers: {
				'Content-Type': 'text/plain',
				name: strProd,
				prize: prize,
				cant: curValueSel
			}
		}).then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	axios.post('https://carlas-food.herokuapp.com/data', null, {
			headers: {
				'Content-Type': 'application/json',
				name: strProd,
				prize: prize,
				cant: curValueSel
			}
		}).then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

initLogic()