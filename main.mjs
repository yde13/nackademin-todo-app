import express from 'express';
import {mainPage, ejs, nedb, addTask, editTask, deleteTask, taskIsDone} from "./models/export.mjs";
import bodyParser from "body-parser";

const app = express()
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'))

app.get('/', async(req, res) => {  
  res.render("index", { row: await mainPage() });
});

app.post('/add', async (req, res) => {
  try{
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let all = (year + "" + month + "" + day);
    let task = {
        title: req.body.title,
        done: false,
        created: all
    }
    console.log(task);
    
    await addTask(task)
    res.redirect('/')
  }catch(error){
    res.json({error: error.message})
  }
});

app.put('/edit/:_id', async(req, res) => {
  try {
      var id = req.params._id;
      let task = {
          title: req.body.editTask,
      }
      console.log(req.body)
      const updateToDo = await editTask(id, task)
          console.log(updateToDo + " Todo uppdaterad");
          res.json(updateToDo);
  } catch (error) {
      console.log({error: error.message})
  }
});

app.put('/done/:_id', async(req, res) => {
  try {
    var id = req.params._id;
    let done = {
      done: req.body.done,
    }
    console.log(req.body)
      const updateToDo = await taskIsDone(id, done)
      console.log(updateToDo + " Todo done");
      res.json(updateToDo);
  } catch (error) {
    res.json({error: error.message});
  }
})

app.delete('/delete/:_id', async(req, res) => {
  try {
      let id = req.params._id;
      await deleteTask(id)
      //res.redirect('/')
      res.json({
        data: "done"
      })
  } catch (error) {
      res.json({error: error.message})
  }
});



app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})