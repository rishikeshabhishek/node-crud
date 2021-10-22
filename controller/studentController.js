const StudentModel = require('../model/studentModel');
const fs = require('fs');
const path = require('path');


exports.index = (req, res) => {
    StudentModel.find((error, data) => {
        if (!error) {
            res.render('student-display', {
                title: 'Student Display',
                displayData: data
            });
        }
    })
}

exports.registration = (req, res) => {
    res.render("student-reg", {
        title: "Student Registration"
    });
}

exports.registerStudent = async(req, res) => {
        const Student = new StudentModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            contact: req.body.contactNumber,
            email: req.body.email,
            course: req.body.course,
            fees: req.body.fees,
            img: req.file.filename
        })
        await Student.save().then((result) => {
            console.log(result, "Student Registration Successfull!!!");
            res.redirect('/');
        }).catch((error) => {
            console.log(error);
            res.redirect('/student-reg');
        })
    } //eta dkhte hbe...

exports.update = (req, res) => {
    StudentModel.findById(req.params.id, (error, data) => {
        if (!error) {
            res.render('edit-students', {
                title: "Edit Student",
                displayData: data
            });

        } else {
            res.render('/');
        }
    })
}

// Update

exports.updateStudent = async(req, res) => {
    await StudentModel.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        contact: req.body.contactNumber,
        email: req.body.email,
        course: req.body.course,
        fees: req.body.fees,
        img: req.file.filename
    }, (error, data) => {
        if (!error) {
            fs.unlink('./public/uploads/' + data.img, (err) => {
                if (!err) {
                    console.log("Student Update");
                    res.redirect('/');
                } else {
                    console.log('Error When Unlink....')
                }
            })
        } else {
            console.log(error);
        }
    });
}

// Delete

exports.delete = async(req, res) => {
    await StudentModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (!error) {
            fs.unlink('./public/uploads/' + data.img, (err) => {
                if (!err) {
                    res.redirect('/');
                } else {
                    console.log('Error When Unlink....')
                }
            })
        } else {
            console.log(error);
            res.redirect('/');
        }
    })
}

exports.getForModal = (req, res) => {
    StudentModel.findOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            console.log(data)
            res.send(data)
        } else {
            console.log('Something Went Wrong....')
        }
    })
}

exports.getImage = (req, res) => {
    StudentModel.findOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            console.log(data)
            res.send(data)
        } else {
            console.log('Something Went Wrong....')
        }
    })
}