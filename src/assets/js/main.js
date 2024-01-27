function deleteProduct(id) {
    let result = confirm('Are you sure you want to delete this product?');

    if (result) {
        fetch(`/delete-product/${id}`, {
            method: 'POST'
        }).then((res) => {
            if (res.ok) {
                location.reload();
            }
        })
    }
}