import halls from "../models/HallsModel.js"

//CREATE BOOKING
export const createHall = async (req, res) => {
    const newHall = new halls(req.body)
    try {
        const savedHall = await newHall.save()
        res.status(200).json(savedHall)
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}



export const getHall = async (req, res) => {
    try {
        
        console.log("Received Request - Query:", req.query);
// console.log("Received Request - Body:", req.body);
// console.log("Received Request - Params:", req.params);

        const {Hall_ID} = req.query;
        console.log("Hall_ID:", Hall_ID);

        if (!Hall_ID) throw new Error("No Hall Id found"); 
        
        const hall = await halls.findOne({ Hall_ID });
        
        if (!hall) { 
            return res.status(404).json({ status: "Failed", message: "Hall not found" });
        }
        res.status(200).json(hall);
    } catch (err) {
        
        res.status(400).json({
            status: "Failed",
            message: err.message, // Extracting message from error
        });
    }
};


//GET ALL HALLS
export const getAllHalls = async (req, res) => {
    try {
        let params = {};
        if (req.params) {
            params = req.params
        }
       
        const hallsList = await halls.find(params)
        res.status(200).json(hallsList)
    } catch (err) {
        console.log("err: ", err);
        
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}


// controllers/hallController.js


export const updateHall = async (req, res) => {
    try {
        const { id } = req.params; // Hall ID from URL
        const { Hall_Name, Description, Capacity, Price, Image1, Image2 } = req.body;

        const updatedHall = await halls.findByIdAndUpdate(
            id,
            {
                Hall_Name,
                Description,
                Price,
                Capacity,
                Image1,
                Image2
            },
            { new: true } // Return updated document
        );

        if (!updatedHall) {
            return res.status(404).json({
                status: "Failed",
                message: "Hall not found"
            });
        }

        res.status(200).json({
            status: "Success",
            data: updatedHall
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message || "Error updating hall"
        });
    }
};


export const addAHall = async (req, res) => {
    
  try {
    const hall = new halls(req.body);
    await hall.save();
    res.status(201).json({ message: "Hall created successfully", hall });
  } catch (error) {
    console.error("Error adding hall:", error);
    res.status(500).json({ message: "Failed to add hall" });
  }
};


export const deleteHall = async (req, res) => {
    console.log("hello");
    
    try {
        console.log("h1");
        
      const result = await halls.findByIdAndDelete(req.params.id);
      console.log("h2");
      if (!result) {
        console.log("h3");
        return res.status(404).json({ message: 'Hall not found' });
      }
      console.log("h4");
      res.json({ message: 'Hall deleted successfully' });
    } catch (error) {
        console.log("h5");
      console.error('Error deleting hall:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };








