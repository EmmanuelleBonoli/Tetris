const express = require("express");

const router = express.Router();

const { hashPassword, verifyToken } = require("./services/auth");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const gameControllers = require("./controllers/gameControllers");
const bubbleControllers = require("./controllers/bubbleControllers");

router.post("/user/login", userControllers.login);
router.post("/user/signIn", hashPassword, userControllers.signIn);

router.get("/user/validityToken", userControllers.checkValidityToken);

// /* ************************************************************************* */

router.use(verifyToken);

router.get("/user/userbytoken", userControllers.getByToken);

router.get("/game/getGameUser", gameControllers.getGame);
router.get("/bubble/allBubbles/:id", bubbleControllers.getAllBubbles);
router.put("/game/newGame", gameControllers.newGame);
router.put("/bubble/updatedBubble", bubbleControllers.updatedBubble);

// router.get("/user/checkExistence", userControllers.checkExistence);
// router.get(
//   "/appointment/Allappointments/:id",
//   appointmentControllers.getAllAppointments
// );
// router.get(
//   "/appointment/appointmentSelected/:id",
//   appointmentControllers.getAppointmentSelected
// );

// router.get("/meeting/membersMeeting/:id", meetingControllers.getMembersMeeting);
// router.get("/coworkers/list/:id", coWorkerControllers.getCoworkersList);
// router.get(
//   "/coworkers/listAttente/:id",
//   coWorkerControllers.getCoworkersAttente
// );

// router.post("/appointment/create", appointmentControllers.create);
// router.post("/meeting/create", meetingControllers.create);
// router.post(
//   "/coworker/createNewCoworker",
//   coWorkerControllers.createNewCoworker
// );

// router.put("/appointment/modify/:id", appointmentControllers.update);
// router.put(
//   "/coworker/update/:workerId/:coworkerId",
//   coWorkerControllers.update
// );

// router.delete("/appointment/:id", appointmentControllers.destroy);
// router.delete("/meeting/:id", meetingControllers.destroy);
// router.delete(
//   "/coworkers/delete/:workerId/:coworkerId",
//   coWorkerControllers.destroy
// );

module.exports = router;
