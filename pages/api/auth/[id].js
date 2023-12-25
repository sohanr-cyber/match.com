import nextConnect from "next-connect";
import User from "@/database/model/User";
import faker from "faker";
import db from "@/database/connection";
import {
  institutes,
  districts,
  cities,
  names,
  professions,
  marriageStatus,
  averageMonthlyIncomes,
  datesOfBirth,
  upazillas,
  skinColors,
  bodyTypes,
  sessions,
} from "./data";

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    await db.connect();
    const user = await User.findOne({ _id: req.query.id });
    await db.disconnect();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default handler;
