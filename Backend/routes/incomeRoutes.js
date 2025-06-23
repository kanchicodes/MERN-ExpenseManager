const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addIncome, getAllIncomes, deleteIncome,downloadIncomeExel} = require("../controllers/incomeController");
   
   
const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncomes); 
router.delete("/:id", protect, deleteIncome);
router.get("/downloadexcel", protect, downloadIncomeExel);

module.exports = router;
   
