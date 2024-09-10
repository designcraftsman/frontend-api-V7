const Course = require('../models/course');

exports.addCourse = async (req, res) => {
    try {
        const { idTeacher, title, description, category, environment, privacy, video, skillLevel,gainedSkills, prerequisites } = req.body;
        // Initialize file URLs
        let imageUrl = '';
        let pdfUrl = '';
        let videoUrl = '';
        let additionalAssets = [];

        if (req.files) {
            const url = req.protocol + '://' + req.get('host');

            // Process all files
            req.files.forEach(file => {
                if (file.fieldname === 'previewimage') {
                    imageUrl = url + '/assets/images/' + file.filename;
                } else if (file.fieldname === 'coursePDF') {
                    pdfUrl = url + '/assets/pdf/' + file.filename;
                } else if (file.fieldname.startsWith('additionalAsset')) {
                    const index = file.fieldname.split('_')[1];
                    const name = req.body[`additionalAsset_${index}_name`];
                    const type = req.body[`additionalAsset_${index}_type`];
                    const fileUrl = url + '/assets/objects/' + file.filename;

                    additionalAssets.push({ name, type, fileUrl });
                }else if (file.fieldname ==='video'){
                    videoUrl = url + '/assets/videos/' + file.filename;
                }
            });
        }

        const finalCoursePDF = pdfUrl || "";

        const course = new Course(idTeacher, title, description, category, environment, privacy, finalCoursePDF, videoUrl, imageUrl,skillLevel,gainedSkills,prerequisites, additionalAssets);

        const response = await course.addCourse();

        res.status(201).json({ message: "Course added successfully", success: true , idCourse: response });
    } catch (error) {
        console.error(error.stack || error.message);
        res.status(500).json({ error: "An error occurred while adding the course" });
    }
};

  

exports.getCourseByIdCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.getCourseByIdCourse(id);
        res.status(201).json({ message: "Course found successfully", course });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};



exports.getCourseByIdCourseEditor = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.getCourseByIdCourseEditor(id);
        res.status(201).json({ message: "Course found successfully", course });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};




exports.getCoursesByTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const courses = await Course.getCoursesByTeacher(id);
        res.status(201).json({ message: "Course found successfully", courses });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.getAll();
        res.status(201).json({ message: "Courses found successfully", courses });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await Course.deleteCourse(id);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        let { category, description, name, previewImg, privacy } = req.body;

        if (req.files && req.files.length > 0) {
            const url = req.protocol + '://' + req.get('host');
            previewImg = url + '/assets/images/' + req.files[0].filename;  // Assuming files are uploaded and processed
        }

        const response = await Course.updateCourse(id, name, privacy, category, previewImg, description);
        
        res.status(200).json(response);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: "An error occurred while updating the course" });
    }
};



exports.addEnrolledCourse = async (req, res) => {
    try {
        const { idCourse, idStudent } = req.body;
        console.log(idCourse, idStudent);
        const response = await Course.addEnrolledCourse(idCourse, idStudent);
        res.status(200).json({ message: "Enrolled to Course successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};


exports.getEnrolledCourses = async (req, res) => {
    try {
        const  idStudent  = req.params.id;
        console.log(idStudent);
        const response = await Course.getEnrolledCourses(idStudent);
        res.status(200).json({ message: "Enrolled Courses found successfully", response  , success: true});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};


exports.deleteEnrolledCourse = async (req, res) => {
    try {
        const { idCourse, idStudent } = req.body;
        const response = await Course.deleteEnrolledCourse(idCourse, idStudent);
        res.status(200).json({ message: "Enrolled Course deleted successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.addBookMarkedCourse = async (req, res) => {
    try {
        console.log(req.body);
        const { idCourse, idStudent } = req.body;
        const response = await Course.addBookMarkedCourse(idCourse, idStudent);
        res.status(200).json({ message: "BookMarked Course added successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getBookMarkedCourses = async (req, res) => {
    try {
        const  idStudent  = req.params.id;
        const response = await Course.getBookMarkedCourses(idStudent);
        res.status(200).json({ message: "BookMarked Courses found successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.deleteBookMarkedCourse = async (req, res) => {
    try {
        const { idCourse, idStudent } = req.body;
        const response = await Course.deleteBookMarkedCourse( idStudent, idCourse);
        res.status(200).json({ message: "BookMarked Course deleted successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getEnrolledCoursesOverTime= async (req, res) => {
    try {
        const response = await Course.getEnrolledCoursesOverTime();
        res.status(200).json({ message: "Courses found successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};


exports.getEnrolledCoursesCommitment= async (req, res) => {
    try {
        const response = await Course.getEnrolledCoursesCommitment();
        res.status(200).json({ message: "Courses found successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};