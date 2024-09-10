const Group = require("../models/group");

exports.addGroup = async (req, res) => {
  try {
    const { idTeacher, groupName, description, studentsList } = req.body;
    
    // Initialize file URLs
   let imageUrl = '';
   // Handle file uploads
   if (req.files) {
       const url = req.protocol + '://' + req.get('host');
       if (req.files && req.files[0]) {
           imageUrl = url + '/assets/images/' + req.files[0].filename;
       }

   }

    const group = new Group(idTeacher, groupName, description, studentsList, imageUrl);
    await group.addGroup();
    res.status(201).json({ message: "Group added successfully" , success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred" , success: false });
  }
};



exports.deleteGroup = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Group.deleteGroup(id);
      res.status(200).json({ message: "Group deleted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
};

exports.getGroupsByTeacher = async (req, res) => {
    try {
      const { id } = req.params;
      const groups = await Group.getGroupsByTeacher(id);
      res.status(200).json({groups});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
};

exports.getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const group = await Group.getGroupById(id);
    console.log(group);
    res.status(200).json({message:"Group found successfully !", group: group ,success:true});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};



exports.getGroupsByStudent = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    const groups = await Group.getGroupsByStudent(username);
    res.status(200).json({message:"Group found successfully !", groups: groups ,success:true});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};




exports.getAllGroups = async (req, res) =>{
    try {
      const groups = await Group.getAll();
      res.status(200).json({ groups , success: true });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
}

exports.updateGroup = async (req, res) => {
    try {
      const { id } = req.params;
      const { idteacher, name, description , students } = req.body;
      const group = new Group(idteacher, name, description, students );
      const response = await group.updateGroup(id);
      res.status(200).json({ message: "Group updated successfully", group: response });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
};