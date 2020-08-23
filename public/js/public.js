console.log("SUCCESS");
var deleteBtn = document.querySelectorAll('.delete');
var editBtn = document.querySelectorAll('.edit');
var taskDone = document.querySelectorAll('.taskDone');
var edit = document.querySelectorAll('.edit-container');
var cancleBtn = document.querySelectorAll('.cancle-btn');


// taskDone.forEach(btn => {
//     btn.addEventListener('change', (e) => {
//         var done = e.target.attributes[1].value;
//         // console.log(done);
        
//         let id = e.target.getAttribute('data-id');
//         let isDone = document.querySelector(`input[data-id=${id}]`).value;

//         console.log(isDone + "isdone")
//         if ($(taskDone).is(':checked')) {
//             $('.text').addClass('line-through')
//             console.log("Checked")
//             $.ajax({
//                 url: 'http://localhost:3000/done/' + id,
//                 type: 'PUT',
//                 data: { isDone }
//             }).done(function (data) {
//                 //location.reload()
//                 console.log(data)
//             })

//         } else {
//             console.log('Not checked')
//             $('.text').removeClass('line-through')
//         }
//     })
// })

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
          

    //   if ($(this).is(':checked')) { //check if the clicked checkbox is checked or not
    //     console.log(id + ' is Checked - Updating neDB') //console.log
    //     
     })
  })


deleteBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        var id = e.target.attributes[1].value;
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/delete/' + id,
            type: 'DELETE'
        }).done(function (data) {
            location.reload()
        })

        // fetch('http://localhost:3000/delete/' + id, {
        //     method: 'DELETE', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(id),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Success:', data);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

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

    })
})

cancleBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        var id = e.target.attributes[1].value;
        console.log(id);
        edit.style.display = 'none';
    })
})

