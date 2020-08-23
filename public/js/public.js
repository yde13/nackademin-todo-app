console.log("SUCCESS");
var deleteBtn = document.querySelectorAll('.delete');
var editBtn = document.querySelectorAll('.edit');
var taskDone = document.querySelectorAll('.taskDone');
var edit = document.querySelectorAll('.edit-container');


taskDone.forEach(function(btn) { //use normal function
    btn.addEventListener('change', function(e) {
      let id = $(this).data('id') //get the data id of checkbox
      var done = e.target.attributes[1].value;
      
      $.ajax({
              url: 'http://localhost:3000/done/' + id,
              type: 'PUT',
              data: { done: btn.checked }
            }).done(function(data) {
                //location.reload();
              console.log($(this)[0].data)
        })  
        // fetch('http://localhost:3000/done/' + id, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     data: { done: btn.checked }
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Success:', data);
        //         //location.reload();
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
     })
  })


deleteBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        var id = e.target.attributes[1].value;
        console.log(id);
        // $.ajax({
        //     url: 'http://localhost:3000/delete/' + id,
        //     type: 'DELETE'
        // }).done(function (data) {
        //     location.reload()
        // })

        fetch('http://localhost:3000/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    })
})

editBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let id = e.target.getAttribute('data-id');
        let editTask = document.querySelector(`input[data-id=${id}]`).value;

        $.ajax({
            url: 'http://localhost:3000/edit/' + id,
            type: 'PUT',
            data: { editTask }
        }).done(function (data) {
            location.reload()
            console.log(data);

        })

        // fetch('http://localhost:3000/edit/' + id, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     data: { editTask }
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Success:', data);
        //         //location.reload();
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

    })
})

