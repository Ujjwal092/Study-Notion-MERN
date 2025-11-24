const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");

//capture the payment and creates a razorpay order
exports.capturePayment = async (req, res) => {
  try {
    //get userID and orderID
    const { course_id } = req.body;
    const user_id = req.user.id;
    //valid courseID
    if (!course_id) {
      return res.json({
        success: false,
        message: "please provide valid course ID",
      });
    }
    //valid courseDetails
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.json({
          success: false,
          message: "could not find course",
        });
      }
      //user already buy the course
      //string to obj conv nots***
      const uid = new mongoose.Types.ObjectId(user_id);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student is already enrolled",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    //order create
    //course price api se aajyegi and yha pr hmne Course ke detail course m nikal rkhi hai anss instannce razorpay ka hai
    const amount = course.price;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: course_id,
        userId,
      },
    };
    try {
      //initiate the payment using razorpay
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);
      return res.status(200).json({
        success: true,
        courseName: course.Name,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Could not initiate order",
      });
    }
    //return res
  } catch (error) {
    return res.status(501).json({});
  }
};

//verify signature or authorization
exports.verifySignature = async (req, res) => {
  //mine
  const webhookSecret = "12345678";
  // matchings keys
  const signature = req.headers("x-razorpay-signature");
  //crypto doesnt need to install already in node modules
  const shasum = crypto.createHmac("sha256", webhookSecret);
  //input for shasum in string format
  //encrypting webhookSecret from razorpay
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");
  //match this digest and webhookSecret
  if (signature === digest) {
    console.log("payment authorized");

    //
    const { courseId, userId } = req.body.payload.payment.entity.notes;
    try {
      //action fullfill
      //find the course and enroll the student in the course
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }
      console.log(enrolledCourse);
      //find the student and add the course list in their list of enrolled courses
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );
      //send the mail
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congo You are a part of StudyNotion",
        "Congo You are a part of StudyNotion"
      );
      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Signature verified and Course added ",
      });
    } catch (error) {
      console(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Verification failed",
    });
  }
};
