import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  let sumcus = 0,
    sumadmin = 0,
    summoney = 0;
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || !user.isAdmin)
      return res.status(403).json({ ok: false, message: "Permission denied" });
    //compute DB summary

    const users = readUsersDB();
    users.map((x) => {
      if (x.isAdmin === true) sumadmin += 1;
      if (x.isAdmin === false) {
        sumcus += 1;
        summoney += x.money;
      }
    });
    //return response
    return res.json({
      ok: true,
      userCount: sumcus,
      adminCount: sumadmin,
      totalMoney: summoney,
    });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
