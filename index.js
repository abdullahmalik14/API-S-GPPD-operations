const express = require("express");
const app = express();
const { todos_data } = require("./data")

app.use(express.json())

// GET TASK-------

app.get("/task/:id", (req, res) => {
    //extract task id from request parameter
    const id = req.params.id

    //find task in sample data based on id
    const find_todo = todos_data.find((element) => {
        return element.id = id

    })

    return res.json({ data: find_todo })
})


// POST TASK----------

app.post("/task", (req, res) => {
    // extract new task from req body
    const new_data = req.body

    // return new task by a new message
    res.json({
        data: new_data,
        message: "successfully added"

    })
})


//PUT TASK----------------- 
app.put("/task/:id", (req, res) => {

    //extract update id from request parameter
    const id = req.params.id
    //update the task from req.body
    const data = req.body
    //find task in sample data based on id
    const find_todo = todos_data.find((elem) => {
        return elem.id = id
    })
    if (!find_todo) {
        return res.status(404).json({ message: "Not found!" })
    }

    // merge the updated task in updated data
    const updated_data = { ...find_todo, ...data }
    // { ...find_todo, ...data } ka matlab hai ke find_todo aur data ke saarey properties ko ek naye object
    //  mein shaamil kiya jata hai.Agar kisi property ka naam find_todo aur data mein dono mein mojood hai toh
    //   data wala property find_todo wale property ko override kar dega mtlb ke updated object mein wo property
    //    data wale value ki hogi.
    return res.json({ data: updated_data })
})


// DELETE TASK

app.delete("/task/:id", (req, res) => {
    // Extract task id from request parameter
    const id = req.params.id;

    // Find task object in sample data based on id
    const find_todo = todos_data.find((element) => {
        return element.id === id;
    });

    // If task not found, return 404 Not Found
    if (!find_todo) {
        return res.status(404).json({ message: "Task not found!" });
    }

    // Remove task from sample data
    //indexof ka use ha  find_todo variable mein jo mila hai uska index todos_data mein dhoondta hai 
    const index = todos_data.indexOf(find_todo);

    //Yeh line of code todos_data array se ek specific task ko hatata hai,
    //  jiska index index variable mein store hai.
    //  splice function ka istemal hota hai list mein se kisi element ko hatane ke liye
    todos_data.splice(index, 1);
    // Yeh splice function do arguments leta hai
    // Index: Yeh woh index hai jahan se element ko hatana hai.mtlb todos_data mein 
    // find_todo ki help se data index ka pta chlega

    //     Count: Yeh batata hai ke kitne elements hatane hain.Humne 1 diya hai,
    //         iska matlab hai sirf ek element hatana hai.

    // Return success message
    return res.json({ message: "Task deleted successfully" });
});

app.listen(6000, () => {
    console.log("server is running");
})