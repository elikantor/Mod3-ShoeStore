let shoeList = document.getElementById("shoe-list")
let shoeUrl = "http://localhost:3000/shoes"
let formContainer = document.getElementById("form-container")

fetch(`${shoeUrl}`)
    .then(r=>r.json())
    .then(data => {
        data.forEach(shoe => {
            let li = document.createElement("li")
            li.className = "list-group-item"
            li.innerText = shoe.name
            shoeList.append(li)
            li.addEventListener("click", (e) => {
                renderShoe(shoe)
            })
        })
        renderShoe(data[0])
    })

function renderShoe(shoe){
    let shoeImage = document.getElementById("shoe-image")
    shoeImage.src = shoe.image
    let shoeName = document.getElementById("shoe-name")
    shoeName.innerText = shoe.name
    let shoeDescription = document.getElementById("shoe-description")
    shoeDescription.innerText = shoe.description
    let shoePrice = document.getElementById("shoe-price")
    shoePrice.innerText = `$${shoe.price}`
    let reviews = document.getElementById("reviews-list")
    reviews.innerHTML = ''
    shoe.reviews.forEach(review => {
        let reviewLi = document.createElement("li")
        reviewLi.className = "list-group-item"
        reviewLi.innerText = review.content
        reviews.append(reviewLi)
    })
    let form = document.createElement("form")
    form.id = "new-review"
    form.innerHTML = `
        <div class="form-group">
            <textarea class="form-control" name="comment" id="review-content" rows="3"></textarea>
            <input type="submit" class="btn btn-primary"></input>
        </div>
    `
    formContainer.innerHTML = ''
    formContainer.append(form)
    form.addEventListener("submit", (e)=> {
        e.preventDefault()
        addComment(shoe, e.target.comment.value)
    })
}

function addComment(shoe, comment){
    fetch(`${shoeUrl}/${shoe.id}/reviews`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            content: comment
        })
    })
    .then(r=>r.json())
    .then(data => {
        shoe.reviews.push(data)
        renderShoe(shoe)
    })
}



